const express = require("express");
const { submitTest } = require("../controllers/userTest");
const userTest = express.Router();
const auth = require("../middlewares/auth");

userTest.post("/submit-test", auth, submitTest);

module.exports = userTest;
