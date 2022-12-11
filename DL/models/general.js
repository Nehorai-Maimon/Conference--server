const mongoose = require("mongoose");

const generalSchema = new mongoose.Schema({
  message: {
    type: String,
  },
});
module.exports = mongoose.model("generalToken", generalSchema);
