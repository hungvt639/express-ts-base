import { createBlog, getBlog, getListBlog } from "../controllers/blog";
import { Router } from "express";
import authentication from "../middlewares/authentication";
import { errorHandler } from "../utils/errorHandler ";

const Blog = Router();

Blog.post("/create", createBlog, errorHandler);
Blog.get("/", getListBlog, errorHandler);
Blog.get("/:slug", getBlog, errorHandler);

export default Blog;
