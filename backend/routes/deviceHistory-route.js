const express = require("express");
const controller = require("../controllers/deviceHistoryController.js");

module.exports = (mqttClient) => {
    const router = express.Router();

    router.get("/", controller.getAndFind);
    router.get("/latest", controller.getLatestDeviceStatus);
    router.post("/:id", (req, res) => controller.addDeviceHistory(req, res, mqttClient));

    return router;
};
