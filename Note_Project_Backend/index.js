const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const process = require("process");
const dbConnect = require("./config/dbConnect");
const multer = require("multer");
const upload = multer();
const fs = require("fs");
const path = require("path");
const userRoutes = require("./routes/userRoute");
const noteRoutes = require("./routes/noteRoute");

dotenv.config();
dbConnect();


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(express.json());
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Routes

app.use("/api/v1/user",userRoutes);
app.use("/api/v1/note",noteRoutes);






app.get("/", (req, res) => {
  res.send("Note-Project Running");
});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error:- ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
