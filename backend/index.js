const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const database = require("./config/database.js");
const app = express();
app.use(express.json());
database.connect(app);
const routes = require("./routes/index-route.js");
routes(app);
