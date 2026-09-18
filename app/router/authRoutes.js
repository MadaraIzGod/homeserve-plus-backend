const router = require("express").Router();
const c = require("../controller/authController");
const { protect } = require("../middleware/security");
router.post("/register", c.register); router.post("/login", c.login); router.post("/refresh", c.refresh); router.post("/logout", c.logout); router.get("/me", protect, c.me);
router.post("/forgot-password",c.forgot);router.post("/reset-password",c.reset);router.patch("/change-password",protect,c.changePassword);router.patch("/profile",protect,c.updateProfile);
module.exports = router;
