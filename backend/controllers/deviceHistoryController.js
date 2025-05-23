const DeviceHistory = require("../models/DeviceHistory.js");
const { Op, fn, col, where } = require("sequelize");
const moment = require("moment");

const createRecord = async ({ device_id, device_name, status }) => {
    const rec = await DeviceHistory.create({ device_id, device_name, status: status ? "Bật" : "Tắt" });
    const out = rec.toJSON();
    out.created_at = moment(out.created_at).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss");
    return out;
};
module.exports.addDeviceHistory = async (req, res,mqttClient) => {
    try {
        const { id } = req.params;
        const { status, device_name } = req.body;
        if (!['led1', 'led2', 'led3'].includes(id)) {
            return res.status(400).json({ message: "Invalid device id" });
        }
        if (typeof status !== 'boolean') {
            return res.status(400).json({ message: "Status must be a boolean (true/false)" });
        }
        const topic = "device/all";
        const payload = {};
        payload[id]=status;
        mqttClient.publish(topic, JSON.stringify(payload), { qos: 1 }, async (err) => {
            if (err) {
                console.error("MQTT publish error:", err);
                return res.status(500).json({ message: "Failed to send MQTT message", error: err.message });
            }

            // (Optional) Ghi lại lịch sử điều khiển nếu cần:
            await createRecord({
                device_id: id,
                device_name,
                status
            });
            return res.status(200).json({
                message: "MQTT message sent successfully",
                data: { id, status }
            });
        });
        
        
    } catch (error) {
        console.error("Lỗi khi thêm lịch sử thiết bị:", error.message);
        return res.status(500).json({ message: "Lỗi server!", error: error.message });
    }
};

module.exports.getAndFind = async (req, res) => {
    try {
        let { page, limit, datetime } = req.query;
        console.log("datetime: " + datetime);
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const offset = (page - 1) * limit;
        let searchCondition = {};
        if (datetime) {
            // Giải mã và kiểm tra định dạng ISO 8601
            datetime = decodeURIComponent(datetime);
            if (!moment(datetime, moment.ISO_8601, true).isValid()) {
                return res.status(400).json({
                    message: "Thời gian tìm kiếm không hợp lệ",
                });
            }
            // Chuyển giá trị datetime sang chuỗi định dạng "YYYY-MM-DD HH:mm:ss"
            const startOfSecond = moment(datetime).startOf("second").toDate();
            const endOfSecond = moment(datetime).endOf("second").toDate();
            searchCondition.created_at = {
                [Op.between]: [startOfSecond, endOfSecond],
            };
        }
        // Lấy ra các bản ghi thoả mãn
        // SELECT *
        // FROM DeviceHistory
        // WHERE created_at >= '2024-03-17 10:30:00'  -- Giây = 00, Millisecond = 000
        // AND created_at <= '2024-03-17 10:30:59'  -- Giây = 59, Millisecond = 999
        // ORDER BY created_at DESC
        // LIMIT 10 OFFSET 0;  -- Nếu page=1, limit=10
        // Đếm tổng bản ghi thoả mãn
        // SELECT COUNT(*) AS total
        // FROM DeviceHistory
        // WHERE created_at BETWEEN '2025-03-18 10:00:00' AND '2025-03-18 10:00:59';

        const { rows: devicesHistoryWithTimezone, count: total } =
            await DeviceHistory.findAndCountAll({
                where: searchCondition,
                order: [["created_at", "DESC"]],
                limit,
                offset,
            });
        const devicesHistory = devicesHistoryWithTimezone.map((record) => ({
            ...record.get(),
            created_at: moment(record.created_at)
                .tz("Asia/Ho_Chi_Minh")
                .format("YYYY-MM-DD HH:mm:ss"),
        }));
        const totalPages = Math.ceil(total / limit);
        return res.status(200).json({
            pagination: {
                total,
                totalPages,
                currentPage: page,
            },
            devicesHistory,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error.message });
    }
};
module.exports.getLatestDeviceStatus = async (req, res) => {
    try {
        const devices = ["led1", "led2", "led3"];
        // SELECT device_id, device_name, status, created_at
        // FROM DeviceHistory
        // WHERE device_id = 'led1'
        // ORDER BY created_at DESC
        // LIMIT 1;

        const latestStatuses = await Promise.all(
            devices.map(async (deviceId) => {
                const latestRecord = await DeviceHistory.findOne({
                    where: { device_id: deviceId },
                    order: [["created_at", "DESC"]], // Lấy bản ghi mới nhất
                });

                return latestRecord
                    ? {
                          device_id: latestRecord.device_id,
                          device_name: latestRecord.device_name,
                          status: latestRecord.status,
                          created_at: latestRecord.created_at,
                      }
                    : { device_id: deviceId, status: "Không có dữ liệu" };
            })
        );
        res.status(200).json({
            message: "Lấy trạng thái thành công!",
            devices: latestStatuses,
        });
    } catch (error) {
        console.error("Lỗi khi lấy trạng thái thiết bị:", error.message);
        res.status(500).json({ message: "Lỗi server!", error: error.message });
    }
};

// SQL query
// SELECT COUNT(*) AS total
// FROM devicehistories
// WHERE created_at BETWEEN '2025-03-16 14:31:00' AND '2025-03-16 14:31:59';

// SELECT *
// FROM devicehistories
// WHERE created_at BETWEEN '2025-03-16 14:31:00' AND '2025-03-16 14:31:59'
// ORDER BY created_at DESC
// LIMIT 10 OFFSET 20;
// Develope more
// module.exports.getDeviceHistory = async (req, res) => {
//     try {
//         const { id } = req.params;
//         let { page, limit } = req.query;
//         page = parseInt(page) || 1;
//         limit = parseInt(limit) || 10;
//         const skip = (page - 1) * limit;
//         const deviceHistory = await DeviceHistory.find({ device_id: id })
//             .sort({ createdAt: -1 })
//             .skip(skip)
//             .limit(limit);
//         const total = await DeviceHistory.countDocuments({ device_id: id });
//         const totalPages = Math.ceil(total / limit);
//         const pagination = {
//             total,
//             totalPages,
//             currentPage: page,
//         };
//         return res.status(200).json({
//             pagination,
//             deviceHistory,
//         });
//     } catch (error) {
//         console.error(error.message);
//         return res.status(500).json({ message: error.message });
//     }
// };
