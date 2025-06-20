const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "../uploads"));
//   },

  destination: function (req, file, cb) {
    const folder =req.query.userId|| Date.now().toString(); // or use uuid
    const uploadPath = path.join(__dirname, "../uploads", folder);

    fs.mkdirSync(uploadPath, { recursive: true });

    // Save folder path on request object so controller can access it
    req.uploadFolder = folder;

    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = {upload};