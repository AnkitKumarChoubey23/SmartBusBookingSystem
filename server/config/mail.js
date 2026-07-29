const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 465,
  secure: true,

  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },

  logger: true,
  debug: true,
});

module.exports = transporter;