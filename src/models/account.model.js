const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "userid is required"],
      index: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "FREEZE", "CLOSED"],
      default: "ACTIVE",
    },
    currency: {
      type: String,
      default: "INR",
    },
  },
  {
    timestamps: true,
  },
);

accountSchema.index({ user: 1, status: 1 });

module.exports = mongoose.model("account", accountSchema);
