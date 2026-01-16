import { InfluxDB } from "@influxdata/influxdb-client";
import { ENV } from "./env.js";

const influxDB = new InfluxDB({
    url: ENV.INFLUX.URL,
    token: ENV.INFLUX.TOKEN,
});

export const writeApi = influxDB.getWriteApi(ENV.INFLUX.ORG, ENV.INFLUX.BUCKET);

export const queryApi = influxDB.getQueryApi(ENV.INFLUX.ORG);
