const express = require("express");
const router = express.Router();
const controller = require("../controllers/deviceHistoryController.js");
// [GET] get all devices history /api/history
router.get("/", controller.getAll);
// [POST] add new history data of device
router.post("/devices/:id", controller.addDeviceHistory);
module.exports = router;
