const mongoose = require("mongoose");
const port = process.env.PORT;
const mongoDBURL = process.env.MONGODBURL;
module.exports.connect = async (app) => {
    mongoose
        .connect(mongoDBURL)
        .then(() => {
            console.log("Connected to MongoDB");
            app.listen(port, () => {
                console.log(`Server is running on port ${port}`);
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
