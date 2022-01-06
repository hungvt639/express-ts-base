import { Req, Res } from "../interfaces/Express";
import BlogModel from "../models/blog";

export async function getListBlog(req: Req, res: Res, next) {
    try {
        const data = await BlogModel.find();
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
}

export async function createBlog(req: Req, res: Res, next) {
    try {
        const value = req.body;
        const data = await BlogModel.create(value);
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
}

export async function getBlog(req: Req, res: Res, next) {
    try {
        const slug = req.params.slug;
        const data = await BlogModel.findOne({ slug: slug });
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
}
