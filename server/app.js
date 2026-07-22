const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const busRoutes = require("./routes/busRoutes");
const routeRoutes = require("./routes/routeRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const bookingRoutes = require("./routes/bookingRoutes");
const searchRoutes = require("./routes/searchRoutes");

const app = express();

app.use(cors());

app.use(helmet());

app.use(compression());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Smart Bus Booking API Running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/buses", busRoutes);
app.use("/api/routes", routeRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/search", searchRoutes);

app.use(errorHandler);

module.exports = app;