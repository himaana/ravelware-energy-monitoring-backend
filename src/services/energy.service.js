import { Point } from "@influxdata/influxdb-client";
import { writeApi } from "../config/influx.js";

export async function writeEnergyData(panel, payload) {
    const point = new Point("energy_metrics")
        .tag("panel_id", panel.panelId)
        .floatField("voltage_r", payload.v[0])
        .floatField("voltage_s", payload.v[1])
        .floatField("voltage_t", payload.v[2])
        .floatField("voltage_avg", payload.v[3])
        .floatField("current_r", payload.i[0])
        .floatField("current_s", payload.i[1])
        .floatField("current_t", payload.i[2])
        .floatField("current_avg", payload.i[3])
        .floatField("kw", payload.kw)
        .floatField("kwh", payload.kwh)
        .floatField("pf", payload.pf)
        .floatField("unbalance_v", payload.vunbal)
        .floatField("unbalance_i", payload.iunbal)
        .timestamp(new Date(payload.time));

    writeApi.writePoint(point);
    await writeApi.flush();
}

export function calculateTodayUsage(firstKwh, lastKwh) {
    if (firstKwh == null || lastKwh == null) return 0;
    return +(lastKwh - firstKwh).toFixed(2);
}

export function calculateCost(kwh) {
    return Math.round(kwh * 1500);
}
