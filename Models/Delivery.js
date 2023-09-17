import mongoose from "mongoose";
import mongoose_sequence from "mongoose-sequence";
import mongooseautopopulate from "mongoose-autopopulate";
import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import _ from "lodash";
import { secretOrPrivateKey } from "../config";
//Payement info 
const AutoIncrement = mongoose_sequence(mongoose);
const deliverySchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    companyName: {
        type: String,
        required: true,
        trim: true,
    },
    mobileNumber: [{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    }],
    password: {
        type: String,
        required: true,
        trim: true,
    },
 
    rating: {
        type: Number,
    },
    numberOfRatings: {
        type: Number,
    },
    blocked: {
        type: Boolean,
        default: false
    },

    imageURL: {
        type: String,
        required: false
    },
    taxNumber: {
        type: String,
        required: false
    },
    officialDocuments: [{
        type: String,
        required: false
    }],
    deliveryId: {
        type: Number,
        index: true,
        unique: true

    },
  
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
 

});
deliverySchema.index({ "$**": "text" }); // Add this for the search to work

deliverySchema.plugin(AutoIncrement, { inc_field: "deliveryId" }); // AutoIncrement deliveryid
deliverySchema.plugin(mongooseautopopulate); // Return object when searching by ID

deliverySchema.pre("save", async function() { //Before saving when creating delivery the password is hashed 
    if (this.isModified("password"))
        this.password = await hash(this.password, 10);
});
deliverySchema.pre("findOneAndUpdate", async function() { // Hashing password when updating it 
    if (this._update && this._update.password)
        this._update.password = await hash(this._update.password, 10);
});
deliverySchema.methods.toJSON = function() { // Return the delivery info as JASON without unwanted fields
    const delivery = this;
    const deliveryObject = delivery.toObject();

    return _.omit(deliveryObject, ["isBanned", "password", "tokens", "__v"]);
};

deliverySchema.methods.generateAuthToken = function() { // Generated the delivery token to access the website when registering and login
    const delivery = this;
    const access = "auth";
    const token = jwt.sign({
            _id: delivery._id.toHexString(),
            access
        },
        secretOrPrivateKey
    );
    delivery.tokens.push({ // Array to be able to be used on multiple devices
        access,
        token,
    });

    return delivery.save().then(() => {
        return token;
    });
};

deliverySchema.methods.removeToken = function(token) { // Remove token after the delivery logs out
    const delivery = this;

    return delivery.updateOne({
        $pull: {
            tokens: {
                token,
            },
        },
    });
};

deliverySchema.statics.findByToken = function(token) {
    const Delivery = this;
    let decoded;

    try {
        decoded = jwt.verify(token, secretOrPrivateKey); //verifies that the token is valid
    } catch (err) {
        return Promise.reject({
            message: err,
        });
    }

    return Delivery.findOne({
        _id: decoded._id,
        "tokens.token": token,
        "tokens.access": "auth",
    });
};
deliverySchema.statics.findByCredentials = function(email, password) { // Find using email
    const Delivery = this;

    return Delivery.findOne({
        email
    }).then((delivery) => {
        if (!delivery) {
            return Promise.reject({
                message: "email is incorrect !!",
            });
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, delivery.password, (err, res) => { // Compares the two passwords both hashed 
                if (res) {
                    resolve(delivery);
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

export const Delivery = mongoose.model('Delivery', deliverySchema);