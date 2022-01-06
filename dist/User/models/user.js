"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
// const ObjectId = Schema.ObjectId;
const User = new Schema({
    email: String,
    username: { type: String, required: true, unique: true, maxlength: 200 },
    passsword: String,
    name: String,
    age: Number,
    address: String,
    birthday: Date,
});
const UserModel = mongoose_1.default.model("User", User);
exports.default = UserModel;
//# sourceMappingURL=user.js.map