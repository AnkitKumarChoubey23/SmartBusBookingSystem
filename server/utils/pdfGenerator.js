const PDFDocument = require("pdfkit");

const fs = require("fs");

const path = require("path");

const generateTicketPDF = (booking) => {
  return new Promise((resolve, reject) => {

    const folder = path.join(__dirname, "../tickets");

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }

    const filePath = path.join(
      folder,
      `Ticket-${booking._id}.pdf`
    );

    const doc = new PDFDocument();

    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    doc
      .fontSize(22)
      .text("SMART BUS BOOKING", {
        align: "center",
      });

    doc.moveDown();

    doc.fontSize(16).text("Passenger");

    doc.fontSize(12);

    doc.text(`Name : ${booking.user.name}`);

    doc.text(`Email : ${booking.user.email}`);

    doc.moveDown();

    doc.fontSize(16).text("Journey");

    doc.fontSize(12);

    doc.text(`Bus : ${booking.schedule.bus.busName}`);

    doc.text(
      `Bus Number : ${booking.schedule.bus.busNumber}`
    );

    doc.text(
      `Route : ${booking.schedule.route.source} → ${booking.schedule.route.destination}`
    );

    doc.text(
      `Departure : ${new Date(
        booking.schedule.departureDate
      ).toLocaleString()}`
    );

    doc.text(
      `Arrival : ${new Date(
        booking.schedule.arrivalDate
      ).toLocaleString()}`
    );

    doc.text(
      `Seats : ${booking.seats.join(", ")}`
    );

    doc.text(
      `Fare : ₹${booking.totalFare}`
    );

    doc.text(
      `Booking ID : ${booking._id}`
    );

    doc.end();

    stream.on("finish", () => {
      resolve(filePath);
    });

    stream.on("error", reject);

  });
};

module.exports = generateTicketPDF;