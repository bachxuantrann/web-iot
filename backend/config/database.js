const Sequelize = require("sequelize");
const database = process.env.DB_NAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const dbHost = process.env.DB_HOST;
const sequelize = new Sequelize(database, user, password, {
    host: dbHost,
    dialect: "mysql",
    timezone: "+07:00",
});

const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully!");
    } catch (err) {
        console.error("Error connecting to the database:", err.message);
    }
};

module.exports = { sequelize, connect };
