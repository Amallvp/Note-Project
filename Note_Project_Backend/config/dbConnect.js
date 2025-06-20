const mongoose = require("mongoose");
const process = require("process");
const dbConnect = async () => {
  const res = await mongoose.connect(process.env.MONGODBURI);

  console.log(`Database connected successfully`);
};

module.exports = dbConnect;