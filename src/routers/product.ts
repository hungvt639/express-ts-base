import { getListProduct, createProduct } from "../controllers/product";
import { Router } from "express";
import { errorHandler } from "../utils/errorHandler ";

const Product = Router();

Product.post("/create", createProduct, errorHandler);
Product.get("/list", getListProduct, errorHandler);
export default Product;
