import mongoose from "mongoose";
import {
    ChatZoomInterface,
    FriendInterface,
    UserInterface,
} from "../interfaces/user";
const Schema = mongoose.Schema;

export const CHAT_ZOOM_STT = {
    default: 0,
};

const ChatZoom = new Schema<ChatZoomInterface>(
    {
        name: String,
        status: Number,
        idChat: String,
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Friend = new Schema<FriendInterface>(
    {
        idFriend: String,
        fullname: String,
        status: Number,
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const User = new Schema<UserInterface>(
    {
        email: { type: String, required: true, unique: true },
        username: {
            type: String,
            required: true,
            unique: true,
            maxlength: 200,
        },
        password: { type: String, required: true, maxlength: 2000 },
        fullname: String,
        address: String,
        birthday: Date,
        avatar: { type: String, default: "/public/img/avatar.jpg" },
        friends: [Friend],
        chatZoom: [ChatZoom],
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const UserModel = mongoose.model("User", User);

export default UserModel;
