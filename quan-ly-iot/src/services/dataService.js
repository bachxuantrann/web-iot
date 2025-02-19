import { formatDateData } from "../utils/formatData";
import { get } from "../utils/request";

export const getChartData = async () => {
    const result = await get("api/sensor");
    return result;
};

export const getHistoryData = async () => {
    const response = await get("api/sensor");
    const result = response.sensorHistory;
    if (result && result.length > 0) {
        const formattedData = result.map((record) => {
            return {
                // Sử dụng record.id nếu có, nếu không dùng record._id
                id: record.id || record._id,
                temperature: `${record.temperature}°C`,
                humidity: `${record.humidity}%`,
                light: `${record.light_intensity} lx`,
                // Dùng record.createdAt thay cho record.timestamp
                time: new Date(record.createdAt).toLocaleString(
                    "vi-VN",
                    formatDateData
                ),
            };
        });
        return formattedData;
    } else {
        console.log("Lỗi lấy dữ liệu");
        return [];
    }
};

export const getLatestData = async () => {
    const response = await get("api/sensor");
    const result = response.sensorHistory;
    if (result && result.length > 0) {
        // So sánh dựa trên createdAt thay cho timestamp
        const latestData = result.reduce((latest, record) =>
            new Date(record.createdAt) > new Date(latest.createdAt)
                ? record
                : latest
        );
        const formattedRecord = {
            id: latestData.id || latestData._id,
            temperature: `${latestData.temperature}°C`,
            humidity: `${latestData.humidity}%`,
            light: `${latestData.light_intensity} lx`,
            time: new Date(latestData.createdAt).toLocaleString(
                "vi-VN",
                formatDateData
            ),
        };
        return formattedRecord;
    } else {
        console.log("Lỗi lấy dữ liệu");
        return null;
    }
};
