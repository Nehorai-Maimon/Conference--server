const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  minOfPeople: {
    type: Number,
    required: true,
  },
  maxOfPeople: {
    type: Number,
    required: true,
  },
  hourlyMoneyCost: {
    type: Number,
    required: true,
  },
  hourlyCreditCost: {
    type: Number,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("room", roomSchema);
