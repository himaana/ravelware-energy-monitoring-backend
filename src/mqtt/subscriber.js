import { mqttClient } from "../config/mqtt.js";
import { mapTopicToPanel } from "./topicMapper.js";
import { writeEnergyData } from "../services/energy.service.js";

mqttClient.on("connect", () => {
    console.log("MQTT connected");
    mqttClient.subscribe("DATA/PM/#");
});

mqttClient.on("message", async (topic, message) => {
    try {
        const payload = JSON.parse(message.toString());
        const panel = mapTopicToPanel(topic);
        if (!panel) return;

        await writeEnergyData(panel, payload);
        console.log(`Data saved for ${panel.panelId}`);
    } catch (err) {
        console.error("MQTT message error:", err.message);
    }
});
