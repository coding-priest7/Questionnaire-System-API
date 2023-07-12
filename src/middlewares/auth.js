const jwt = require("jsonwebtoken");
const SECRET_KEY = "12345";

// Middleware function to authenticate the token
const auth = (req, res, next) => {
  // Get the token from the request headers
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, SECRET_KEY);
      req.userID = user.id;
    } else {
      res.status(401).json({ message: "Unauthorised User" });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Unauthorised User" });
  }
};

module.exports = auth;
