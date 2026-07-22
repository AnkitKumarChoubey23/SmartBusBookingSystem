const { StatusCodes } = require("http-status-codes");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const bookingService = require("../services/bookingService");

// Book Seats
exports.bookSeats = asyncHandler(async (req, res) => {
  const booking = await bookingService.bookSeats(req.user._id, req.body);

  res.status(StatusCodes.CREATED).json(
    new ApiResponse(true, "Booking Successful", booking)
  );
});

// Get Logged-in User Bookings
exports.getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await bookingService.getMyBookings(req.user._id);

  res.status(StatusCodes.OK).json(
    new ApiResponse(true, "Bookings fetched successfully", bookings)
  );
});

// Get Booking By Id
exports.getBookingById = asyncHandler(async (req, res) => {
  const booking = await bookingService.getBookingById(req.params.id);

  if (!booking) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(new ApiResponse(false, "Booking not found"));
  }

  res.status(StatusCodes.OK).json(
    new ApiResponse(true, "Booking fetched successfully", booking)
  );
});

// Get All Bookings (Admin)
exports.getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await bookingService.getAllBookings();

  res.status(StatusCodes.OK).json(
    new ApiResponse(true, "Bookings fetched successfully", bookings)
  );
});

// Cancel Booking
exports.cancelBooking = asyncHandler(async (req, res) => {
  const booking = await bookingService.cancelBooking(req.params.id);

  res.status(StatusCodes.OK).json(
    new ApiResponse(true, "Booking cancelled successfully", booking)
  );
});