import { getLatestPanelData } from "../repositories/energy.repository.js";
import { getTodayKwh } from "../repositories/energy.repository.js";
import { getPanelStatus } from "../services/panelStatus.js";
import {
    calculateCost,
    calculateTodayUsage,
} from "../services/energy.service.js";

const PANELS = ["PANEL_LANTAI_1", "PANEL_LANTAI_2", "PANEL_LANTAI_3"];

export async function getDashboardOverview(req, res) {
    const panels = [];
    let totalTodayUsage = 0;
    let totalTodayCost = 0;

    for (const panelId of PANELS) {
        const snapshot = await getLatestPanelData(panelId);
        if (!snapshot) continue;

        const { firstKwh, lastKwh } = await getTodayKwh(panelId);

        const todayUsage = calculateTodayUsage(firstKwh, lastKwh);
        const todayCost = calculateCost(todayUsage);

        totalTodayUsage += todayUsage;
        totalTodayCost += todayCost;

        panels.push({
            panelId,
            status: getPanelStatus(snapshot._time),
            voltageAvg: snapshot.voltage_avg,
            currentAvg: snapshot.current_avg,
            kw: snapshot.kw,
            todayUsage,
            todayCost,
            lastUpdate: snapshot._time,
        });
    }

    res.json({
        panels,
        totalTodayUsage: +totalTodayUsage.toFixed(2),
        totalTodayCost,
    });
}
