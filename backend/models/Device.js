const mongoose = require("mongoose");

const DeviceSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        type: { type: String, required: true },
        status: { type: String, required: true },
        location: { type: String, required: true },
        createdAt: {
            type: Date,
            default: () => new Date(Date.now() + 7 * 60 * 60 * 1000),
        }, // Lưu theo UTC+7
        updatedAt: {
            type: Date,
            default: () => new Date(Date.now() + 7 * 60 * 60 * 1000),
        }, // Lưu theo UTC+7
    },
    { timestamps: true }
);

module.exports = mongoose.model("Device", DeviceSchema);
