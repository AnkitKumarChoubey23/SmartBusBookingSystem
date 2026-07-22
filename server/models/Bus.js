const mongoose = require("mongoose");

const busSchema = new mongoose.Schema(
  {
    busName: {
      type: String,
      required: true,
      trim: true,
    },

    busNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    busType: {
      type: String,
      enum: [
        "AC Sleeper",
        "Non AC Sleeper",
        "AC Seater",
        "Non AC Seater",
        "Semi Sleeper",
      ],
      required: true,
    },

    operator: {
      type: String,
      required: true,
    },

    totalSeats: {
      type: Number,
      required: true,
      min: 1,
    },

    amenities: [
      {
        type: String,
      },
    ],

    busImage: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bus", busSchema);