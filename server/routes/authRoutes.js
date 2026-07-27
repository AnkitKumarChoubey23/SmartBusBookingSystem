const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  forgotPassword,
  verifyResetOTP,
  resetPassword,
} = require("../controllers/authController");

const {
  protect,
} = require("../middleware/authMiddleware");

// Authentication
router.post("/register", registerUser);

router.post("/login", loginUser);

// Forgot Password
router.post(
  "/forgot-password",
  forgotPassword
);

router.post(
  "/verify-reset-otp",
  verifyResetOTP
);

router.post(
  "/reset-password",
  resetPassword
);

// Profile
router.get(
  "/profile",
  protect,
  getProfile
);

module.exports = router;