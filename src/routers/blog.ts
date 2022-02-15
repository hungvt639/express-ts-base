import { createBlog, getBlog, getListBlog } from "../controllers/blog";
import { Router } from "express";
import fnHandler from "../utils/fnHandler";
const Blog = Router();

Blog.post("/create", fnHandler(createBlog));
Blog.get("/", fnHandler(getListBlog));
Blog.get("/:slug", fnHandler(getBlog));

export default Blog;
