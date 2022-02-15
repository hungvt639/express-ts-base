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
import { sendMessage, getMessage } from "../controllers/user/message";
import upload from "../config/upload";
import fnHandler from "../utils/fnHandler";

const User = Router();

User.get("/profile", authentication, fnHandler(getProfile));
User.get("/list", fnHandler(getListUser));
User.get("/user/:id", fnHandler(getUser));
User.post("/register", fnHandler(register));
User.post("/edit-profile", authentication, fnHandler(editProfile));
User.post("/change-password", authentication, fnHandler(changePassword));
User.post("/login", fnHandler(login));

User.post("/add-friend", authentication, fnHandler(addFriend));
User.post("/accep-friend", authentication, fnHandler(acceptFriend));
User.post("/unfriend", authentication, fnHandler(unfriend));

User.get("/chats", authentication, fnHandler(getListChat));
User.post("/chat", authentication, fnHandler(createChatRoom));
User.get("/chat/:id", authentication, fnHandler(getChatUser));
User.get("/message-chat/:id", authentication, fnHandler(getMessageChat));
User.get("/message/:id", authentication, fnHandler(getMessage));
User.post("/message/:id", authentication, fnHandler(sendMessage));
User.post(
    "/avatar",
    authentication,
    upload.single("avatar"),
    fnHandler(editAvatar)
);
export default User;
