const SensorHistory = require("../models/SensorHistory.js");
const { Op } = require("sequelize");
const moment = require("moment");
const { sequelize } = require("../config/database.js");
module.exports.addSensorHistory = async (req, res) => {
    try {
        const { temperature, humidity, light_intensity } = req.body;
        if (!temperature || !humidity || !light_intensity) {
            return res.status(400).json({ message: "Send all data needed!" });
        }
        const newSensorHistory = await SensorHistory.create({
            temperature,
            humidity,
            light_intensity,
        });
        const responseData = newSensorHistory.toJSON();
        responseData.created_at = moment(responseData.created_at).format(
            "YYYY-MM-DD HH:mm:ss"
        );
        return res.status(200).json(responseData);
    } catch (error) {
        console.error("Error:", error.message);
        return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
};
module.exports.getAndFind = async (req, res) => {
    try {
        let { page, limit, sort, order } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const offset = (page - 1) * limit;
        const allowField = [
            "temperature",
            "humidity",
            "light_intensity",
            "created_at",
        ];
        let searchCondition = {};
        allowField.forEach((field) => {
            if (req.query[field] !== undefined) {
                const value = parseFloat(req.query[field]);
                if (isNaN(value)) {
                    return res.status(400).json({
                        message: "Giá trị không hợp lệ",
                    });
                }
                searchCondition[field] = {
                    [Op.gte]: value - 1,
                    [Op.lte]: value + 1,
                };
            }
        });
        // Xử lý sắp xếp
        let sortField = sort && allowField.includes(sort) ? sort : "created_at";
        let sortOrder = order === "asc" ? "ASC" : "DESC";
        // Tìm kiếm và đếm tổng số bản ghi
        const { rows: sensorHistoryWithTimezone, count: total } =
            await SensorHistory.findAndCountAll({
                where: searchCondition,
                order: [[sortField, sortOrder]],
                limit,
                offset,
            });
        const totalPages = Math.ceil(total / limit);
        const pagination = {
            total,
            totalPages,
            currentPage: page,
        };
        const sensorHistory = sensorHistoryWithTimezone.map((record) => ({
            ...record.get(),
            created_at: moment(record.created_at)
                .tz("Asia/Ho_Chi_Minh")
                .format("YYYY-MM-DD HH:mm:ss"),
        }));
        res.status(200).json({
            pagination,
            sensorHistory,
        });
    } catch (error) {
        console.error("Error:", error.message);
        return res
            .status(500)
            .json({ message: "Lỗi sever", error: error.message });
    }
};
