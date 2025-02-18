const mongoose = require("mongoose");

const DeviceHistorySchema = new mongoose.Schema(
    {
        device_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Device", // Giả sử model Device được đăng ký với tên "Device"
            required: true,
        },
        device_name: { type: String, required: true },
        status: { type: String, required: true },
        createdAt: {
            type: Date,
            default: () => new Date(Date.now() + 7 * 60 * 60 * 1000),
        },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

module.exports = mongoose.model("DeviceHistory", DeviceHistorySchema);
