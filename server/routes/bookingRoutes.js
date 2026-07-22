const express = require("express");

const router = express.Router();

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const {
  bookSeats,
  getMyBookings,
  getBookingById,
  getAllBookings,
  cancelBooking,
} = require("../controllers/bookingController");

// User Routes
router.post("/", protect, bookSeats);

router.get("/my-bookings", protect, getMyBookings);

router.get("/:id", protect, getBookingById);

router.put("/:id/cancel", protect, cancelBooking);

// Admin Route
router.get("/", protect, adminOnly, getAllBookings);

module.exports = router;