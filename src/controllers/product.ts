import { Req, Res } from "../interfaces/Express";
import ProductModel from "../models/product";

export async function getListProduct(req: Req, res: Res, next) {
    const data = await ProductModel.find();
    res.status(200).json(data);
}

export async function createProduct(req: Req, res: Res, next) {
    const value = req.body;
    const data = await ProductModel.create(value);
    res.status(200).json(data);
}
