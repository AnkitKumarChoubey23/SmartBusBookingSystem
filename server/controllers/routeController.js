const { StatusCodes } = require("http-status-codes");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const routeService = require("../services/routeService");

// Create Route
exports.createRoute = asyncHandler(async (req, res) => {
  const route = await routeService.createRoute(req.body);

  res.status(StatusCodes.CREATED).json(
    new ApiResponse(true, "Route created successfully", route)
  );
});

// Get All Routes
exports.getAllRoutes = asyncHandler(async (req, res) => {
  const routes = await routeService.getAllRoutes();

  res.status(StatusCodes.OK).json(
    new ApiResponse(true, "Routes fetched successfully", routes)
  );
});

// Get Route By ID
exports.getRouteById = asyncHandler(async (req, res) => {
  const route = await routeService.getRouteById(req.params.id);

  if (!route) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(new ApiResponse(false, "Route not found"));
  }

  res.status(StatusCodes.OK).json(
    new ApiResponse(true, "Route fetched successfully", route)
  );
});

// Update Route
exports.updateRoute = asyncHandler(async (req, res) => {
  const route = await routeService.updateRoute(req.params.id, req.body);

  if (!route) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(new ApiResponse(false, "Route not found"));
  }

  res.status(StatusCodes.OK).json(
    new ApiResponse(true, "Route updated successfully", route)
  );
});

// Delete Route
exports.deleteRoute = asyncHandler(async (req, res) => {
  const route = await routeService.deleteRoute(req.params.id);

  if (!route) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(new ApiResponse(false, "Route not found"));
  }

  res.status(StatusCodes.OK).json(
    new ApiResponse(true, "Route deleted successfully")
  );
});