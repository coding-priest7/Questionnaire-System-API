const mongoose = require("mongoose");

const userResponseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  testId: { type: String, required: true },
  answers: { type: Object, required: true },
  score: { type: Number, required: true },
});

module.exports = mongoose.model("UserResponse", userResponseSchema);
