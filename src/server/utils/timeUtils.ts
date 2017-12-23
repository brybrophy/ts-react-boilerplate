export function getTimeData(now = new Date()) {
    return {
        OBJ: now,
        STR: now.toString(),
        UTC: now.toUTCString()
    };
}
