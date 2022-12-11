const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URL,
      {
        useNewUrlParser: true,
      },
      (err) => {
        if (err) return console.log("ERROR :", err);
        console.log(
          "🚀 ~ file: db.js ~ line 12 ~ exports.connect= ~ MONGO_URL",
          process.env.MONGO_URL
        );
        console.log(
          "MongoDB Connection -- Ready state is:",
          mongoose.connection.readyState
        );
      }
    );
  } catch (err) {
    console.log("error mongoose", err);
  }
};
