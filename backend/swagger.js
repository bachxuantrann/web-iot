const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "IOT Project API",
            version: "1.0.0",
            description: "API documentation for IoT project",
        },
        servers: [
            {
                url: "http://localhost:5555/api",
                description: "Local server",
            },
        ],
        components: {
            schemas: {
                DeviceHistory: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            format: "uuid",
                            description: "ID duy nhất của lịch sử thiết bị",
                            example: "550e8400-e29b-41d4-a716-446655440000",
                        },
                        device_id: {
                            type: "string",
                            description: "ID của thiết bị",
                            example: "led1",
                        },
                        device_name: {
                            type: "string",
                            description: "Tên của thiết bị",
                            example: "Đèn Led 1",
                        },
                        status: {
                            type: "string",
                            enum: ["Tắt", "Bật"],
                            description: "Trạng thái thiết bị (Bật hoặc Tắt)",
                            example: "Bật",
                        },
                        created_at: {
                            type: "string",
                            format: "date-time",
                            description:
                                "Thời gian thiết bị thay đổi trạng thái",
                            example: "2025-03-18T17:12:43Z",
                        },
                    },
                },
                SensorHistory: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            format: "uuid",
                            description: "ID duy nhất của lịch sử cảm biến",
                            example: "550e8400-e29b-41d4-a716-446655440000",
                        },
                        temperature: {
                            type: "number",
                            format: "float",
                            description: "Nhiệt độ đo được từ cảm biến (°C)",
                            example: 25.5,
                        },
                        humidity: {
                            type: "number",
                            format: "float",
                            description: "Độ ẩm đo được từ cảm biến (%)",
                            example: 60.2,
                        },
                        light_intensity: {
                            type: "integer",
                            description: "Cường độ ánh sáng đo được (Lux)",
                            example: 800,
                        },
                        created_at: {
                            type: "string",
                            format: "date-time",
                            description: "Thời gian ghi nhận dữ liệu",
                            example: "2025-03-18T21:11:44Z",
                        },
                    },
                },
            },
        },
    },
    apis: ["./routes/*.js"], // Load API từ các file route
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("📄 Swagger docs available at /api-docs");
};

module.exports = setupSwagger;
