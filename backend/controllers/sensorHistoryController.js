const SensorHistory = require("../models/SensorHistory.js");
module.exports.addSensorHistory = async (req, res) => {
    try {
        if (
            !req.body.temperature ||
            !req.body.humidity ||
            !req.body.light_intensity
        ) {
            return res.status(400).send({
                message: "Send all data needed !",
            });
        }
        const newSensorHistory = {
            temperature: req.body.temperature,
            humidity: req.body.humidity,
            light_intensity: req.body.light_intensity,
        };
        const result = await SensorHistory.create(newSensorHistory);
        return res.status(200).json(result);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error.message });
    }
};
module.exports.getAndFind = async (req, res) => {
    try {
        let { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const skip = (page - 1) * limit;
        const allowField = ["temperature", "humidity", "light_intensity"];
        let searchCondition = {};
        allowField.forEach((field) => {
            if (req.query[field] !== undefined) {
                const value = parseFloat(req.query[field]);
                if (isNaN(value)) {
                    return res.status(400).json({
                        message: "Invalid value for searching",
                    });
                }
                searchCondition[field] = { $gte: value - 1, $lte: value + 1 };
            }
        });
        // Handle order
        let sortField = req.query.sort;
        let sortOrder = req.query.order === "asc" ? 1 : -1;
        if (sortField && !allowField.includes(sortField)) {
            return res.status(400).json({
                message: "Invalid sort field",
            });
        }
        if (!sortField) {
            sortField = "createdAt";
            sortOrder = -1;
        }
        const sensorHistory = await SensorHistory.find(searchCondition)
            .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(limit);
        const total = await SensorHistory.countDocuments(searchCondition);
        const totalPages = Math.ceil(total / limit);
        const pagination = {
            total,
            totalPages,
            currentPage: page,
        };
        res.status(200).json({
            pagination,
            sensorHistory,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error.message });
    }
};
