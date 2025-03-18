const express = require("express");
const router = express.Router();
const controller = require("../controllers/sensorHistoryController.js");

/**
 * @swagger
 * /sensor:
 *   get:
 *     summary: Lấy danh sách lịch sử cảm biến có điều kiện
 *     tags: [Get and Find Sensor History]
 *     description: |
 *       API hỗ trợ tìm kiếm lịch sử cảm biến theo **một trong ba** trường `temperature`, `humidity` hoặc `light_intensity` chỉ trọn 1 trường 1 lần tìm kiếm.
 *       Hỗ trợ sắp xếp, phân trang.
 *     parameters:
 *       - in: query
 *         name: temperature
 *         schema:
 *           type: number
 *           example: 26.9
 *         description: "Tìm kiếm theo nhiệt độ (°C) - Giá trị nằm trong khoảng ±1°C"
 *       - in: query
 *         name: humidity
 *         schema:
 *           type: number
 *           example: 60.2
 *         description: "Tìm kiếm theo độ ẩm (%) - Giá trị nằm trong khoảng ±1%"
 *       - in: query
 *         name: light_intensity
 *         schema:
 *           type: integer
 *           example: 800
 *         description: "Tìm kiếm theo cường độ ánh sáng (Lux) - Giá trị nằm trong khoảng ±1 Lux"
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [temperature, humidity, light_intensity, created_at]
 *           example: created_at
 *         description: "Trường cần sắp xếp (Mặc định: `created_at`)"
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           example: desc
 *         description: "Sắp xếp theo thứ tự tăng (`asc`) hoặc giảm (`desc`) (Mặc định: `desc`)"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: "Trang hiện tại (Mặc định: 1)"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 5
 *         description: "Số lượng bản ghi mỗi trang (Mặc định: 10)"
 *     responses:
 *       200:
 *         description: Trả về danh sách lịch sử cảm biến kèm theo phân trang
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 20
 *                     totalPages:
 *                       type: integer
 *                       example: 4
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                 sensorHistory:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/SensorHistory"
 *       400:
 *         description: Lỗi do giá trị không hợp lệ hoặc thiếu tham số bắt buộc
 *       500:
 *         description: Lỗi server
 */

router.get("/", controller.getAndFind);

/**
 * @swagger
 * /sensor:
 *   post:
 *     summary: Ghi nhận dữ liệu cảm biến mới
 *     tags: [Add new Sensor History]
 *     description: API để lưu trữ lịch sử đo từ cảm biến.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               temperature:
 *                 type: number
 *                 format: float
 *                 description: Nhiệt độ đo được từ cảm biến (°C).
 *                 example: 25.5
 *               humidity:
 *                 type: number
 *                 format: float
 *                 description: Độ ẩm đo được từ cảm biến (%).
 *                 example: 60.2
 *               light_intensity:
 *                 type: integer
 *                 description: Cường độ ánh sáng đo được (Lux).
 *                 example: 800
 *     responses:
 *       200:
 *         description: Lưu trữ dữ liệu cảm biến thành công.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/SensorHistory"
 *       400:
 *         description: Thiếu dữ liệu cần thiết.
 *       500:
 *         description: Lỗi server khi lưu trữ dữ liệu.
 */

router.post("/", controller.addSensorHistory);
module.exports = router;
