const mongoose = require("mongoose");

function connectToDb() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Db connected successfully");
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
}

module.exports = connectToDb;