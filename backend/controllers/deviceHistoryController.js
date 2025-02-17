const DeviceHistory = require("../models/DeviceHistory.js");
const Device = require("../models/Device.js");
module.exports.getAll = async (req, res) => {
    try {
        const devicesHistory = await DeviceHistory.find({});
        return res.status(200).send(devicesHistory);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error.message });
    }
};
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
