export function mapTopicToPanel(topic) {
    if (topic.includes("PANEL_LANTAI_1")) return { panelId: "PANEL_LANTAI_1" };
    if (topic.includes("PANEL_LANTAI_2")) return { panelId: "PANEL_LANTAI_2" };
    if (topic.includes("PANEL_LANTAI_3")) return { panelId: "PANEL_LANTAI_3" };
    return null;
}
