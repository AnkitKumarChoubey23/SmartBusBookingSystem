const axios = require("axios");
const fs = require("fs");

const API_URL = "https://api.brevo.com/v3/smtp/email";

const headers = {
  "api-key": process.env.BREVO_API_KEY,
  "Content-Type": "application/json",
};

// Booking Confirmation Email
const sendBookingEmail = async (booking, pdfPath) => {
  const pdfBase64 = fs.readFileSync(pdfPath, {
    encoding: "base64",
  });

  await axios.post(
    API_URL,
    {
      sender: {
        name: "Smart Bus Booking",
        email: process.env.SENDER_EMAIL,
      },

      to: [
        {
          email: booking.user.email,
          name: booking.user.name,
        },
      ],

      subject: "Bus Ticket Confirmation",

      htmlContent: `
        <h2>Booking Confirmed</h2>

        <p>Hello <b>${booking.user.name}</b>,</p>

        <p>Your ticket is attached.</p>

        <p>Thank you for choosing Smart Bus Booking.</p>
      `,

      attachment: [
        {
          name: "BusTicket.pdf",
          content: pdfBase64,
        },
      ],
    },
    {
      headers,
    }
  );
};

// Password Reset OTP Email
const sendOTPEmail = async (
  email,
  firstName,
  otp
) => {
  await axios.post(
    API_URL,
    {
      sender: {
        name: "Smart Bus Booking",
        email: process.env.SENDER_EMAIL,
      },

      to: [
        {
          email,
          name: firstName,
        },
      ],

      subject: "Password Reset OTP",

      htmlContent: `
      <div style="font-family:Arial,sans-serif">

      <h2>Hello ${firstName}</h2>

      <p>Your OTP is:</p>

      <h1 style="color:#1976d2">${otp}</h1>

      <p>This OTP is valid for 10 minutes.</p>

      <p>Smart Bus Booking System</p>

      </div>
      `,
    },
    {
      headers,
    }
  );
};

module.exports = {
  sendBookingEmail,
  sendOTPEmail,
};