import { TOPIC_NOTIFICATION, TOPIC_NOTIFICATION_USER } from "../config/const";
import mqttClient from "../config/mqtt";
import { Req, Res } from "../interfaces/Express";
import NotificationModel from "../models/notification";

export async function getNotifyNotUser(req: Req, res: Res, next) {
    const data = await NotificationModel.find({ user: null }).sort({
        _id: -1,
    });
    res.status(200).json(data);
}
export async function getNotifyForUser(req: Req, res: Res, next) {
    const data = await NotificationModel.find({ user: req.user?._id }).sort({
        _id: -1,
    });
    res.status(200).json(data);
}
export async function createNotify(req: Req, res: Res, next) {
    const value = req.body;
    const data = await NotificationModel.create(value);
    let topic = TOPIC_NOTIFICATION;
    if (value.user) {
        topic = `${TOPIC_NOTIFICATION_USER}/${value.user}`;
    }
    mqttClient.publish(
        topic,
        JSON.stringify(data),
        { qos: 0, retain: false },
        (error) => {
            if (error) {
                console.error(error);
            }
        }
    );
    res.status(200).json(data);
}
