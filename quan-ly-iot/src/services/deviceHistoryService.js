import { get, post } from "../utils/request";

export const getDeviceHistory = async (page, limit, datetime = "") => {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("limit", limit);
    if (datetime) {
        params.append("datetime", encodeURIComponent(datetime));
    }

    const url = `api/devices-history?${params.toString()}`;
    console.log("Fetching URL:", url);

    try {
        const response = await get(url);
        if (!response || !response.devicesHistory) {
            console.log("No data devices history found");
            return { formattedData: [], pagination: {} };
        }
        console.log(response.devicesHistory);
        const pagination = response.pagination;
        const formattedData = response.devicesHistory.map((record) => ({
            id: record.id || record._id,
            device_id: record.device_id,
            device_name: record.device_name,
            status: record.status === "Bật" ? "Bật" : "Tắt",
            createdAt: record.created_at,
        }));

        return { formattedData, pagination };
    } catch (error) {
        console.error("Fetch error:", error);
        return { formattedData: [], pagination: {} };
    }
};
export const postDeviceHistory = async (id, name, status) => {
    const url = `api/devices-history/${id}`;
    let updateStatus = status === "Bật" ? "Tắt" : "Bật";
    const data = {
        status: updateStatus,
        device_name: name,
    };
    try {
        const response = await post(url, data);
        if (response && response.message) {
            console.log(``, response.message);
            return response.message;
        }
    } catch (error) {
        console.log("Update status device error:", error);
        return "";
    }
};
export const getLatestDeviceStatus = async () => {
    try {
        const url = `api/devices-history/latest`;
        const response = await get(url);
        if (response) {
            return response;
        }
    } catch (error) {
        console.log("Lỗi lấy trạng thái", error);
        return "";
    }
};
