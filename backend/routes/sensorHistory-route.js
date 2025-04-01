const express = require("express");
const router = express.Router();
const controller = require("../controllers/sensorHistoryController.js");

/**
 * @swagger
 * /sensor:
 *   get:
 *     summary: Lấy danh sách lịch sử cảm biến và tìm kiếm dữ liệu
 *     tags: [Get and Find and Sort and Pagination Sensor History]
 *     description: |
 *       Lấy dữ liệu lịch sử cảm biến (nhiệt độ, độ ẩm, cường độ ánh sáng) với các tùy chọn:
 *       - Phân trang: `page` (số trang) và `limit` (số bản ghi trên mỗi trang).
 *       - Sắp xếp: `sort` (trường sắp xếp, mặc định là `created_at`) và `order` (thứ tự sắp xếp, `asc` hoặc `desc`).
 *       - Tìm kiếm: sử dụng cặp `searchField` và `searchValue` để lọc dữ liệu theo trường (ví dụ: tìm kiếm theo `humidity` với giá trị xung quanh ±0.001).
 *
 *       **Ví dụ yêu cầu đầy đủ:**
 *       ```
 *       http://localhost:5555/api/sensor?searchField=humidity&searchValue=60.2&sort=light_intensity&order=asc&page=2&limit=1
 *       ```
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 2
 *         description: Số trang cần lấy (bắt đầu từ 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Số bản ghi trên mỗi trang
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [ "temperature", "humidity", "light_intensity", "created_at" ]
 *           example: "light_intensity"
 *         description: Trường để sắp xếp (mặc định là `created_at`)
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [ "asc", "desc" ]
 *           example: "asc"
 *         description: Thứ tự sắp xếp (tăng dần hoặc giảm dần)
 *       - in: query
 *         name: searchField
 *         schema:
 *           type: string
 *           enum: [ "temperature", "humidity", "light_intensity" ]
 *           example: "humidity"
 *         description: Tên trường cần tìm kiếm
 *       - in: query
 *         name: searchValue
 *         schema:
 *           type: number
 *           format: float
 *           example: 60.2
 *         description: Giá trị tìm kiếm cho trường `searchField`
 *     responses:
 *       200:
 *         description: Danh sách lịch sử cảm biến với phân trang và dữ liệu tìm kiếm
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
 *                       description: Tổng số bản ghi
 *                     totalPages:
 *                       type: integer
 *                       example: 10
 *                       description: Tổng số trang
 *                     currentPage:
 *                       type: integer
 *                       example: 2
 *                       description: Trang hiện tại
 *                 sensorHistory:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/SensorHistory'
 *       400:
 *         description: "Lỗi dữ liệu đầu vào không hợp lệ (ví dụ: giá trị tìm kiếm không hợp lệ)"
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
