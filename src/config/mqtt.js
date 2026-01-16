import mqtt from "mqtt";
import { ENV } from "./env.js";

export const mqttClient = mqtt.connect(ENV.MQTT.BROKER_URL);
