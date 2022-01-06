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
import ChatModel, { STT_CHAT, STT_MESSAGE } from "../../models/chat";

export async function sendMessage(req: Req, res: Res, next) {
    try {
        const id: String = req.params.id as String;
        const content = req.body.content;
        if (!content) {
            res.status(400).json({ message: "Không được gửi tin nhắn trống" });
        }
        let chats = await ChatModel.findById(id);
        chats.message.push({
            content: content,
            sender: req.user._id,
            status: STT_MESSAGE.DEFAULT,
        });
        chats.save();
        const message = chats.message[chats.message.length - 1];
        mqttClient.publish(
            `${TOPIC_MESSAGE}/${id}`,
            JSON.stringify(message),
            { qos: 0, retain: false },
            (error) => {
                if (error) {
                    console.error(error);
                }
            }
        );
        res.json(message).status(200);
    } catch (err) {
        next(err);
    }
}
