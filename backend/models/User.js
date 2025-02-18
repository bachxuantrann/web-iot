const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        avatar: { type: String },
        name: { type: String, required: true },
        dob: { type: Date, required: true }, // Ngày sinh được lưu dưới dạng Date
        student_id: { type: String, required: true },
        github: { type: String },
        bio: { type: String },
        report: { type: String },
        apiDocs: { type: String },
        email: { type: String },
        createdAt: {
            type: Date,
            default: () => new Date(Date.now() + 7 * 60 * 60 * 1000),
        }, // UTC+7
        updatedAt: {
            type: Date,
            default: () => new Date(Date.now() + 7 * 60 * 60 * 1000),
        }, // UTC+7
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
