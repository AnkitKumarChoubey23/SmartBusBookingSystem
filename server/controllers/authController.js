const { StatusCodes } = require("http-status-codes");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const generateToken = require("../utils/generateToken");
const User = require("../models/User");

exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  const userExists = await User.findOne({
    $or: [{ email }, { phone }],
  });

  if (userExists) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(new ApiResponse(false, "User already exists"));
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
  });

  const token = generateToken(user._id, user.role);

  res.status(StatusCodes.CREATED).json(
    new ApiResponse(true, "Registration Successful", {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  );
});

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(new ApiResponse(false, "Invalid Credentials"));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(new ApiResponse(false, "Invalid Credentials"));
  }

  const token = generateToken(user._id, user.role);

  res.status(StatusCodes.OK).json(
    new ApiResponse(true, "Login Successful", {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  );
});

exports.getProfile = asyncHandler(async (req, res) => {
  res.status(StatusCodes.OK).json(
    new ApiResponse(true, "Profile Retrieved", req.user)
  );
});