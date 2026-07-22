const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const Schedule = require("../models/Schedule");

exports.searchBuses = asyncHandler(async (req, res) => {
  const { source, destination, date } = req.query;

  const schedules = await Schedule.find()
    .populate("bus")
    .populate("route");

  console.log("Total schedules:", schedules.length);

  const results = schedules.filter((schedule) => {
    const scheduleDate = new Date(schedule.departureDate)
      .toISOString()
      .split("T")[0];

    return (
      schedule.route.source.toLowerCase() === source.toLowerCase() &&
      schedule.route.destination.toLowerCase() === destination.toLowerCase() &&
      scheduleDate === date
    );
  });

  res.json(
    new ApiResponse(
      true,
      "Schedules fetched successfully",
      results
    )
  );
});