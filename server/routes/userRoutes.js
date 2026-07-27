const express = require("express");

const router = express.Router();

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const {
  getAllUsers,
  getUserById,
  toggleUserStatus,
} = require("../controllers/userController");

// All users
router.get(
  "/",
  protect,
  adminOnly,
  getAllUsers
);

// User details
router.get(
  "/:id",
  protect,
  adminOnly,
  getUserById
);

// Activate / Deactivate
router.patch(
  "/:id/status",
  protect,
  adminOnly,
  toggleUserStatus
);

module.exports = router;