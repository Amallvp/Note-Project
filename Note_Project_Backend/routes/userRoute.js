const express = require("express");
const router = express.Router();
const { registerUser, loginUser,logoutUser } = require("../controllers/userController");
const { protectUser } = require("../middleware/authMiddleWare");
const { upload } = require("../middleware/upload");

router.route("/register").post(upload.none(), registerUser);
router.route("/login").post(upload.none(),loginUser);
router.route("/logout").post(protectUser,logoutUser);


module.exports = router;