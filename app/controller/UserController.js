const User = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserController {

  // POST login
  async loggedCreate(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) return res.render("login", { error: "User not found", formData: { email } });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.render("login", { error: "Incorrect password", formData: { email } });

      // Create access token (expires in 1 hour)
      const accessToken = jwt.sign(
        { id: user._id, name: user.name, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Create refresh token (expires in 7 days)
      const refreshToken = jwt.sign(
        { id: user._id, name: user.name, email: user.email },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
      );

      // Store the refresh token in an HTTP-only cookie
      res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 7 * 24 * 60 * 60 * 1000 });

      // Send the access token to the frontend
      return res.json({ accessToken });  // Optionally you can send it in headers or body

    } catch (error) {
      console.error(error);
      res.render("login", { error: "Something went wrong", formData: req.body });
    }
  }

  // Refresh Access Token
  async refreshToken(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) return res.status(403).json({ message: "Refresh token missing" });

      // Verify the refresh token
      jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid refresh token" });

        // Generate a new access token
        const newAccessToken = jwt.sign(
          { id: decoded.id, name: decoded.name, email: decoded.email },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        return res.json({ accessToken: newAccessToken });  // Send the new access token
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Dashboard page
  async dashBoard(req, res) {
    try {
      res.render("dashboard", { title: "Dashboard", data: req.user });
    } catch (error) {
      console.error(error);
      res.redirect("/login");
    }
  }

  // Logout
  async logout(req, res) {
    // Clear cookies for both access and refresh tokens
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res.redirect("/login");
  }
}

module.exports = new UserController();
