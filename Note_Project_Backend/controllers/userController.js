const User = require("../model/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const constant = require("../config/constants.js");
const {
  isValid,
  validString,
  isValidName,
  isValidPassword,
  isValidEmail,
} = require("../validations/validations.js");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res
        .status(constant.BAD_REQUEST)
        .send({ success: false, message: constant.INPUTMISSING });
    }

    if (name) {
      if (!isValid(name) && !validString(name)) {
        return res.status(constant.BAD_REQUEST).send({
          success: false,
          message: constant.INPUTMISSING,
        });
      }
      if (!isValidName(name)) {
        return res.status(constant.BAD_REQUEST).send({
          success: false,
          message: constant.VALIDINPUT,
        });
      }
    }

    if (email) {
      if (!isValid(email) && !validString(email)) {
        return res.status(constant.BAD_REQUEST).send({
          success: false,
          message: constant.INPUTMISSING,
        });
      }
      if (!isValidEmail(email)) {
        return res.status(constant.BAD_REQUEST).send({
          success: false,
          message: constant.INVALIDEMAIL,
        });
      }
    }

    if (password) {
      if (!isValid(password) && !validString(password)) {
        return res.status(constant.BAD_REQUEST).send({
          success: false,
          message: constant.INPUTMISSING,
        });
      }

      if (!isValidPassword(password)) {
        return res.status(constant.BAD_REQUEST).send({
          success: false,
          message: constant.VALIDPASSWORD,
        });
      }
    }

    if (confirmPassword) {
      if (!isValid(confirmPassword) && !validString(confirmPassword)) {
        return res.status(constant.BAD_REQUEST).send({
          success: false,
          message: constant.INPUTMISSING,
        });
      }

      if (!isValidPassword(confirmPassword)) {
        return res.status(constant.BAD_REQUEST).send({
          success: false,
          message: constant.VALIDPASSWORD,
        });
      }
    }

    if (password !== confirmPassword) {
      return res.status(constant.BAD_REQUEST).send({
        success: false,
        message: constant.INVALIDPASSWORD,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(constant.BAD_REQUEST)
        .send({ success: false, message: constant.USEREXIST });
    }

    const hashedPassword = await bcrypt.hash(password, constant.SALTROUND);

    let newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    newUser = await newUser.save();

    newUser = {
      Id: newUser._id,
      Name: newUser.name,
      email: newUser.email,
    };

    res.status(constant.DATA_CREATE_CODE).send({
      success: true,
      message: constant.SUCCESSCREATE,
      data: newUser,
    });
  } catch (error) {
    return res.status(constant.ERR_CODE).send({
      success: false,
      message: `${constant.SERVERERROR}- ${error.message}`,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(constant.BAD_REQUEST).send({
        success: false,
        message: constant.INPUTMISSING,
      });
    }

    if (email) {
      if (!isValid(email) && !validString(email)) {
        return res.status(constant.BAD_REQUEST).send({
          success: false,
          message: constant.INPUTMISSING,
        });
      }
      if (!isValidEmail(email)) {
        return res.status(constant.BAD_REQUEST).send({
          success: false,
          message: constant.INVALIDEMAIL,
        });
      }
    }

    if (password) {
      if (!isValid(password) && !validString(password)) {
        return res.status(constant.BAD_REQUEST).send({
          success: false,
          message: constant.INPUTMISSING,
        });
      }

      if (!isValidPassword(password)) {
        return res.status(constant.BAD_REQUEST).send({
          success: false,
          message: constant.VALIDPASSWORD,
        });
      }
    }

    const user = await User.findOne({ email, isActive: true });
    if (!user) {
      return res.status(constant.BAD_REQUEST).send({
        success: false,
        message: constant.NOTEXIST,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(constant.BAD_REQUEST)
        .send({ success: false, message: constant.VALIDPASSWORD });
    }

    const payload = {
      id: user._id,
      email: user.email,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });

    return res.status(constant.SUCCESS_CODE).send({
      success: true,
      message: constant.LOGINSUCCESS,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token: accessToken,
    });
  } catch (error) {
    return res.status(constant.ERR_CODE).send({
      success: false,
      message: `${constant.SERVERERROR}- ${error.message}`,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.status(constant.SUCCESS_CODE).send({
      success: true,
      message: constant.LOGOUTSUCCESS,
    });
  } catch (error) {
    return res.status(constant.ERR_CODE).send({
      success: false,
      message: constant.SERVERERROR,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
