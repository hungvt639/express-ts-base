import { getListProduct, createProduct } from "../controllers/product";
import { Router } from "express";

const Product = Router();

Product.post("/create", createProduct);
Product.get("/list", getListProduct);
export default Product;
