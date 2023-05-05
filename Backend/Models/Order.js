import mongoose from "mongoose";
import mongoose_sequence from "mongoose-sequence";
import { PaymentTypeEnums } from "../utils";

const AutoIncrement = mongoose_sequence(mongoose);

const orderSchema = mongoose.Schema({
    ordernumber: {
        type: Number,
        unique: true,
        index: true
    },
    products: [{
        product: {
            type: mongoose.Types.ObjectId,
            ref: "Product"
        },
        deliveryStart: {
            type: Date

        },
        deliveryEnd: {
            type: Date
        },
        supplier: {
            type: mongoose.Types.ObjectId,
            ref: "Suplier"
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        status: {
            type: String,
            default: "Pending"
        },
        deliveryOn: {
            type: Date,
            default: null
        },
        priceatPurchase: {
            type: Number,
            required: true
        },
        dateOfPurchase: {
            type: Date,
            default: Date.now()
        },
        estimatedTime: {
            days: {
                type: Number,
                required: true
            },
            hours: {
                type: Number,
                required: true
            },
            minutes: {
                type: Number,
                required: true
            },
        },
        delivery: {
            type: mongoose.Types.ObjectId,
            ref: "Delivery"
        },
        deliveryFees: {
            type: Number,
            required: true,
            default: 0
        }
    },],
    price: {
        type: Number,
        required: false
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    delivery: {
        address: {
            type: String,
            required: true,
        },
        mapCoordinate: {
            lat: {
                type: Number,
            },
            long: {
                type: Number,
            },
        },
    },
    paymentType: {
        type: Number,
        required: true,
        default: PaymentTypeEnums.COD
    }
});
orderSchema.index({ "$**": "text" });
orderSchema.plugin(AutoIncrement, { inc_field: "ordernumber" });
export const Order = mongoose.model('Order', orderSchema);