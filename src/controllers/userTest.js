const Test = require("../models/Test");
const UserResponse = require("../models/UserResponse");

// Endpoint for submitting a test
async function submitTest(req, res) {
  try {
    const { userId, testId, answers } = req.body;

    // Check if the user has already taken the test
    const existingResponse = await UserResponse.findOne({ userId, testId });
    if (existingResponse) {
      return res
        .status(400)
        .json({ success: false, message: "User has already taken the test" });
    }

    // Get the test details from the database
    const test = await Test.findById(testId);
    if (!test) {
      return res
        .status(404)
        .json({ success: false, message: "Test not found" });
    }

    // Calculate the score based on the user's answers
    const score = calculateScore(test, answers);

    // Save the user's response in the database
    const userResponse = new UserResponse({
      userId,
      testId,
      answers,
      score,
    });
    await userResponse.save();

    res.status(200).json({ success: true, userId, testId, score });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
}

// function to calculate the score
function calculateScore(test, userAnswers) {
  let score = 0;

  // Iterate over each question in the test
  test.questions.forEach((question) => {
    const correctAnswers = question.answers
      .filter((answer) => answer.isCorrect)
      .map((answer) => answer.id);
    const userSelectedAnswers = userAnswers[question.id] || [];

    // Check if the user's selected answers match the correct answers
    const isCorrect = arraysEqual(correctAnswers, userSelectedAnswers);
    if (isCorrect) {
      score += 1;
    }
  });

  return score;
}

// function to check if two arrays are equal
function arraysEqual(a, b) {
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}

module.exports = {
  submitTest,
};
