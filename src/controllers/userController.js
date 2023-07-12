const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "12345";
const axios = require("axios");

const signup = async (req, res) => {
  //Existing user check

  const { username, password, email, phone_number } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) return res.status(400).json("User already exists");

    //hashed password

    const hashedPassword = await bcrypt.hash(password, 10);

    //user creation

    const result = await userModel.create({
      email: email,
      password: hashedPassword,
      username: username,
      phone_number: phone_number,
    });

    //token generation using JWT

    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);

    res.status(201).json({
      user: result,
      token: token,
      success: true,
      message: "Signed up successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    //Existing user check
    const existingUser = await userModel.findOne({ email: email });

    if (!existingUser) return res.status(404).json("User not found");

    //password matching

    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET_KEY
    );

    // Make the API call to retrieve the message
    const response = await axios.get("https://api.catboys.com/catboy");
    const message = response.data;

    res.status(201).json({
      user: existingUser,
      token: token,
      success: true,
      message: message.response,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const update = async (req, res) => {
  const id = req.params.id;
  const { phone_number } = req.body;

  const updated_val = {
    phone_number: phone_number,
    userId: req.userId,
  };
  try {
    await userModel.findByIdAndUpdate(id, updated_val, { new: true });
    res.status(200).json({
      success: true,
      message: "Phone number changed / added successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
module.exports = { signin, signup, update };
