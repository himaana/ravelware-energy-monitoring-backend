import {
    getLatestPanelData,
    getTodayKwh,
} from "../repositories/energy.repository.js";
import { getPanelStatus } from "../services/panelStatus.js";
import {
    calculateCost,
    calculateTodayUsage,
} from "../services/energy.service.js";

const PANELS = ["PANEL_LANTAI_1", "PANEL_LANTAI_2", "PANEL_LANTAI_3"];

export async function getRealtimePanels(req, res) {
    const result = [];

    for (const panelId of PANELS) {
        const data = await getLatestPanelData(panelId);
        if (!data) continue;

        result.push({
            panelId,
            status: getPanelStatus(data._time),
            voltage: data.voltage_avg,
            current: data.current_avg,
            kw: data.kw,
            lastUpdate: data._time,
        });
    }

    res.json(result);
}

export async function getTodayUsage(req, res) {
    const { panelId } = req.params;

    const { firstKwh, lastKwh } = await getTodayKwh(panelId);
    console.log(firstKwh);
    console.log(lastKwh);

    const usage = calculateTodayUsage(firstKwh, lastKwh);
    const cost = calculateCost(usage);

    res.json({
        panelId,
        todayUsage: usage,
        cost,
    });
}
