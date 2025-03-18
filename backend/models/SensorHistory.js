const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const SensorHistory = sequelize.define(
    "SensorHistory",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        temperature: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        humidity: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        light_intensity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "sensorhistories",
        timestamps: false,
    }
);

module.exports = SensorHistory;
