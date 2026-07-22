const { StatusCodes } = require("http-status-codes");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const busService = require("../services/busService");

// Create Bus
exports.createBus = asyncHandler(async (req, res) => {
  const bus = await busService.createBus(req.body);

  res.status(StatusCodes.CREATED).json(
    new ApiResponse(true, "Bus created successfully", bus)
  );
});

// Get All Buses
exports.getAllBuses = asyncHandler(async (req, res) => {
  const buses = await busService.getAllBuses();

  res.status(StatusCodes.OK).json(
    new ApiResponse(true, "Buses fetched successfully", buses)
  );
});

// Get Bus By Id
exports.getBusById = asyncHandler(async (req, res) => {
  const bus = await busService.getBusById(req.params.id);

  if (!bus) {
    return res.status(StatusCodes.NOT_FOUND).json(
      new ApiResponse(false, "Bus not found")
    );
  }

  res.status(StatusCodes.OK).json(
    new ApiResponse(true, "Bus fetched successfully", bus)
  );
});

// Update Bus
exports.updateBus = asyncHandler(async (req, res) => {
  const bus = await busService.updateBus(req.params.id, req.body);

  if (!bus) {
    return res.status(StatusCodes.NOT_FOUND).json(
      new ApiResponse(false, "Bus not found")
    );
  }

  res.status(StatusCodes.OK).json(
    new ApiResponse(true, "Bus updated successfully", bus)
  );
});

// Delete Bus
exports.deleteBus = asyncHandler(async (req, res) => {
  const bus = await busService.deleteBus(req.params.id);

  if (!bus) {
    return res.status(StatusCodes.NOT_FOUND).json(
      new ApiResponse(false, "Bus not found")
    );
  }

  res.status(StatusCodes.OK).json(
    new ApiResponse(true, "Bus deleted successfully")
  );
});