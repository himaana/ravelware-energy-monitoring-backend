import { queryApi } from "../config/influx.js";
import { ENV } from "../config/env.js";

export async function getLatestPanelData(panelId) {
    const flux = `
    from(bucket: "${ENV.INFLUX.BUCKET}")
      |> range(start: -10m)
      |> filter(fn: (r) =>
        r._measurement == "energy_metrics" and
        r.panel_id == "${panelId}"
      )
      |> last()
      |> pivot(
        rowKey:["_time"],
        columnKey:["_field"],
        valueColumn: "_value"
      )
  `;

    return new Promise((resolve, reject) => {
        let snapshot = null;

        queryApi.queryRows(flux, {
            next(row, tableMeta) {
                snapshot = tableMeta.toObject(row);
            },
            error(error) {
                reject(error);
            },
            complete() {
                resolve(snapshot);
            },
        });
    });
}

export async function getTodayKwh(panelId) {
    const fluxBase = `
    from(bucket: "${ENV.INFLUX.BUCKET}")
      |> range(start: today())
      |> filter(fn: (r) =>
        r._measurement == "energy_metrics" and
        r.panel_id == "${panelId}" and
        r._field == "kwh"
      )
  `;

    const firstQuery = `${fluxBase} |> first()`;
    const lastQuery = `${fluxBase} |> last()`;

    let firstKwh = null;
    let lastKwh = null;

    await new Promise((resolve, reject) => {
        queryApi.queryRows(firstQuery, {
            next(row, tableMeta) {
                const obj = tableMeta.toObject(row);
                firstKwh = Number(obj._value);
            },
            error(err) {
                reject(err);
            },
            complete() {
                resolve();
            },
        });
    });

    await new Promise((resolve, reject) => {
        queryApi.queryRows(lastQuery, {
            next(row, tableMeta) {
                const obj = tableMeta.toObject(row);
                lastKwh = Number(obj._value);
            },
            error(err) {
                reject(err);
            },
            complete() {
                resolve();
            },
        });
    });

    return { firstKwh, lastKwh };
}
