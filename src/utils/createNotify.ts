import mqttClient from "../config/mqtt";
import NotificationModel from "../models/notification";
import { TOPIC_NOTIFICATION, TOPIC_NOTIFICATION_USER } from "../config/const";
import { CreateNotification } from "../interfaces/Notification";

export async function createNotifcation(value: CreateNotification) {
    const datas = await NotificationModel.create(value);
    let topic = TOPIC_NOTIFICATION;
    if (value.user) {
        topic = `${TOPIC_NOTIFICATION_USER}/${value.user}`;
    }
    mqttClient.publish(
        topic,
        JSON.stringify(datas),
        { qos: 0, retain: false },
        (error) => {
            if (error) {
                console.error(error);
            }
        }
    );
}
