import mongoose from "mongoose";
export const NOTIFY_STT = {
    ADD_FRIEND: 0,
};
const Schema = mongoose.Schema;
const Notification = new Schema(
    {
        head: { type: String, required: true },
        content: String,
        data: String,
        status: Number,
        user: String,
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const NotificationModel = mongoose.model("Notification", Notification);

export default NotificationModel;
