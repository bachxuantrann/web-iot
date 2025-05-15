const express = require("express");
const mqtt = require("mqtt");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const socketIo = require("socket.io");
dotenv.config();
const port = process.env.PORT;
const app = express();
const setupSwagger = require("./swagger.js");
const sensorCtrl = require("./controllers/sensorHistoryController.js")
const { connect } = require("./config/database.js");
connect();
const server = http.createServer(app);
const io =  socketIo(server, { cors: { origin: "*" } });
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
// config mqtt
app.use(express.json());
const mqttClient = mqtt.connect("mqtt://172.20.10.6:2020", {
    username: "bach",
    password: "123",
});
// Khi kết nối thành công, subscribe topic sensor/data
mqttClient.on("connect", () => {
    console.log("✅ MQTT connected");
    mqttClient.subscribe("sensor/data", err => { if (err) console.error(err); });
});
// Khi nhận message sensor/data, parse và lưu record
mqttClient.on("message", async (topic, message) => {
    if (topic !== "sensor/data") return;
    try {
      const payload = JSON.parse(message.toString());
      // 1) lưu vào DB
      const rec = await sensorCtrl.createRecord(payload);
      console.log("Sensor record saved:", rec);
      // 2) phát realtime xuống FE
      io.emit("sensorData", rec);
    } catch (e) {
      console.error("MQTT sensor/data handler error:", e);
    }
  });

  server.listen(port, () => console.log(`Server is running on port ${port}`));
const routes = require("./routes/index-route.js");
routes(app,mqttClient);
setupSwagger(app);
