import { formatDateData } from "../utils/formatData";
import { get } from "../utils/request";

export const getDeviceHistory = async (page, limit, datetime = "") => {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("limit", limit);
    if (datetime) {
        params.append("datetime", datetime);
    }

    const url = `api/devices-history?${params.toString()}`; // Sửa lỗi `params.toString`
    console.log("Fetching URL:", url);

    try {
        const response = await get(url);
        if (!response || !response.devicesHistory) {
            console.log("No data devices history found");
            return { formattedData: [], pagination: {} };
        }

        const pagination = response.pagination;
        const formattedData = response.devicesHistory.map((record) => ({
            id: record.id || record._id,
            device_id: record.device_id,
            device_name: record.device_name,
            status: record.status === "on" ? "Bật" : "Tắt",
            createdAt: new Date(record.createdAt).toLocaleString(
                "vi-VN",
                formatDateData
            ),
        }));

        return { formattedData, pagination };
    } catch (error) {
        console.error("Fetch error:", error);
        return { formattedData: [], pagination: {} };
    }
};
