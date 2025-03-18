const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Documentation",
            version: "1.0.0",
            description: "API Documentation Web IOT",
        },
        servers: [
            {
                url: `http://localhost:5555`,
                description: "Local server",
            },
        ],
    },
    apis: ["./routes/*.js"], // Quét tất cả file trong thư mục routes
};
const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
module.exports = setupSwagger;
