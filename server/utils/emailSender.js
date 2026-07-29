const transporter = require("../config/mail");

// Booking Confirmation Email
const sendBookingEmail = async (
  booking,
  pdfPath
) => {
  await transporter.sendMail({
    from: process.env.SENDER_EMAIL,

    to: booking.user.email,

    subject: "Bus Ticket Confirmation",

    html: `
      <h2>Booking Confirmed</h2>

      <p>Hello <b>${booking.user.name}</b>,</p>

      <p>Your booking has been confirmed successfully.</p>

      <p><b>This is a temporary test email without the PDF attachment.</b></p>

      <p>Thank you for choosing Smart Bus Booking.</p>
    `,
  });
};

// Password Reset OTP Email
const sendOTPEmail = async (
  email,
  firstName,
  otp
) => {
  await transporter.sendMail({
    from: process.env.SENDER_EMAIL,

    to: email,

    subject: "Password Reset OTP",

    html: `
      <div
        style="
          font-family: Arial, sans-serif;
          line-height:1.6;
        "
      >
        <h2>Hello ${firstName},</h2>

        <p>
          We received a request to reset your password.
        </p>

        <p>
          Your One-Time Password (OTP) is:
        </p>

        <h1
          style="
            color:#1976d2;
            letter-spacing:6px;
          "
        >
          ${otp}
        </h1>

        <p>
          This OTP is valid for
          <strong>10 minutes</strong>.
        </p>

        <p>
          If you did not request this request,
          please ignore this email.
        </p>

        <br>

        <p>
          Smart Bus Booking System
        </p>
      </div>
    `,
  });
};

module.exports = {
  sendBookingEmail,
  sendOTPEmail,
};