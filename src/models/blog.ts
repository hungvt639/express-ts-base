import mongoose from "mongoose";
import slug from "mongoose-slug-generator";

const Schema = mongoose.Schema;
mongoose.plugin(slug);
const Blog = new Schema(
    {
        title: { type: String, required: true },
        slug: {
            type: String,
            slug: "title",
            unique: true,
            slug_padding_size: 4,
        },
        content: { type: String },
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const BlogModel = mongoose.model("Blog", Blog);

export default BlogModel;
