import {
    getProfile,
    register,
    login,
    editProfile,
    changePassword,
    getListUser,
    editAvatar,
    getUser,
} from "../controllers/user/user";
import { addFriend, acceptFriend, unfriend } from "../controllers/user/friend";
import {
    getListChat,
    createChatRoom,
    getChatUser,
    getMessageChat,
} from "../controllers/user/chat";
import { Router } from "express";
import authentication from "../middlewares/authentication";
import { errorHandler } from "../utils/errorHandler ";
import { sendMessage } from "../controllers/user/message";
import upload from "../config/upload";
const User = Router();

User.get("/profile", authentication, getProfile, errorHandler);
User.get("/list", getListUser, errorHandler);
User.get("/user/:id", getUser, errorHandler);
User.post("/register", register, errorHandler);
User.post("/edit-profile", authentication, editProfile, errorHandler);
User.post("/change-password", authentication, changePassword, errorHandler);
User.post("/login", login, errorHandler);

User.post("/add-friend", authentication, addFriend, errorHandler);
User.post("/accep-friend", authentication, acceptFriend, errorHandler);
User.post("/unfriend", authentication, unfriend, errorHandler);

User.get("/chats", authentication, getListChat, errorHandler);
User.post("/chat", authentication, createChatRoom, errorHandler);
User.get("/chat/:id", authentication, getChatUser, errorHandler);
User.get("/message/:id", authentication, getMessageChat, errorHandler);
User.post("/message/:id", authentication, sendMessage, errorHandler);
User.post(
    "/avatar",
    authentication,
    upload.single("avatar"),
    editAvatar,
    errorHandler
);

export default User;
