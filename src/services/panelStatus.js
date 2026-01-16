export function getPanelStatus(lastTimestamp) {
    const diffMinutes =
        (Date.now() - new Date(lastTimestamp).getTime()) / 60000;

    return diffMinutes > 5 ? "OFFLINE" : "ONLINE";
}
