import mongoose from "mongoose";
import {
    ChatInterface,
    MessageInterface,
    MemberInterface,
} from "../interfaces/user";
const Schema = mongoose.Schema;

export const STT_CHAT = {
    DEFAULT: 0,
};
export const STT_MESSAGE = {
    DEFAULT: 0,
};

const Member = new Schema<MemberInterface>(
    {
        idUser: String,
        idChat: String,
    },
    { timestamps: { createdAt: "created_at" } }
);

const Message = new Schema<MessageInterface>(
    {
        content: String,
        sender: String,
        status: Number,
    },
    { timestamps: { createdAt: "created_at" } }
);
export const Chat = new Schema<ChatInterface>(
    {
        name: String,
        member: [Member],
        message: [Message],
        status: Number,
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);
