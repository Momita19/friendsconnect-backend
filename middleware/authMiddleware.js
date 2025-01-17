const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/env");

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Received token:", token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded; 
    console.log('Decoded token:', decoded);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = protect;
