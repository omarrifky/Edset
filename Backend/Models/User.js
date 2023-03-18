import mongoose from "mongoose";
import mongoose_sequence from "mongoose-sequence";
import mongooseautopopulate from "mongoose-autopopulate";
import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import _ from "lodash";
import { secretOrPrivateKey } from "../config";


const AutoIncrement = mongoose_sequence(mongoose);
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    university: String,
    faculty: String,
    prefrences:{
        categories: [String],
        isStudent:{
            type:Boolean,
            default:true
        },
        type:{
            type:String,
            enum:["University","School","Company","Other"],
            default:"Other"
        },
        entityName:{
            type:String,
            
        },
        major:{
            type:String
        },
        year: Number
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    mobileNumber: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    dateOfBirth: {
        type: Date,
        required: false,
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    wallet: {
        type: Number,
    },
    favorites: [{
        type: mongoose.Types.ObjectId,
        ref: "Product"
    }],
    rating: {
        type: Number,
    },
    numberOfRatings: {
        type: Number,
    },

    admin: {
        type: Boolean,
        default: false
    },
    blocked: {
        type: Boolean,
        default: false
    },
    isremoved: {
        type: Boolean,
        default: false
    },
    imageURL: {
        type: String,
        required: false
    },
    adresses:[
        {
            address:{
                type:String,
                required:true
            },
            mapCoordinate:{
              lat:{
                type:Number
              },
              long:{
                type:Number
              }
            },

        }
    ],
    cart: [{
        product: {
            type: mongoose.Types.ObjectId,
            ref: "Product"
        },
        productName: {
            type: String
        },
        productPrice: {
            type: Number
        },
        productLogo: {
            type: String
        },
        quantity: Number,
        
        supplier:{ 
            type:mongoose.Types.ObjectId,
            ref:"supplier"
        }
    }],
    tokens: [{
        access: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: true,
        },
    }, ],
    userId: {
        type: Number,
        index: true,
        unique: true
    },

});
userSchema.index({ "$**": "text" }); // Add this for the search to work
userSchema.plugin(AutoIncrement, { inc_field: "userId" }); // AutoIncrement Userid
userSchema.plugin(mongooseautopopulate); // Return object when searching by ID

userSchema.pre("save", async function() { //Before saving when creating user the password is hashed 
    if (this.isModified("password"))
        this.password = await hash(this.password, 10);
});
userSchema.pre("findOneAndUpdate", async function() { // Hashing password when updating it 
    if (this._update && this._update.password)
        this._update.password = await hash(this._update.password, 10);
});

userSchema.methods.toJSON = function() { // Return the user info as JASON without unwanted fields
    const user = this;
    const userObject = user.toObject();

    // return _.omit(userObject, ["isBanned", "password", "tokens", "__v"]);
    return _.omit(userObject, ["isBanned", "password", "__v"]);
};

userSchema.methods.generateAuthToken = function() { // Generated the user token to access the website when registering and login
    const user = this;
    const access = "auth";
    const token = jwt.sign({
            _id: user._id.toHexString(),
            access
        },
        secretOrPrivateKey
    );
    user.tokens.push({ // Array to be able to be used on multiple devices
        access,
        token,
    });

    return user.save().then(() => {
        return token;
    });
};

userSchema.methods.removeToken = function(token) { // Remove token after the user logs out
    const user = this;

    return user.updateOne({
        $pull: {
            tokens: {
                token,
            },
        },
    });
};

userSchema.statics.findByToken = function(token) {
    const User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, secretOrPrivateKey); //verifies that the token is valid
    } catch (err) {
        return Promise.reject({
            message: err,
        });
    }

    return User.findOne({
        _id: decoded._id,
        "tokens.token": token,
        "tokens.access": "auth",
    });
};

userSchema.statics.findByCredentials = function(email, password) { // Find using email
    const User = this;

    return User.findOne({
        email,


    }).then((user) => {
        if (!user) {
            return Promise.reject({
                message: "email is incorrect !!",
            });

        }
        if (user.blocked == true) {
            return Promise.reject({
                message: "This is user is blocked from the system",
            });

        }
        if (user.isremoved == true) {
            return Promise.reject({
                message: "This is user is removed from the system",
            });
        }
        return new Promise((resolve, reject) => {

            bcrypt.compare(password, user.password, (err, res) => { // Compares the two passwords both hashed 
                if (res) {
                    resolve(user);
                } else {
                    reject({
                        message: "password is incorrect !!",
                        err,
                    });
                }
            });
        });
    });
};


export const User = mongoose.model('User', userSchema);