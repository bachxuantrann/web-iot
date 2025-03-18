const deviceHistoryRoute = require("./deviceHistory-route");
const sensorHistoryRoute = require("./sensorHistory-route");
module.exports = (app) => {
    app.use("/api/devices-history", deviceHistoryRoute);
    app.use("/api/sensor", sensorHistoryRoute);
};
