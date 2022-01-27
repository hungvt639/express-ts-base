import { Req, Res } from "../../interfaces/Express";
import UserModel from "../../models/user";
import { TOPIC_MESSAGE } from "../../config/const";
import mqttClient from "../../config/mqtt";

import { STT_MESSAGE } from "../../models/chat";

export async function sendMessage(req: Req, res: Res, next) {
    try {
        const id: String = req.params.id as String;
        const _id = req.user._id;
        const content = req.body.content;
        if (!content) {
            res.status(400).json({ message: "Không được gửi tin nhắn trống" });
        }
        const user = await UserModel.findById(_id, "chats fullname");

        let chatIndex = user.chats.findIndex((c) => c._id == id);
        if (chatIndex < 0) {
            res.json({ message: "Không có id chat này" }).status(400);
            return;
        }
        const msg = {
            content: content,
            sender: req.user._id,
            status: STT_MESSAGE.DEFAULT,
        };
        user.chats[chatIndex].message.push(msg);
        let message = {
            to: user.chats[chatIndex].name,
            m: user.chats[chatIndex].message[
                user.chats[chatIndex].message.length - 1
            ],
            chat: id,
            from: user.fullname,
        };
        mqttClient.publish(
            `${TOPIC_MESSAGE}/${_id}`,
            JSON.stringify(message),
            { qos: 0, retain: false },
            (error) => {
                if (error) {
                    console.error(error);
                }
            }
        );
        user.save();

        for (let member of user.chats[chatIndex].member) {
            const userMember = await UserModel.findById(member.idUser, "chats");

            let chatIndex = userMember.chats.findIndex(
                (c) => c._id == member.idChat
            );
            if (chatIndex >= 0) {
                userMember.chats[chatIndex].message.push(msg);
                userMember.save();
                message.to = userMember.chats[chatIndex].name;
                message.chat = member.idChat;
                mqttClient.publish(
                    `${TOPIC_MESSAGE}/${member.idUser}`,
                    JSON.stringify(message),
                    { qos: 0, retain: false },
                    (error) => {
                        if (error) {
                            console.error(error);
                        }
                    }
                );
            }
        }

        res.json(message).status(200);
    } catch (err) {
        next(err);
    }
}

export async function getMessage(req: Req, res: Res, next) {
    try {
        const id: String = req.params.id as String; //id chat
        if (!id) {
            res.json({ message: "Lỗi request" }).status(404);
            return;
        }
        const _id = req.user?._id;
        const user = await UserModel.findById(_id).select({
            "chats._id": 1,
            "chats.message": 1,
        });
        const chats = user.chats?.filter((c) => c._id == id);
        if (chats.length) {
            res.json(chats[0].message).status(200);
        } else {
            res.status(400).json({ message: "Không tồn tại" });
        }
    } catch (err) {
        next(err);
    }
}
