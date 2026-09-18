const jwt = require("jsonwebtoken");

const AuthCheck = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ message: "Access token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Attach decoded user info to the request object
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid or expired access token" });
  }
};

module.exports = { AuthCheck };
