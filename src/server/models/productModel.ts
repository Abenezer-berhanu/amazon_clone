import mongoose from "mongoose";


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
        type:String,
        required: true
      }
    ],
    thumbnail:{
      type: String,
      required: true
    },
    subCategory:{
      type: String,
      required:true
    },
    amount:{
      type: Number,
      required: true
    },
    isNew: {
      type: Boolean,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
