const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const bookingService = require("../services/bookingService");

const generateTicketPDF = require("../utils/pdfGenerator");

exports.downloadTicket = asyncHandler(async (req, res) => {
  const booking = await bookingService.getBookingById(
    req.params.id
  );

  if (!booking) {
    return res.status(404).json(
      new ApiResponse(false, "Booking not found")
    );
  }

  generateTicketPDF(booking, res);
});