const DeviceHistory = require("../models/DeviceHistory.js");
const Device = require("../models/Device.js");

module.exports.addDeviceHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const device = await Device.findById(id);
        const newHistoryDevice = {
            device_id: id,
            device_name: device.name,
            status: status,
        };
        const result = await DeviceHistory.create(newHistoryDevice);
        return res.status(200).json(result);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error.message });
    }
};
module.exports.getDeviceHistory = async (req, res) => {
    try {
        const { id } = req.params;
        let { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const skip = (page - 1) * limit;
        const deviceHistory = await DeviceHistory.find({ device_id: id })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        const total = await DeviceHistory.countDocuments({ device_id: id });
        const totalPages = Math.ceil(total / limit);
        const pagination = {
            total,
            totalPages,
            currentPage: page,
        };
        return res.status(200).json({
            pagination,
            deviceHistory,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error.message });
    }
};
module.exports.getAndFind = async (req, res) => {
    try {
        let { datetime, page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const skip = (page - 1) * limit;
        let searchCondition = {};
        if (datetime) {
            const targetDate = new Date(datetime);
            if (isNaN(targetDate.getTime())) {
                return res.status(400).json({
                    message: "Thời gian tìm kiếm không hợp lệ",
                });
            }
            const startOfMinute = new Date(targetDate);
            startOfMinute.setSeconds(0, 0);
            const endOfMinute = new Date(targetDate);
            endOfMinute.setSeconds(59, 999);
            searchCondition = {
                createdAt: { $gte: startOfMinute, $lte: endOfMinute },
            };
        }
        const devicesHistory = await DeviceHistory.find(searchCondition)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await DeviceHistory.countDocuments(searchCondition);
        const totalPages = Math.ceil(total / limit);
        const pagination = {
            total,
            totalPages,
            currentPage: page,
        };

        return res.status(200).json({
            pagination,
            devicesHistory,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error.message });
    }
};
