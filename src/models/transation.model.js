const { default: mongoose } = require("mongoose");

const transationSchema = new mongoose.Schema({
  fromAccount: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
    ref: "account",
  },
  toAccount: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "account",
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    enum: ["PENDING", "COMPLETED", "FAILED", "RETURNED"],
    default: "PENDING",
  },
  idempotencyKey:{
    type:String,
    required:true,
    unique:true,

  }
});

module.exports = mongoose.model("transation", transationSchema);
