const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const database = require("./config/database.js");
const app = express();
app.use(
    cors({
        origin: "*", // Chấp nhận tất cả các domain
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Chấp nhận tất cả phương thức
        allowedHeaders: ["Content-Type", "Authorization"], // Cho phép các header này
    })
);
app.use(express.json());
database.connect(app);
const routes = require("./routes/index-route.js");
routes(app);
