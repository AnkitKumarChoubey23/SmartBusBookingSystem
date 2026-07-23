const { StatusCodes } = require("http-status-codes");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const scheduleService = require("../services/scheduleService");

// Create Schedule
exports.createSchedule = asyncHandler(async (req, res) => {
  const schedule = await scheduleService.createSchedule(req.body);

  res.status(StatusCodes.CREATED).json(
    new ApiResponse(true, "Schedule created successfully", schedule)
  );
});

// Get All Schedules
exports.getAllSchedules = asyncHandler(async (req, res) => {
  const schedules = await scheduleService.getAllSchedules();

  res.status(StatusCodes.OK).json(
    new ApiResponse(true, "Schedules fetched successfully", schedules)
  );
});

// Get Schedule By Id
exports.getScheduleById = asyncHandler(async (req, res) => {
  const schedule = await scheduleService.getScheduleById(req.params.id);

  if (!schedule) {
    return res.status(StatusCodes.NOT_FOUND).json(
      new ApiResponse(false, "Schedule not found")
    );
  }

  res.status(StatusCodes.OK).json(
    new ApiResponse(true, "Schedule fetched successfully", schedule)
  );
});

// Update Schedule
exports.updateSchedule = asyncHandler(async (req, res) => {
  const schedule = await scheduleService.updateSchedule(
    req.params.id,
    req.body
  );

  if (!schedule) {
    return res.status(StatusCodes.NOT_FOUND).json(
      new ApiResponse(false, "Schedule not found")
    );
  }

  res.status(StatusCodes.OK).json(
    new ApiResponse(true, "Schedule updated successfully", schedule)
  );
});

// Delete Schedule
exports.deleteSchedule = asyncHandler(async (req, res) => {
  const schedule = await scheduleService.deleteSchedule(req.params.id);

  if (!schedule) {
    return res.status(StatusCodes.NOT_FOUND).json(
      new ApiResponse(false, "Schedule not found")
    );
  }

  res.status(StatusCodes.OK).json(
    new ApiResponse(true, "Schedule deleted successfully")
  );
});