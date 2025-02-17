const mongoose = require("mongoose");
const { PORT } = require("./system.js");
const mongoDBURL =
    "mongodb+srv://bachxuantrann2003:20102003@iotdatabase.lhzod.mongodb.net/iotdatabase?retryWrites=true&w=majority&appName=iotdatabase";
module.exports.connect = async (app) => {
    mongoose
        .connect(mongoDBURL)
        .then(() => {
            console.log("Connected to MongoDB");
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
