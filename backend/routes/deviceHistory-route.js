const express = require("express");
const router = express.Router();
const controller = require("../controllers/deviceHistoryController.js");
// [GET] get all devices history /api/history and find device history by time
router.get("/", controller.getAndFind);
// [GET] get devices history of devices
router.get("/:id", controller.getDeviceHistory);
// [POST] add new history data of device
router.post("/:id", controller.addDeviceHistory);
module.exports = router;
