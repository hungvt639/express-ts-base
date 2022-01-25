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
import { sendMessage } from "../controllers/user/message";
import upload from "../config/upload";
const User = Router();

User.get("/profile", authentication, getProfile);
User.get("/list", getListUser);
User.get("/user/:id", getUser);
User.post("/register", register);
User.post("/edit-profile", authentication, editProfile);
User.post("/change-password", authentication, changePassword);
User.post("/login", login);

User.post("/add-friend", authentication, addFriend);
User.post("/accep-friend", authentication, acceptFriend);
User.post("/unfriend", authentication, unfriend);

User.get("/chats", authentication, getListChat);
User.post("/chat", authentication, createChatRoom);
User.get("/chat/:id", authentication, getChatUser);
User.get("/message/:id", authentication, getMessageChat);
User.post("/message/:id", authentication, sendMessage);
User.post("/avatar", authentication, upload.single("avatar"), editAvatar);
export default User;
