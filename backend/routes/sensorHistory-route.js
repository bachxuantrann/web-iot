const express = require("express");
const router = express.Router();
const controller = require("../controllers/sensorHistoryController.js");

/**
 * @swagger
 * /sensor:
 *   get:
 *     summary: Lấy danh sách lịch sử cảm biến với tìm kiếm và phân trang
 *     tags: [Get and Find Sensor History]
 *     description: >
 *       API này trả về danh sách lịch sử cảm biến với các trường thông tin như nhiệt độ, độ ẩm, cường độ ánh sáng, và thời gian ghi nhận.
 *       Nếu cung cấp các tham số tìm kiếm, API sẽ áp dụng bộ lọc:
 *       - Nếu searchField là "created_at", searchValue phải có định dạng ISO 8601 (ví dụ: "2025-03-17T12:00:29").
 *         API sẽ so sánh chính xác các bản ghi có created_at nằm trong khoảng từ đầu giây đến cuối giây của giá trị được cung cấp.
 *       - Với các trường số khác (temperature, humidity, light_intensity), API so sánh giá trị trong khoảng ±0.001.
 *
 *     parameters:
 *       - in: query
 *         name: searchField
 *         schema:
 *           type: string
 *           enum: [ "temperature", "humidity", "light_intensity", "created_at" ]
 *           example: "created_at"
 *         description: Tên trường cần tìm kiếm.
 *       - in: query
 *         name: searchValue
 *         schema:
 *           type: string
 *           example: "2025-03-17T12:00:29"
 *         description: "Giá trị tìm kiếm cho trường được chỉ định. (Với created_at: định dạng ISO 8601)"
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [ "temperature", "humidity", "light_intensity", "created_at" ]
 *           example: "humidity"
 *         description: Trường sắp xếp. Nếu không có, mặc định là "created_at".
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ "asc", "desc" ]
 *           example: "asc"
 *         description: Thứ tự sắp xếp ("asc" cho tăng dần, "desc" cho giảm dần). Mặc định là "desc" nếu không có.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Số trang cần lấy (bắt đầu từ 1).
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Số bản ghi trên mỗi trang.
 *     responses:
 *       200:
 *         description: Trả về danh sách lịch sử cảm biến với thông tin phân trang.
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
 *                       example: 100
 *                     totalPages:
 *                       type: integer
 *                       example: 10
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                 sensorHistory:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/SensorHistory'
 *       400:
 *         description: Tham số tìm kiếm không hợp lệ.
 *       500:
 *         description: Lỗi server.
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
