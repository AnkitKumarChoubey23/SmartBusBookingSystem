import api from "./api";

// Register
export const registerUser = async (userData) => {
  const response = await api.post(
    "/auth/register",
    userData
  );

  return response.data;
};

// Login
export const loginUser = async (credentials) => {
  const response = await api.post(
    "/auth/login",
    credentials
  );

  return response.data;
};

// Forgot Password
export const forgotPassword = async (email) => {
  const response = await api.post(
    "/auth/forgot-password",
    { email }
  );

  return response.data;
};

// Verify OTP
export const verifyResetOTP = async (
  email,
  otp
) => {
  const response = await api.post(
    "/auth/verify-reset-otp",
    {
      email,
      otp,
    }
  );

  return response.data;
};

// Reset Password
export const resetPassword = async (
  email,
  newPassword
) => {
  const response = await api.post(
    "/auth/reset-password",
    {
      email,
      newPassword,
    }
  );

  return response.data;
};