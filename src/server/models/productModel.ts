import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    oldPrice: {
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    imagesURlList: [
      {
        type: String,
        required: true,
      },
    ],
    thumbnail: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    isNew: {
      type: Boolean,
      required: true,
      default: false,
    },
    reviews: [reviewSchema],
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
