const accountModel = require("../models/account.model");

async function createAccountController(req, res) {
  const user = req.user;

  const account = await accountModel.create({
    user: user._id,
  });

  const populatedAccount = await accountModel
    .findById(account._id)
    .populate("user", "name email");

  res.status(201).json({
    status: 201,
    message: "account created successfully",
    data: populatedAccount,
  });
}

module.exports = { createAccountController };
