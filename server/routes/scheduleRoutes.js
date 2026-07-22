const express = require("express");

const router = express.Router();

const {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule,
} = require("../controllers/scheduleController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

// Create Schedule
router.post("/", protect, adminOnly, createSchedule);

// Get All Schedules
router.get("/", getAllSchedules);

// Get Schedule By Id
router.get("/:id", getScheduleById);

// Update Schedule
router.put("/:id", protect, adminOnly, updateSchedule);

// Delete Schedule
router.delete("/:id", protect, adminOnly, deleteSchedule);

module.exports = router;