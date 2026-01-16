import dotenv from "dotenv";
dotenv.config();

export const ENV = {
    PORT: process.env.PORT || 3000,

    INFLUX: {
        URL: process.env.INFLUX_URL,
        TOKEN: process.env.INFLUX_TOKEN,
        ORG: process.env.INFLUX_ORG,
        BUCKET: process.env.INFLUX_BUCKET,
    },

    MQTT: {
        BROKER_URL: process.env.MQTT_BROKER_URL,
    },
};
