const deviceHistoryRoute = require("./deviceHistory-route");
const sensorHistoryRoute = require("./sensorHistory-route");
module.exports = (app,mqttClient) => {
    app.use("/api/devices-history", deviceHistoryRoute(mqttClient));
    app.use("/api/sensor", sensorHistoryRoute);
};
