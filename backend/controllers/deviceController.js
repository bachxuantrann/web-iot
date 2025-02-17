const Device = require("../models/Device.js");
module.exports.getDevice = async (req, res) => {
    try {
        const { id } = req.params;
        const device = await Device.findById(id);
        return res.status(200).json(device);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: error.message,
        });
    }
};
module.exports.getAllDevice = async (req, res) => {
    try {
        const devices = await Device.find({});
        return res.status(200).json(devices);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: error.message,
        });
    }
};
module.exports.addDevice = async (req, res) => {
    try {
        if (
            !req.body.name ||
            !req.body.type ||
            !req.body.status ||
            !req.body.location
        ) {
            return res.status(400).send({
                message: "Send all data needed to create a new device",
            });
        }
        const newDevice = {
            name: req.body.name,
            type: req.body.type,
            status: req.body.status,
            location: req.body.location,
        };
        const device = await Device.create(newDevice);
        return res.status(200).json(device);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: error.message,
        });
    }
};
