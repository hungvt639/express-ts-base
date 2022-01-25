import { Req, Res } from "../../interfaces/Express";
import { DataLoginInterface, UserInterface } from "../../interfaces/user";
import bcrypt from "bcrypt";
import UserModel from "../../models/user";
import jwt from "jsonwebtoken";
import { SECRET, UPLOAD_TO } from "../../config/const";
import { SchemaDefinitionProperty } from "mongoose";
export async function getListUser(req: Req, res: Res, next) {
    try {
        const users = await UserModel.find({}, "_id fullname username");
        res.json(users).status(200);
    } catch (err) {
        next(err);
    }
}
export async function getUser(req: Req, res: Res, next) {
    try {
        const id = req.params.id;
        const option: string = req.body.option;
        const user = await UserModel.findById(id, option);
        res.json(user).status(200);
    } catch (err) {
        next(err);
    }
}
export async function getProfile(req: Req, res: Res, next) {
    try {
        res.json(req.user).status(200);
    } catch (err) {
        next(err);
    }
}

export async function register(req: Req, res: Res, next) {
    try {
        const data = req.body;
        const salt = bcrypt.genSaltSync(10);
        data.password = bcrypt.hashSync(data.password, salt);
        const user = await UserModel.create(data);
        res.json({ message: user });
    } catch (err) {
        next(err);
    }
}

export async function login(req: Req, res: Res, next: any) {
    try {
        const data: DataLoginInterface = req.body;
        if (!data.username || !data.password) {
            res.json({
                message: "Vui lòng điền đầy đủ tài khoản mật khẩu",
            }).status(400);
            return;
        }
        const user = await UserModel.findOne(
            {
                username: data.username as SchemaDefinitionProperty<{
                    type: String;
                    required: true;
                }>,
            },
            "_id email username password fullname address birthday avatar friends"
        );
        if (!user) {
            res.status(400).json({
                message: "Sai tên tài khoản hoặc mật khẩu!",
            });
            return;
        }
        const match = await bcrypt.compare(data.password, user.password);
        if (!match) {
            res.status(400).json({
                message: "Sai tên tài khoản hoặc mật khẩu!",
            });
            return;
        }
        const token = jwt.sign(
            {
                _id: user._id,
                username: user.username,
                name: user.fullname,
            },
            SECRET
        );
        user.password = "";
        res.status(200).json({ token: token, user: user, message: "ok" });
    } catch (err) {
        next(err);
    }
}

export async function editProfile(req: Req, res: Res, next) {
    try {
        const { fullname, address, birthday } = req.body;
        const user: UserInterface = await UserModel.findOneAndUpdate(
            { username: req.user.username },
            { fullname, address, birthday },
            { new: true }
        );
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

export async function changePassword(req: Req, res: Res, next) {
    try {
        const { password, oldPassword } = req.body;
        if (!password) {
            res.status(400).json({ message: "Mật khẩu không được để trống" });
            return;
        }
        const match = await bcrypt.compare(oldPassword, req.user.password);
        if (!match) {
            res.status(400).json({ message: "Mật khẩu cũ không khớp" });
            return;
        }
        const salt = bcrypt.genSaltSync(10);
        const newPassword = bcrypt.hashSync(password, salt);

        await UserModel.findByIdAndUpdate(req.user._id, {
            password: newPassword,
        });
        res.status(200).json({ message: "Thay đổi mật khẩu thành công" });
    } catch (err) {
        next(err);
    }
}

export async function editAvatar(req: Req, res: Res, next) {
    const file = req.file;
    if (!file) {
        const error: any = new Error("Upload file again!");
        error.httpStatusCode = 400;
        return next(error);
    }
    const avatarUrl = `/${UPLOAD_TO}/${req.file.filename}`;
    try {
        await UserModel.findByIdAndUpdate(req.user._id, {
            avatar: avatarUrl,
        });
        res.status(200).json({
            avatar: avatarUrl,
        });
    } catch (err) {
        next(err);
    }
}
