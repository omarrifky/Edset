import mongoose from "mongoose";
import mongoose_sequence from "mongoose-sequence";
import mongooseautopopulate from "mongoose-autopopulate";
import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import _ from "lodash";
import { secretOrPrivateKey } from "../config";
//Payement info
const AutoIncrement = mongoose_sequence(mongoose);
const supplierSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  address: {
    name: {
      type: String,
      required: true,
    },
    mapCoordinate: {
      lat: {
        type: Number,
        required: true,
      },
      long: {
        type: Number,
        required: true,
      },
    },
  },
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  mobileNumbers: [
    {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  ],
  password: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  numberOfRatings: {
    type: Number,
  },
  blocked: {
    type: Boolean,
    default: false,
  },
  imageURL: {
    type: String,
    required: false,
  },
  taxNumber: {
    type: String,
    required: false,
  },
  officialDocuments: [
    {
      type: String,
      required: false,
    },
  ],
  supplierId: {
    type: Number,
    index: true,
    unique: true,
  },
  tokens: [
    {
      access: {
        type: String,
        required: true,
      },
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
supplierSchema.index({ "$**": "text" }); // Add this for the search to work

supplierSchema.plugin(AutoIncrement, { inc_field: "supplierId" }); // AutoIncrement supplierid
supplierSchema.plugin(mongooseautopopulate); // Return object when searching by ID

supplierSchema.pre("save", async function () {
  //Before saving when creating supplier the password is hashed
  if (this.isModified("password"))
    this.password = await hash(this.password, 10);
});
supplierSchema.pre("findOneAndUpdate", async function () {
  // Hashing password when updating it
  if (this._update && this._update.password)
    this._update.password = await hash(this._update.password, 10);
});
supplierSchema.methods.toJSON = function () {
  // Return the supplier info as JASON without unwanted fields
  const supplier = this;
  const supplierObject = supplier.toObject();

  return _.omit(supplierObject, ["isBanned", "password", "tokens", "__v"]);
};

supplierSchema.methods.generateAuthToken = function () {
  // Generated the supplier token to access the website when registering and login
  const supplier = this;
  const access = "auth";
  const token = jwt.sign(
    {
      _id: supplier._id.toHexString(),
      access,
    },
    secretOrPrivateKey
  );
  supplier.tokens.push({
    // Array to be able to be used on multiple devices
    access,
    token,
  });

  return supplier.save().then(() => {
    return token;
  });
};

supplierSchema.methods.removeToken = function (token) {
  // Remove token after the supplier logs out
  const supplier = this;

  return supplier.updateOne({
    $pull: {
      tokens: {
        token,
      },
    },
  });
};

supplierSchema.statics.findByToken = function (token) {
  const Supplier = this;
  let decoded;

  try {
    decoded = jwt.verify(token, secretOrPrivateKey); //verifies that the token is valid
  } catch (err) {
    return Promise.reject({
      message: err,
    });
  }

  return Supplier.findOne({
    _id: decoded._id,
    "tokens.token": token,
    "tokens.access": "auth",
  });
};
supplierSchema.statics.findByCredentials = function (email, password) {
  // Find using email
  const Supplier = this;

  return Supplier.findOne({
    email,
  }).then((supplier) => {
    if (!supplier) {
      return Promise.reject({
        message: "email is incorrect !!",
      });
    }
    if (supplier.blocked) {
      return Promise.reject({
        message: "You are blocked, please contact support for fearther notes!!",
      });
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, supplier.password, (err, res) => {
        // Compares the two passwords both hashed
        if (res) {
          resolve(supplier);
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

export const Supplier = mongoose.model("Supplier", supplierSchema);
