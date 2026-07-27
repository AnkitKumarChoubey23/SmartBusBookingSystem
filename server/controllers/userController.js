const { StatusCodes } = require("http-status-codes");

const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const userService = require("../services/userService");

// Get all users
exports.getAllUsers = asyncHandler(async (req, res) => {

  const users = await userService.getAllUsers();

  res.status(StatusCodes.OK).json(
    new ApiResponse(
      true,
      "Users fetched successfully",
      users
    )
  );
});

// Get user by ID
exports.getUserById = asyncHandler(async (req, res) => {

  const user = await userService.getUserById(
    req.params.id
  );

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json(
      new ApiResponse(false, "User not found")
    );
  }

  res.status(StatusCodes.OK).json(
    new ApiResponse(
      true,
      "User fetched successfully",
      user
    )
  );
});

// Activate / Deactivate user
exports.toggleUserStatus = asyncHandler(async (req, res) => {

  const user =
    await userService.toggleUserStatus(
      req.params.id
    );

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json(
      new ApiResponse(false, "User not found")
    );
  }

  res.status(StatusCodes.OK).json(
    new ApiResponse(
      true,
      "User status updated",
      user
    )
  );
});