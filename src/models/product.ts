import mongoose from "mongoose";

const Schema = mongoose.Schema;
const Product = new Schema(
    {
        name: { type: String, required: true },
        description: String,
        price: String,
        image: String,
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const ProductModel = mongoose.model("Product", Product);

export default ProductModel;
