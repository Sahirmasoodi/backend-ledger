const { default: mongoose } = require("mongoose");

const ledgerSchema = new mongoose.Schema({
  transation: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    immutable: true,
    ref: "transation",
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    immutable: true,
    ref: "account",
  },
  status: {
    type: String,
    enum: ["CREDIT", "DEBIT"],
    required: true,
    immutable: true,
  },
  amount: {
    type: Number,
    required: true,
    immutable: true,
  },
});

function preventModification() {
  throw new Error(
    "Ledger entries are immutable and cannot be modified or deleted",
  );
}


ledgerSchema.pre("find",preventModification)
ledgerSchema.pre("findOne",preventModification)
ledgerSchema.pre("findOneAndDelete",preventModification)
ledgerSchema.pre("findOneAndReplace",preventModification)
ledgerSchema.pre("findOneAndUpdate",preventModification)
ledgerSchema.pre("updateMany",preventModification)
ledgerSchema.pre("updateOne",preventModification)
ledgerSchema.pre("replaceOne",preventModification)
ledgerSchema.pre("deleteMany",preventModification)
ledgerSchema.pre("deleteOne",preventModification)
ledgerSchema.pre("deleteMany",preventModification)

module.exports = mongoose.model("ledger",ledgerSchema)