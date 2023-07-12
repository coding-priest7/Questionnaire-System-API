const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  questionText: { type: String, required: true },
  answers: [
    {
      id: { type: String, required: true },
      answerText: { type: String, required: true },
      isCorrect: { type: Boolean, default: false },
    },
  ],
});

const testSchema = new mongoose.Schema({
  name: { type: String, required: true },
  questions: [questionSchema],
});

module.exports = mongoose.model("Test", testSchema);
