import { createBlog, getBlog, getListBlog } from "../controllers/blog";
import { Router } from "express";

const Blog = Router();

Blog.post("/create", createBlog);
Blog.get("/", getListBlog);
Blog.get("/:slug", getBlog);

export default Blog;
