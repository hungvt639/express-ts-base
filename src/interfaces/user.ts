// import UserModel from "../models/user";
import { SchemaDefinitionProperty } from "mongoose";
export interface FriendInterface {
    _id?: String;
    idFriend: String;
    status: number;
    fullname: String;
}
export interface UserInterface {
    _id: String;
    email: SchemaDefinitionProperty<{ type: String; required: true }>;
    username: SchemaDefinitionProperty<{
        type: String;
        required: true;
    }>;
    password: SchemaDefinitionProperty<{ type: String; required: true }>;
    fullname?: String;
    address?: String;
    birthday?: Date;
    friends?: FriendInterface[];
    avatar?: SchemaDefinitionProperty<String>;
    chats?: ChatInterface[];
}
// export type UserInterface = typeof UserModel<UserInterfaces>
export interface DataLoginInterface {
    username: String;
    password: String;
}

export interface MemberInterface {
    _id: String;
    idUser: String;
    idChat: String;
}

export interface MessageInterface {
    _id?: String;
    content: String;
    sender: String;
    status: Number;
}
export interface ChatInterface {
    _id: String;
    name: String;
    member?: MemberInterface[];
    message?: MessageInterface[];
    status: number;
}

// export interface ChatZoomInterface {
//     _id: String;
//     name: String;
//     status: Number;
//     idChat: String;
// }
