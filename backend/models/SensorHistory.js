const mongoose = require("mongoose");

const SensorHistorySchema = new mongoose.Schema(
    {
        temperature: { type: Number, required: true },
        humidity: { type: Number, required: true },
        light_intensity: { type: Number, required: true },
        createdAt: {
            type: Date,
            default: () => new Date(Date.now() + 7 * 60 * 60 * 1000),
        },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

module.exports = mongoose.model("SensorHistory", SensorHistorySchema);
