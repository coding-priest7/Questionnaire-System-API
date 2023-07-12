const express = require("express");
const app = express();
const { connect } = require("./config/database.js");
const path = require("path");
const port = 3000;
const bcrypt = require("bcrypt");
const userRouter = require("./routes/user.js");
const userTest = require("./routes/test.js");

//convert res string to json
app.use(express.json());

app.use("/", express.static(path.join(__dirname, "static")));

//Mandatory endpoint I
app.get("/api/welcome", (req, res) => {
  const response = {
    success: true,
    message: "API successfully called",
  };

  res.status(200).json(response);
});

//Mnadatory end point II & III
app.use("/api", userRouter);

app.use("/api", userTest);

app.listen(port, async () => {
  console.log("server started at 3000");

  connect();

  console.log("MongoDB connected");
});
