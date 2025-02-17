import { formatDateData } from "../utils/formatData";
import { get } from "../utils/request";

export const getChartData = async () => {
    const result = await get("sensor_history");
    return result;
};

export const getHistoryData = async () => {
    const result = await get("sensor_history");
    if (result.length > 0) {
        const formattedData = result.map((record) => {
            return {
                id: record.id,
                temperature: `${record.temperature}°C`,
                humidity: `${record.humidity}%`,
                light: `${record.light_intensity} lx`,
                time: new Date(record.timestamp).toLocaleString(
                    "vi-VN",
                    formatDateData
                ),
            };
        });
        return formattedData;
    } else {
        console.log("Lỗi lấy dữ liệu");
    }
};
export const getLatestData = async () => {
    const result = await get("sensor_history");
    if (result.length > 0) {
        const latestData = result.reduce((latest, record) =>
            new Date(record.timestamp) > new Date(latest.timestamp)
                ? record
                : latest
        );
        const formattedRecord = {
            id: latestData.id,
            temperature: `${latestData.temperature}°C`,
            humidity: `${latestData.humidity}%`,
            light: `${latestData.light_intensity} lx`,
            time: new Date(latestData.timestamp).toLocaleString(
                "vi-VN",
                formatDateData
            ),
        };
        return formattedRecord;
    } else {
        console.log("Lỗi lấy dữ liệu");
    }
};
