import * as mqtt from "mqtt";
import { MQTT } from "./const";
console.log(MQTT);

const mqttClient = mqtt.connect(MQTT, {
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000,
});

export default mqttClient;
