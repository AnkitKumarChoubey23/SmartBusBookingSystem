const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");

const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const generateToken = require("../utils/generateToken");

const { generateOTP } = require("../utils/generateOTP");
const { hashOTP } = require("../utils/hashOTP");

const {
  sendOTPEmail,
} = require("../utils/emailSender");

const User = require("../models/User");

// ===========================
// REGISTER
// ===========================

exports.registerUser = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
  } = req.body;

  const userExists = await User.findOne({
    $or: [{ email }, { phone }],
  });

  if (userExists) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(
        new ApiResponse(false, "User already exists")
      );
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
  });

  const token = generateToken(
    user._id,
    user.role
  );

  res.status(StatusCodes.CREATED).json(
    new ApiResponse(
      true,
      "Registration Successful",
      {
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      }
    )
  );
});

// ===========================
// LOGIN
// ===========================

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  }).select("+password");

  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(
        new ApiResponse(
          false,
          "Invalid Credentials"
        )
      );
  }

  const isMatch =
    await user.matchPassword(password);

  if (!isMatch) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(
        new ApiResponse(
          false,
          "Invalid Credentials"
        )
      );
  }

  const token = generateToken(
    user._id,
    user.role
  );

  res.status(StatusCodes.OK).json(
    new ApiResponse(
      true,
      "Login Successful",
      {
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      }
    )
  );
});

// ===========================
// PROFILE
// ===========================

exports.getProfile = asyncHandler(async (req, res) => {
  res.status(StatusCodes.OK).json(
    new ApiResponse(
      true,
      "Profile Retrieved",
      req.user
    )
  );
});

// ===========================
// FORGOT PASSWORD
// ===========================

exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return res.status(StatusCodes.OK).json(
      new ApiResponse(
        true,
        "If the email is registered, an OTP has been sent."
      )
    );
  }

  // ===== Resend Cooldown =====

  if (user.lastOTPSentAt) {

    const secondsPassed =
      Math.floor(
        (Date.now() -
          user.lastOTPSentAt.getTime()) /
          1000
      );

    if (secondsPassed < 60) {

      return res
        .status(StatusCodes.TOO_MANY_REQUESTS)
        .json(
          new ApiResponse(
            false,
            `Please wait ${
              60 - secondsPassed
            } seconds before requesting another OTP.`
          )
        );
    }
  }

  const otp = generateOTP();

  user.resetOTP = hashOTP(otp);

  user.resetOTPExpire =
    Date.now() + 10 * 60 * 1000;

  user.resetOTPVerified = false;

  user.resetOTPAttempts = 0;

  user.lastOTPSentAt = new Date();

  await user.save();

  await sendOTPEmail(
    user.email,
    user.firstName,
    otp
  );

  res.status(StatusCodes.OK).json(
    new ApiResponse(
      true,
      "OTP sent successfully."
    )
  );
});

// ===========================
// VERIFY OTP
// ===========================

exports.verifyResetOTP = asyncHandler(async (req, res) => {

  const { email, otp } = req.body;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST).json(
      new ApiResponse(false, "Invalid OTP")
    );
  }

  if (
    !user.resetOTP ||
    !user.resetOTPExpire
  ) {
    return res.status(StatusCodes.BAD_REQUEST).json(
      new ApiResponse(
        false,
        "Please request a new OTP."
      )
    );
  }

  if (user.resetOTPExpire < Date.now()) {

    user.resetOTP = "";

    user.resetOTPExpire = null;

    user.resetOTPVerified = false;

    user.resetOTPAttempts = 0;

    await user.save();

    return res.status(StatusCodes.BAD_REQUEST).json(
      new ApiResponse(
        false,
        "OTP has expired."
      )
    );
  }

  if (user.resetOTPAttempts >= 5) {

    return res.status(StatusCodes.BAD_REQUEST).json(
      new ApiResponse(
        false,
        "Maximum OTP attempts exceeded."
      )
    );
  }

  if (
    hashOTP(otp) !== user.resetOTP
  ) {

    user.resetOTPAttempts++;

    await user.save();

    return res.status(StatusCodes.BAD_REQUEST).json(
      new ApiResponse(
        false,
        "Invalid OTP."
      )
    );
  }

  user.resetOTPVerified = true;

  await user.save();

  res.status(StatusCodes.OK).json(
    new ApiResponse(
      true,
      "OTP verified successfully."
    )
  );
});

// ===========================
// RESET PASSWORD
// ===========================

exports.resetPassword = asyncHandler(async (req, res) => {

  const {
    email,
    newPassword,
  } = req.body;

  const user = await User.findOne({
    email,
  }).select("+password");

  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST).json(
      new ApiResponse(
        false,
        "User not found."
      )
    );
  }

  if (!user.resetOTPVerified) {
    return res.status(StatusCodes.BAD_REQUEST).json(
      new ApiResponse(
        false,
        "OTP verification required."
      )
    );
  }

  // ===== Strong Password Validation =====

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#^()_\-+=])[A-Za-z\d@$!%*?&.#^()_\-+=]{8,}$/;

  if (!passwordRegex.test(newPassword)) {

    return res.status(StatusCodes.BAD_REQUEST).json(
      new ApiResponse(
        false,
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
      )
    );
  }

  user.password = newPassword;

  // ===== Clear Reset Data =====

  user.resetOTP = "";

  user.resetOTPExpire = null;

  user.resetOTPVerified = false;

  user.resetOTPAttempts = 0;

  user.lastOTPSentAt = null;

  await user.save();

  res.status(StatusCodes.OK).json(
    new ApiResponse(
      true,
      "Password reset successfully. Please login with your new password."
    )
  );
});