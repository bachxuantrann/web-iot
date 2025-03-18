const { DataTypes, DATE } = require("sequelize");
const { sequelize } = require("../config/database");
const DeviceHistory = sequelize.define(
    "DeviceHistory",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        device_id: {
            type: DataTypes.CHAR(24),
            allowNull: false,
        },
        device_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("Tắt", "Bật"),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "devicehistories",
        timestamps: false,
    }
);
module.exports = DeviceHistory;
