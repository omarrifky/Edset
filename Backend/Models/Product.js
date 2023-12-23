import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },

  photoLinks: [
    {
      type: String,
      required: false,
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  percentageDiscount: {
    type: Number,
  },

  rating: {
    type: Number,
    required: false,
  },
  supplier: {
    type: mongoose.Types.ObjectId,
    ref: "Supplier",
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  isremoved: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    required: true,
  },
  Subcategory: {
    type: String,
    required: false,
  },
  tags: [String],
});
productSchema.index({ "$**": "text" }); // Add this for the search to work

export const Product = mongoose.model("Product", productSchema);
