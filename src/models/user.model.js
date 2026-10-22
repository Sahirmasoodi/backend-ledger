const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email is already in use"],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/],
    },
    name: {
      type: String,
      required: [true, "name is required"],
    },
    password: {
      type: String,
      minlength: [8, "use strong password"],
      required: [true, "password is required"],
      select:false
    },
  },
  {
    timestamps: true,
  },
);
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  return;
});

userSchema.methods.comparePassword = async function (password) {
  console.log(password);
  
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("user", userSchema);
