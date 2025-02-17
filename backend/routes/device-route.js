const express = require("express");
const router = express.Router();
const controller = require("../controllers/deviceController.js");
// [GET] get device by id /api/devices/:id
router.get("/:id", controller.getDevice);
// [GET] get all devices /api/devices
router.get("/", controller.getAllDevice);
// [POST] post new devices /api/devices
router.post("/", controller.addDevice);
module.exports = router;
