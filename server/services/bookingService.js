const Booking = require("../models/Booking");
const Schedule = require("../models/Schedule");

exports.bookSeats = async (userId, data) => {
  const { scheduleId, seats } = data;

  const schedule = await Schedule.findById(scheduleId);

  if (!schedule) {
    throw new Error("Schedule not found");
  }

  for (const seatNumber of seats) {
    const seat = schedule.seats.find(
      (s) => s.seatNumber === seatNumber
    );

    if (!seat) {
      throw new Error(`Seat ${seatNumber} not found`);
    }

    if (seat.isBooked) {
      throw new Error(`Seat ${seatNumber} already booked`);
    }
  }

  schedule.seats.forEach((seat) => {
    if (seats.includes(seat.seatNumber)) {
      seat.isBooked = true;
      seat.bookedBy = userId;
    }
  });

  schedule.availableSeats -= seats.length;

  await schedule.save();

  return Booking.create({
    user: userId,
    schedule: scheduleId,
    seats,
    totalFare: schedule.fare * seats.length,
    bookingStatus: "Confirmed",
    paymentStatus: "Paid",
  });
};

// NEW METHODS

exports.getMyBookings = (userId) =>
  Booking.find({ user: userId })
    .populate("schedule")
    .sort({ createdAt: -1 });

exports.getBookingById = (bookingId) =>
  Booking.findById(bookingId)
    .populate("user", "name email")
    .populate("schedule");

exports.getAllBookings = () =>
  Booking.find()
    .populate("user", "name email")
    .populate("schedule")
    .sort({ createdAt: -1 });

exports.cancelBooking = async (bookingId) => {
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new Error("Booking not found");
  }

  if (booking.bookingStatus === "Cancelled") {
    throw new Error("Booking already cancelled");
  }

  const schedule = await Schedule.findById(booking.schedule);

  booking.seats.forEach((seatNumber) => {
    const seat = schedule.seats.find(
      (s) => s.seatNumber === seatNumber
    );

    if (seat) {
      seat.isBooked = false;
      seat.bookedBy = null;
    }
  });

  schedule.availableSeats += booking.seats.length;

  await schedule.save();

  booking.bookingStatus = "Cancelled";

  await booking.save();

  return booking;
};