const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const Schedule = require("../models/Schedule");

// Search buses
exports.searchBuses = asyncHandler(async (req, res) => {
  const { source, destination, date } = req.query;

  const schedules = await Schedule.find({
    status: "Scheduled",
  })
    .populate("bus")
    .populate("route");

  const results = schedules.filter((schedule) => {
    const scheduleDate = new Date(schedule.departureDate)
      .toISOString()
      .split("T")[0];

    return (
      schedule.route.source === source &&
      schedule.route.destination === destination &&
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

// Dynamic search options
exports.getSearchOptions = asyncHandler(async (req, res) => {
  const schedules = await Schedule.find({
    status: "Scheduled",
  }).populate("route");

  const sourceMap = {};

  schedules.forEach((schedule) => {
    const source = schedule.route.source;
    const destination = schedule.route.destination;
    const date = new Date(schedule.departureDate)
      .toISOString()
      .split("T")[0];

    if (!sourceMap[source]) {
      sourceMap[source] = {};
    }

    if (!sourceMap[source][destination]) {
      sourceMap[source][destination] = [];
    }

    if (!sourceMap[source][destination].includes(date)) {
      sourceMap[source][destination].push(date);
    }
  });

  res.json(
    new ApiResponse(
      true,
      "Search options fetched successfully",
      sourceMap
    )
  );
});