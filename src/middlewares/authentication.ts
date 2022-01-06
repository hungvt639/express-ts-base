import jwt from "jsonwebtoken";
import { SECRET } from "../config/const";
import { Req, Res } from "../interfaces/Express";
import { UserInterface } from "../interfaces/user";
import UserModel from "../models/user";
// const jwt = require("jsonwebtoken");
// import { Request } from "express";
const authentication = (req: Req, res: Res, next: any) => {
    try {
        const bearerToken = req.headers.authorization;
        const tokens = bearerToken.split(" ");
        if (tokens[0] !== "Bearer") {
            res.status(401).json({ message: "Token is not valid" });
        } else {
            jwt.verify(tokens[1], SECRET, async (err, payload) => {
                if (payload) {
                    await UserModel.findById(payload._id)
                        .exec()
                        .then((user: UserInterface) => {
                            req.user = user;
                            next();
                        })
                        .catch((err) => {
                            res.status(401).json({ message: err.message });
                        });
                } else {
                    res.status(401).json({ message: err.message });
                }
            });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export default authentication;
