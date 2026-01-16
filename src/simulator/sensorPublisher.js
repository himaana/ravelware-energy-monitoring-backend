import mqtt from "mqtt";

const client = mqtt.connect("mqtt:://localhost:1883");

const topics = [
    "DATA/PM/PANEL_LANTAI_1",
    "DATA/PM/PANEL_LANTAI_2",
    "DATA/PM/PANEL_LANTAI_3",
];

function generatedPayload() {
    return {
        v: [
            +(220 + Math.random() * 5).toFixed(1),
            +(220 + Math.random() * 5).toFixed(1),
            +(Math.random() > 0.2 ? 220 : 0).toFixed(1),
            +(150 + Math.random() * 5).toFixed(1),
        ],
        i: [
            +(Math.random() * 0.5).toFixed(2),
            +(Math.random() * 0.5).toFixed(2),
            +(Math.random() * 0.5).toFixed(2),
            +(Math.random() * 0.5).toFixed(2),
        ],
        kw: +(Math.random() * 5).toFixed(2),
        kwh: +(Math.random() * 100).toFixed(2),
        pf: +Math.random().toFixed(2),
        vunbal: +Math.random().toFixed(2),
        iunbal: +Math.random().toFixed(2),
        time: +Math.random().toFixed(2),
    };
}

client.on("connect", () => {
    console.log("Sensor simulator connected");

    setInterval(() => {
        topics.forEach((topic) => {
            const payload = generatedPayload();
            client.publish(topic, JSON.stringify(payload));
            console.log(`Published to ${topic}`, payload);
        });
    }, 60 * 1000);
});
