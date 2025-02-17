const mongoose = require("mongoose");
const SensorHistorySchema = new mongoose.Schema(
    {
        temperature: { type: Number, required: true },
        humidity: { type: Number, required: true },
        light_intensity: { type: Number, required: true },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);
const SensorHistory = mongoose.model("sensorHistory", SensorHistorySchema);

module.exports = SensorHistory;
