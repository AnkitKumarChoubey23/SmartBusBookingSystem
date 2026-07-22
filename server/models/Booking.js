const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    schedule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schedule",
      required: true,
    },

    seats: [
      {
        type: String,
        required: true,
      },
    ],

    totalFare: {
      type: Number,
      required: true,
    },

    bookingStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Cancelled"
      ],
      default: "Pending",
    },

    paymentStatus: {
      type: String,
      enum: [
        "Pending",
        "Paid",
        "Failed"
      ],
      default: "Pending",
    },

    bookingDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);