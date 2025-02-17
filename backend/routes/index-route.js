const deviceRoute = require("./device-route");
const deviceHistoryRoute = require("./deviceHistory-route");
module.exports = (app) => {
    app.use("/api/devices", deviceRoute);
    app.use("/api/history", deviceHistoryRoute);
};
