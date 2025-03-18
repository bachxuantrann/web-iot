const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
const app = express();
const setupSwagger = require("./swagger.js");
const { connect } = require("./config/database.js");
connect();
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(express.json());

app.listen(port, () => console.log(`Server is running on port ${port}`));
const routes = require("./routes/index-route.js");
routes(app);
setupSwagger(app);
