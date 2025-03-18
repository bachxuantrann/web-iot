const express = require("express");
const router = express.Router();
const controller = require("../controllers/deviceHistoryController.js");

router.get("/", controller.getAndFind);

router.get("/latest", controller.getLatestDeviceStatus);

router.post("/:id", controller.addDeviceHistory);

module.exports = router;
