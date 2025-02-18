const express = require("express");
const router = express.Router();
const controller = require("../controllers/sensorHistoryController.js");
// [GET] get all sensor history /api/sensor/
router.get("/", controller.getAndFind);
router.post("/", controller.addSensorHistory);
module.exports = router;
