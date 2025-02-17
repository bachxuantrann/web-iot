const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
    {
        avatar: { type: String },
        name: { type: String, required: true },
        dob: { type: Date, required: true }, // Có thể sử dụng Date nếu muốn, nhưng nếu dữ liệu ban đầu là chuỗi thì giữ nguyên
        student_id: { type: String, required: true },
        github: { type: String },
        bio: { type: String },
        report: { type: String },
        apiDocs: { type: String },
        email: { type: String },
    },
    { timestamps: true }
);
const User = mongoose.model("user", UserSchema);
module.exports = User;
