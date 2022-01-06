import mongoose from "mongoose";
import { ChatInterface, MessageInterface } from "../interfaces/user";
const Schema = mongoose.Schema;

export const STT_CHAT = {
    DEFAULT: 0,
};
export const STT_MESSAGE = {
    DEFAULT: 0,
};
const Message = new Schema<MessageInterface>(
    {
        content: String,
        sender: String,
        status: Number,
    },
    { timestamps: { createdAt: "created_at" } }
);
const Chat = new Schema<ChatInterface>(
    {
        member: [String],
        message: [Message],
        status: Number,
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const ChatModel = mongoose.model("Chat", Chat);

export default ChatModel;
