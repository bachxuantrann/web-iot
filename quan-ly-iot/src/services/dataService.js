import { formatDateData } from "../utils/formatData";
import { get } from "../utils/request";

export const getChartData = async () => {
    const url = "api/sensor";
    const result = await get(url);
    return result;
};

export const getHistoryData = async (
    page,
    limit,
    search = {},
    sortObj = {}
) => {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("limit", limit);

    if (sortObj.sort && sortObj.order) {
        params.append("sort", sortObj.sort);
        params.append("order", sortObj.order);
    }

    Object.keys(search).forEach((key) => {
        if (search[key]) {
            params.append(key, search[key]);
        }
    });

    const url = `api/sensor?${params.toString()}`;
    console.log("Fetching URL:", url);

    try {
        const response = await get(url);
        if (!response || !response.sensorHistory) {
            console.error("No data received");
            return { formattedData: [], pagination: {} };
        }

        const pagination = response.pagination;
        const formattedData = response.sensorHistory.map((record) => ({
            id: record.id || record._id,
            temperature: `${record.temperature}°C`,
            humidity: `${record.humidity}%`,
            light: `${record.light_intensity} lx`,
            time: record.created_at,
        }));

        return { formattedData, pagination };
    } catch (error) {
        console.error("Fetch error:", error);
        return { formattedData: [], pagination: {} };
    }
};

export const getLatestData = async () => {
    const url = "api/sensor";
    const response = await get(url);
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
