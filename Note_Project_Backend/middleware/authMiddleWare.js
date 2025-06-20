const jwt = require("jsonwebtoken");
const User = require("../model/user.js");
const dotenv = require("dotenv");
const process = require("process");
const constant = require("../config/constants.js");
dotenv.config();

const protectUser = async (req, res, next) => {
  let token;
  if (!req.headers.authorization) {
    return res
      .status(constant.AUTH_CODE)
      .json({ success: false, message: constant.MISSINGTOKEN });
  }
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(constant.AUTH_CODE)
          .json({ message: constant.EXPIREDTOKEN });
      }
    }
  }

  if (!token) {
    return res
      .status(constant.AUTH_CODE)
      .json({ message: constant.MISSINGTOKEN });
  }
};

module.exports = { protectUser };
