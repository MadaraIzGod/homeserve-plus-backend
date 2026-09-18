const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");
const { AuthCheck } = require("../middleware/auth");

// Pages and Authentication Routes
router.get("/register", UserController.registerPage);
router.post("/register", UserController.createUser);

router.get("/login", UserController.loginPage);
router.post("/login", UserController.loggedCreate);

router.get("/dashboard", AuthCheck, UserController.dashBoard);
router.get("/logout", UserController.logout);

// Token refresh route
router.post("/refresh-token", UserController.refreshToken);  // Add this route

module.exports = router;
