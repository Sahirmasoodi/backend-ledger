const express = require("express");
const {
  createAccountController,
} = require("../controllers/account.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

const router = express.Router();
router.post("/create", authMiddleware, createAccountController);

module.exports = router;
