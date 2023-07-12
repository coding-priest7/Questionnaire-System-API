const mongoose = require("mongoose");
const Test = require("./src/models/Test");

// Connect to the database
mongoose
  .connect("mongodb+srv://sandy:sandy123@cluster0.7fwvyoe.mongodb.net/")
  .then(() => {
    console.log("Connected to the database");

    // Create test cases and save them to the database
    createTestCases()
      .then(() => {
        console.log("Test cases created successfully");
        mongoose.connection.close();
        console.log("Database connection closed");
      })
      .catch((error) => {
        console.error("Error creating test cases:", error);
        mongoose.connection.close();
        console.log("Database connection closed");
      });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

// Function to create test cases and save them to the database
async function createTestCases() {
  try {
    // Test 1
    const test1 = new Test({
      name: "Test 1",
      questions: [
        {
          id: "q1",
          questionText: "What is the capital of France?",
          answers: [
            { id: "a1", answerText: "Paris", isCorrect: true },
            { id: "a2", answerText: "London", isCorrect: false },
            { id: "a3", answerText: "Berlin", isCorrect: false },
            { id: "a4", answerText: "Rome", isCorrect: false },
          ],
        },
        {
          id: "q2",
          questionText: "Which planet is known as the Red Planet?",
          answers: [
            { id: "a5", answerText: "Mars", isCorrect: true },
            { id: "a6", answerText: "Venus", isCorrect: false },
            { id: "a7", answerText: "Jupiter", isCorrect: false },
            { id: "a8", answerText: "Mercury", isCorrect: false },
          ],
        },
      ],
    });
    await test1.save();

    // Test 2
    const test2 = new Test({
      name: "Test 2",
      questions: [
        {
          id: "q1",
          questionText: "What is the chemical symbol for hydrogen?",
          answers: [
            { id: "a1", answerText: "H", isCorrect: true },
            { id: "a2", answerText: "He", isCorrect: false },
            { id: "a3", answerText: "O", isCorrect: false },
            { id: "a4", answerText: "C", isCorrect: false },
          ],
        },
        {
          id: "q2",
          questionText: "Which country is known as the Land of the Rising Sun?",
          answers: [
            { id: "a5", answerText: "Japan", isCorrect: true },
            { id: "a6", answerText: "China", isCorrect: false },
            { id: "a7", answerText: "India", isCorrect: false },
            { id: "a8", answerText: "Brazil", isCorrect: false },
          ],
        },
      ],
    });
    await test2.save();

    // Test 3
    const test3 = new Test({
      name: "Test 3",
      questions: [
        {
          id: "q1",
          questionText: 'Who wrote the play "Romeo and Juliet"?',
          answers: [
            { id: "a1", answerText: "William Shakespeare", isCorrect: true },
            { id: "a2", answerText: "Jane Austen", isCorrect: false },
            { id: "a3", answerText: "Charles Dickens", isCorrect: false },
            { id: "a4", answerText: "Mark Twain", isCorrect: false },
          ],
        },
        {
          id: "q2",
          questionText: "Which country is known as the Land of Fire and Ice?",
          answers: [
            { id: "a5", answerText: "Iceland", isCorrect: true },
            { id: "a6", answerText: "Norway", isCorrect: false },
            { id: "a7", answerText: "Greenland", isCorrect: false },
            { id: "a8", answerText: "Sweden", isCorrect: false },
          ],
        },
      ],
    });
    await test3.save();

    // Test 4
    const test4 = new Test({
      name: "Test 4",
      questions: [
        {
          id: "q1",
          questionText: "What is the largest planet in our solar system?",
          answers: [
            { id: "a1", answerText: "Jupiter", isCorrect: true },
            { id: "a2", answerText: "Saturn", isCorrect: false },
            { id: "a3", answerText: "Neptune", isCorrect: false },
            { id: "a4", answerText: "Uranus", isCorrect: false },
          ],
        },
        {
          id: "q2",
          questionText: "Who painted the Mona Lisa?",
          answers: [
            { id: "a5", answerText: "Leonardo da Vinci", isCorrect: true },
            { id: "a6", answerText: "Pablo Picasso", isCorrect: false },
            { id: "a7", answerText: "Vincent van Gogh", isCorrect: false },
            { id: "a8", answerText: "Michelangelo", isCorrect: false },
          ],
        },
      ],
    });
    await test4.save();

    // Test 5
    const test5 = new Test({
      name: "Test 5",
      questions: [
        {
          id: "q1",
          questionText: "What is the tallest mountain in the world?",
          answers: [
            { id: "a1", answerText: "Mount Everest", isCorrect: true },
            { id: "a2", answerText: "K2", isCorrect: false },
            { id: "a3", answerText: "Kilimanjaro", isCorrect: false },
            { id: "a4", answerText: "Mount Fuji", isCorrect: false },
          ],
        },
        {
          id: "q2",
          questionText: "Which city is known as the Big Apple?",
          answers: [
            { id: "a5", answerText: "New York City", isCorrect: true },
            { id: "a6", answerText: "Los Angeles", isCorrect: false },
            { id: "a7", answerText: "Chicago", isCorrect: false },
            { id: "a8", answerText: "San Francisco", isCorrect: false },
          ],
        },
      ],
    });
    await test5.save();
  } catch (error) {
    throw error;
  }
}
