const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      required: true,
      trim: true,
    },

    destination: {
      type: String,
      required: true,
      trim: true,
    },

    distance: {
      type: Number,
      required: true,
    },

    estimatedDuration: {
      type: String,
      required: true,
    },

    boardingPoints: [
      {
        type: String,
      },
    ],

    droppingPoints: [
      {
        type: String,
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Route", routeSchema);