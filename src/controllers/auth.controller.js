const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const sendWelcomeEmail = require("../services/email.service");

// register
async function registerUserController(req, res) {
  const { email, password, name } = req.body;
  const emailExists = await userModel.findOne({ email });
  console.log(emailExists);

  if (emailExists) {
    res.status(422).json({
      status: 422,
      message: "user already exists",
      data: {},
    });
  }
  const user = await userModel.create({
    email,
    password,
    name,
  });

  
  const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);
  res.status(201).json({
    status: 201,
    message: "user created succcessfully",
    data: user,
  });
  await sendWelcomeEmail(user.email, user?.name);
}

async function loginUserController(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    res.status(401).json({
      status: 401,
      message: "incorrect email or password",
      data: {},
    });
  }
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    res.status(401).json({
      status: 401,
      message: "incorrect email or password",
      data: {},
    });
  }
  let token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);

  res.status(200).json({
    status: 200,
    message: "login successfull",
    data: user,
  });
}

module.exports = { registerUserController, loginUserController };
