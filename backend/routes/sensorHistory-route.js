const express = require("express");
const router = express.Router();
const controller = require("../controllers/sensorHistoryController.js");

router.get("/", controller.getAndFind);

router.post("/", controller.addSensorHistory);
module.exports = router;
