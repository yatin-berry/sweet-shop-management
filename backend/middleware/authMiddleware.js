const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // check token exists
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    // format: Bearer TOKEN
    const token = authHeader.split(" ")[1];

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user info to request
    req.user = decoded;

    next(); // allow request
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
module.exports = authMiddleware;



