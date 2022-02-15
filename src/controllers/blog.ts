import { Req, Res } from "../interfaces/Express";
import BlogModel from "../models/blog";

export async function getListBlog(req: Req, res: Res, next) {
    const data = await BlogModel.find();
    res.status(200).json(data);
}

export async function createBlog(req: Req, res: Res, next) {
    const value = req.body;
    const data = await BlogModel.create(value);
    res.status(200).json(data);
}

export async function getBlog(req: Req, res: Res, next) {
    const slug = req.params.slug;
    const data = await BlogModel.findOne({ slug: slug });
    res.status(200).json(data);
}
