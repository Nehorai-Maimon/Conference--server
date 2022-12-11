const mongoose = require("mongoose");

const smsSchema = new mongoose.Schema(
  {
    shipment_id: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    trials: {
      type: Number,
      default: 0,
      required: false,
    },
  },
  {
    timestamps: { createdAt: "created_at" },
  }
);
module.exports = mongoose.model("sms", smsSchema);
