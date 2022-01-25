import { Req, Res } from "../../interfaces/Express";
import { DataLoginInterface, UserInterface } from "../../interfaces/user";
import bcrypt from "bcrypt";
import UserModel from "../../models/user";
import jwt from "jsonwebtoken";
import { SECRET, TOPIC_MESSAGE } from "../../config/const";
import mqttClient from "../../config/mqtt";
import { createNotifcation } from "../../utils/createNotify";
import { CreateNotification } from "../../interfaces/Notification";
import { NOTIFY_STT } from "../../models/notification";
import { STT_CHAT, STT_MESSAGE } from "../../models/chat";

export async function sendMessage(req: Req, res: Res, next) {
    try {
        const id: String = req.params.id as String;
        const _id = req.user._id;
        const content = req.body.content;
        if (!content) {
            res.status(400).json({ message: "Không được gửi tin nhắn trống" });
        }
        const user = await UserModel.findById(_id, "chats");

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
        user.save();
        const message =
            user.chats[chatIndex].message[
                user.chats[chatIndex].message.length - 1
            ];
        for (let member of user.chats[chatIndex].member) {
            const userMember = await UserModel.findById(member.idUser, "chats");

            let chatIndex = userMember.chats.findIndex(
                (c) => c._id == member.idChat
            );
            if (chatIndex >= 0) {
                userMember.chats[chatIndex].message.push(msg);
                userMember.save();
                console.log("id_", member.idChat);

                mqttClient.publish(
                    `${TOPIC_MESSAGE}/${member.idChat}`,
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
