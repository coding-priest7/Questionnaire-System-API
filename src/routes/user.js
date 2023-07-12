const express = require("express");
const { signup, signin, update } = require("../controllers/userController");
const userRouter = express.Router();
const auth = require("../middlewares/auth");
userRouter.post("/signup", signup);

userRouter.post("/signin", signin);

userRouter.put("/update/:id", auth, update);

module.exports = userRouter;
