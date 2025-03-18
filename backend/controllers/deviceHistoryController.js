const DeviceHistory = require("../models/DeviceHistory.js");
const { Op } = require("sequelize");
const moment = require("moment");
module.exports.addDeviceHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, device_name } = req.body;
        const newHistoryDevice = {
            device_id: id,
            device_name: device_name,
            status: status,
        };
        // Thêm vào database MySQL
        const result = await DeviceHistory.create(newHistoryDevice);
        const responseData = result.toJSON();
        responseData.created_at = moment(responseData.created_at).format(
            "YYYY-MM-DD HH:mm:ss"
        );
        return res.status(201).json({
            message: "Thêm lịch sử thiết bị thành công!",
            data: responseData,
        });
    } catch (error) {
        console.error("Lỗi khi thêm lịch sử thiết bị:", error.message);
        return res
            .status(500)
            .json({ message: "Lỗi server!", error: error.message });
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
            datetime = decodeURIComponent(datetime);
            console.log(datetime);
            const originaDatetime = moment(datetime).format(
                "YYYY-MM-DD HH:mm:ss"
            );
            const targetDate = new Date(originaDatetime);
            if (isNaN(targetDate.getTime())) {
                return res.status(400).json({
                    message: "Thời gian tìm kiếm không hợp lệ",
                });
            }
            const startOfMinute = new Date(targetDate);
            startOfMinute.setSeconds(0, 0);
            const endOfMinute = new Date(targetDate);
            endOfMinute.setSeconds(59, 999);

            searchCondition.created_at = {
                [Op.gte]: startOfMinute,
                [Op.lte]: endOfMinute,
            };
        }

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
