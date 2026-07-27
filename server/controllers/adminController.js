const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const User = require("../models/User");
const Bus = require("../models/Bus");
const Route = require("../models/Route");
const Schedule = require("../models/Schedule");
const Booking = require("../models/Booking");

exports.getDashboardStats = asyncHandler(async (req, res) => {
  const [
  totalUsers,
  totalBuses,
  totalRoutes,
  totalSchedules,
  totalBookings,
  bookings,
  recentBookings,
  recentUsers,
] = await Promise.all([
  User.countDocuments(),
  Bus.countDocuments(),
  Route.countDocuments(),
  Schedule.countDocuments(),
  Booking.countDocuments(),
  Booking.find(),

  Booking.find()
    .populate("user", "firstName lastName email")
    .populate({
      path: "schedule",
      populate: [
        { path: "bus" },
        { path: "route" },
      ],
    })
    .sort({ createdAt: -1 })
    .limit(5),

  User.find()
    .select("firstName lastName email phone role")
    .sort({ createdAt: -1 })
    .limit(5),
]);

  const totalRevenue = bookings.reduce(
    (sum, booking) =>
      booking.bookingStatus === "Confirmed"
        ? sum + booking.totalFare
        : sum,
    0
  );

  res.status(200).json(
    new ApiResponse(true, "Dashboard statistics fetched successfully", {
     totalUsers,
  totalBuses,
  totalRoutes,
  totalSchedules,
  totalBookings,
  totalRevenue,
  recentBookings,
  recentUsers,
    })
  );
});