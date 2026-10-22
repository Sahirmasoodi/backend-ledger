const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function authMiddleware(req, res, next) {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      status: 401,
      message: "invalid token",
      data: {},
    });
  }

  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken);
    
    const user = await userModel.findById(decodedToken.userId);
    console.log(user);
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message || "Internal server error",
      data: {},
    });
  }
}
module.exports = { authMiddleware };
