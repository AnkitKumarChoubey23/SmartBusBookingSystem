const User = require("../models/User");
const Booking = require("../models/Booking");

// Get all users with booking count
exports.getAllUsers = async () => {
  const users = await User.find()
    .select("-password")
    .sort({ createdAt: -1 });

  const usersWithBookings = await Promise.all(
    users.map(async (user) => {
      const bookingCount = await Booking.countDocuments({
        user: user._id,
      });

      return {
        ...user.toObject(),
        bookingCount,
      };
    })
  );

  return usersWithBookings;
};

// Get user by ID
exports.getUserById = async (id) => {
  const user = await User.findById(id).select("-password");

  if (!user) {
    return null;
  }

  const bookingCount = await Booking.countDocuments({
    user: user._id,
  });

  return {
    ...user.toObject(),
    bookingCount,
  };
};

// Toggle user verification status
exports.toggleUserStatus = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    return null;
  }

  user.isVerified = !user.isVerified;

  await user.save();

  return user;
};