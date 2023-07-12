const mongoose = require("mongoose");

const connect = async () => {
  await mongoose.connect(
    "mongodb+srv://sandy:sandy123@cluster0.7fwvyoe.mongodb.net/"
  );
};

module.exports = { connect };
