const Booking = require("../models/Booking");
const Schedule = require("../models/Schedule");

const {
  sendBookingEmail,
} = require("../utils/emailSender");

const generateTicketPDF = require("../utils/pdfGenerator");

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
      throw new Error(
        `Seat ${seatNumber} not found`
      );
    }

    if (seat.isBooked) {
      throw new Error(
        `Seat ${seatNumber} already booked`
      );
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

  const booking = await Booking.create({
    user: userId,
    schedule: scheduleId,
    seats,
    totalFare:
      schedule.fare * seats.length,
    bookingStatus: "Confirmed",
    paymentStatus: "Paid",
  });

  const populatedBooking =
    await Booking.findById(
      booking._id
    )
      .populate("user")
      .populate({
        path: "schedule",
        populate: [
          {
            path: "bus",
          },
          {
            path: "route",
          },
        ],
      });

  // Send email in background
  process.nextTick(async () => {
    try {
      const pdfPath =
        await generateTicketPDF(
          populatedBooking
        );

      await sendBookingEmail(
        populatedBooking,
        pdfPath
      );

      console.log(
        "✅ Booking email sent successfully."
      );
    } catch (err) {
      console.error(
        "❌ Booking email failed:"
      );
      console.error(err);
    }
  });

  return populatedBooking;
};

// ==========================
// USER BOOKINGS
// ==========================

exports.getMyBookings = (userId) =>
  Booking.find({ user: userId })
    .populate({
      path: "schedule",
      populate: [
        {
          path: "bus",
        },
        {
          path: "route",
        },
      ],
    })
    .sort({ createdAt: -1 });

exports.getBookingById = (bookingId) =>
  Booking.findById(bookingId)
    .populate(
      "user",
      "firstName lastName email"
    )
    .populate({
      path: "schedule",
      populate: [
        {
          path: "bus",
        },
        {
          path: "route",
        },
      ],
    });

exports.getAllBookings = () =>
  Booking.find()
    .populate(
      "user",
      "firstName lastName email"
    )
    .populate({
      path: "schedule",
      populate: [
        {
          path: "bus",
        },
        {
          path: "route",
        },
      ],
    })
    .sort({ createdAt: -1 });

// ==========================
// CANCEL BOOKING
// ==========================

exports.cancelBooking = async (
  bookingId
) => {
  const booking =
    await Booking.findById(
      bookingId
    );

  if (!booking) {
    throw new Error(
      "Booking not found"
    );
  }

  if (
    booking.bookingStatus ===
    "Cancelled"
  ) {
    throw new Error(
      "Booking already cancelled"
    );
  }

  const schedule =
    await Schedule.findById(
      booking.schedule
    );

  booking.seats.forEach(
    (seatNumber) => {
      const seat =
        schedule.seats.find(
          (s) =>
            s.seatNumber === seatNumber
        );

      if (seat) {
        seat.isBooked = false;
        seat.bookedBy = null;
      }
    }
  );

  schedule.availableSeats +=
    booking.seats.length;

  await schedule.save();

  booking.bookingStatus =
    "Cancelled";

  await booking.save();

  return booking;
};