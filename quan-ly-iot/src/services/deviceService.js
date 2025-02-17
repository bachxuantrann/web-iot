import { formatTimestamp } from "../utils/formatData";
import { get } from "../utils/request";

export const getDeviceData = async (type) => {
    const result = await get("device_history");
    const resultFormat = result.map((item) => ({
        ...item,
        timestamp: formatTimestamp(item.timestamp),
    }));
    if (type === "thiet-bi-den-phong-khach") {
        const dataFiltered = resultFormat.filter(
            (item) => item.device_name === "Đèn phòng khách"
        );
        return dataFiltered.reverse();
    } else if (type === "thiet-bi-den-phong-ngu") {
        const dataFiltered = resultFormat.filter(
            (item) => item.device_name === "Đèn phòng ngủ"
        );
        return dataFiltered.reverse();
    } else if (type === "thiet-bi-quat") {
        const dataFiltered = resultFormat.filter(
            (item) => item.device_name === "Quạt trần"
        );
        return dataFiltered.reverse();
    }
};
export const getDevice = async () => {
    const result = await get("devices");
    return result;
};
