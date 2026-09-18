const jwt = require("jsonwebtoken");
const { User } = require("../model");
const protect = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken || req.headers.authorization?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "Authentication required" });
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET || "dev-access-secret");
    req.user = await User.findById(payload.sub);
    if (!req.user || req.user.status !== "active") return res.status(401).json({ message: "Account unavailable" });
    next();
  } catch { res.status(401).json({ message: "Invalid or expired token" }); }
};
const allow = (...roles) => (req, res, next) => roles.includes(req.user.role) ? next() : res.status(403).json({ message: "Forbidden" });
module.exports = { protect, allow };
