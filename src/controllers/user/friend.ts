import { Req, Res } from "../../interfaces/Express";
import { DataLoginInterface, UserInterface } from "../../interfaces/user";
import bcrypt from "bcrypt";
import UserModel from "../../models/user";
import jwt from "jsonwebtoken";
import { SECRET } from "../../config/const";
import mqttClient from "../../config/mqtt";
import { createNotifcation } from "../../utils/createNotify";
import { CreateNotification } from "../../interfaces/Notification";
import { NOTIFY_STT } from "../../models/notification";

const STT = {
    REQUEST_INVITE: 0, //gửi lời mời
    WAIT_CONFIRM: 1, //chờ xác nhận
    FRIENDER: 2, //đã kết bạn
};

export async function addFriend(req: Req, res: Res, next) {
    const { idFriend } = req.body;
    if (!idFriend) {
        res.status(400).json({ message: "Không được để trống id Friend" });
        return;
    }
    if (idFriend === req.user._id) {
        res.status(400).json({
            message: "Không thể tự kết bạn với bản thân",
        });
        return;
    }
    const friend = await UserModel.findById(idFriend);
    if (!friend) {
        res.status(400).json({ message: "Người này không tồn tại" });
        return;
    }

    const user = await UserModel.findById(req.user._id);
    const has = user.friends.filter((fr) => fr.idFriend === idFriend);
    if (has.length) {
        res.status(400).json({
            message: "Người này đã ở trong danh sách bạn bè của bạn",
        });
        return;
    }
    user.friends.push({
        idFriend: idFriend,
        status: STT.REQUEST_INVITE,
        fullname: friend.fullname,
    });
    friend.friends.push({
        idFriend: user._id,
        status: STT.WAIT_CONFIRM,
        fullname: user.fullname,
    });
    user.save();
    friend.save();

    const notify: CreateNotification = {
        head: `${user.fullname} muốn gửi cho bạn lời mời kết bạn`,
        status: NOTIFY_STT.ADD_FRIEND,
        data: JSON.stringify({
            _id: user._id,
            username: user.username,
            email: user.email,
        }),
        user: friend._id,
    };
    createNotifcation(notify);
    res.json({ friends: user.friends }).status(200);
}

export async function acceptFriend(req: Req, res: Res, next) {
    const { idFriend } = req.body;
    if (!idFriend) {
        res.status(400).json({ message: "Không được để trống id Friend" });
        return;
    }
    if (idFriend === req.user._id) {
        res.status(400).json({
            message: "Không thể tự kết bạn với bản thân",
        });
        return;
    }
    const friend = await UserModel.findById(idFriend);
    if (!friend) {
        res.status(400).json({ message: "Người này không tồn tại" });
        return;
    }

    const user = await UserModel.findById(req.user._id);
    const indexU = user.friends.findIndex((fr) => fr.idFriend === idFriend);
    const indexF = friend.friends.findIndex(
        (fr) => fr.idFriend === user._id.toString()
    );

    if (indexU < 0 || indexF < 0) {
        res.status(400).json({
            message: "Không thể chấp nhận lời mời",
        });
        return;
    }
    user.friends[indexU].status = STT.FRIENDER;
    friend.friends[indexF].status = STT.FRIENDER;
    user.save();
    friend.save();
    res.json({ friends: user.friends }).status(200);
}

export async function unfriend(req: Req, res: Res, next) {
    const idFriend = req.body.idFriend;
    const friend = await UserModel.findById(idFriend);
    const user = await UserModel.findById(req.user?._id);
    const indexU = user.friends.findIndex((fr) => fr.idFriend === idFriend);
    const indexF = friend.friends.findIndex(
        (fr) => fr.idFriend === user._id.toString()
    );
    if (indexU < 0 || indexF < 0) {
        res.status(400).json({
            message: "Không thể hủy kết bạn khi chưa là bạn bè",
        });
        return;
    }
    friend.friends = friend.friends
        .slice(0, indexF)
        .concat(friend.friends.slice(indexF + 1));
    user.friends = user.friends
        .slice(0, indexU)
        .concat(user.friends.slice(indexU + 1));
    user.save();
    friend.save();
    res.json({ friends: user.friends }).status(200);
}
