const express = require("express");
const router = express.Router();
const controller = require("../controllers/deviceHistoryController.js");

/**
 * @swagger
 * /devices-history:
 *   get:
 *     summary: Lấy danh sách lịch sử thiết bị
 *     tags: [Get and Find Device History]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Số trang của dữ liệu
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Số lượng bản ghi trên mỗi trang
 *       - in: query
 *         name: datetime
 *         schema:
 *           type: string
 *           format: date-time
 *           example: "2025-03-18T17:12:43"
 *         description: Lọc dữ liệu theo thời gian (định dạng `YYYY-MM-DDTHH:mm:ss`)
 *     responses:
 *       200:
 *         description: Trả về danh sách lịch sử thiết bị có phân trang
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
 *                 devicesHistory:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/DeviceHistory'
 *       400:
 *         description: Thời gian tìm kiếm không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Thời gian tìm kiếm không hợp lệ"
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */

router.get("/", controller.getAndFind);

/**
 * @swagger
 * /devices-history/latest:
 *   get:
 *     summary: Lấy trạng thái mới nhất của các thiết bị
 *     tags: [Get Latetes History of Devices]
 *     description: API trả về trạng thái mới nhất của danh sách thiết bị cố định (led1, led2, led3).
 *     responses:
 *       200:
 *         description: Trả về trạng thái mới nhất của các thiết bị.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lấy trạng thái thành công!"
 *                 devices:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       device_id:
 *                         type: string
 *                         example: "led1"
 *                       device_name:
 *                         type: string
 *                         example: "Đèn Led 1"
 *                       status:
 *                         type: string
 *                         enum: ["Tắt", "Bật", "Không có dữ liệu"]
 *                         example: "Bật"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-03-18T17:12:43Z"
 *       500:
 *         description: Lỗi server khi truy xuất dữ liệu
 */

router.get("/latest", controller.getLatestDeviceStatus);

/**
 * @swagger
 * /devices-history/{id}:
 *   post:
 *     summary: Thêm lịch sử thay đổi trạng thái của thiết bị
 *     tags: [Add new History of Device]
 *     description: API thêm trạng thái mới của thiết bị vào lịch sử.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của thiết bị (device_id).
 *         example: "led1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               device_name:
 *                 type: string
 *                 description: Tên của thiết bị.
 *                 example: "Đèn Led 1"
 *               status:
 *                 type: string
 *                 enum: ["Tắt", "Bật"]
 *                 description: Trạng thái của thiết bị.
 *                 example: "Bật"
 *     responses:
 *       201:
 *         description: Lịch sử thiết bị được thêm thành công.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Thêm lịch sử thiết bị thành công!"
 *                 data:
 *                   $ref: "#/components/schemas/DeviceHistory"
 *       400:
 *         description: Dữ liệu đầu vào không hợp lệ.
 *       500:
 *         description: Lỗi server khi thêm dữ liệu.
 */

router.post("/:id", controller.addDeviceHistory);

module.exports = router;
