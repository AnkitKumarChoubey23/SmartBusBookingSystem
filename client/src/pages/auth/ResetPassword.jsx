import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import LockResetIcon from "@mui/icons-material/LockReset";

import { toast } from "react-toastify";

import { resetPassword } from "../../services/authService";

import maskEmail from "../../utils/maskEmail";

const ResetPassword = () => {
  const navigate = useNavigate();

  const email =
    sessionStorage.getItem("resetEmail");

  const flowStarted =
    sessionStorage.getItem(
      "resetFlowStarted"
    );

  const otpVerified =
    sessionStorage.getItem(
      "otpVerified"
    );

  const [newPassword, setNewPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (
      !email ||
      !flowStarted ||
      !otpVerified
    ) {
      navigate("/forgot-password");
    }
  }, [
    email,
    flowStarted,
    otpVerified,
    navigate,
  ]);

  const validatePassword = (
    password
  ) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#^()_\-+=])[A-Za-z\d@$!%*?&.#^()_\-+=]{8,}$/;

    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      newPassword !==
      confirmPassword
    ) {
      toast.error(
        "Passwords do not match."
      );
      return;
    }

    if (
      !validatePassword(newPassword)
    ) {
      toast.error(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
      );
      return;
    }

    try {
      setLoading(true);

      await resetPassword(
        email,
        newPassword
      );

      // Cleanup

      sessionStorage.removeItem(
        "resetEmail"
      );

      sessionStorage.removeItem(
        "resetFlowStarted"
      );

      sessionStorage.removeItem(
        "otpVerified"
      );

      toast.success(
        "Password reset successfully. Please login."
      );

      navigate("/login");

    } catch (err) {

      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Unable to reset password."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ mt: 8 }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Avatar
            sx={{
              bgcolor: "warning.main",
              mb: 2,
            }}
          >
            <LockResetIcon />
          </Avatar>

          <Typography
            variant="h4"
            fontWeight="bold"
          >
            Reset Password
          </Typography>

          <Typography
            color="text.secondary"
            textAlign="center"
            mb={3}
          >
            Create a strong new password.
          </Typography>

          <Typography
            color="primary"
            fontWeight="bold"
            mb={3}
          >
            {maskEmail(email)}
          </Typography>

          <Box
            component="form"
            width="100%"
            onSubmit={handleSubmit}
          >
            <TextField
              fullWidth
              required
              type="password"
              label="New Password"
              margin="normal"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }
            />

            <TextField
              fullWidth
              required
              type="password"
              label="Confirm Password"
              margin="normal"
              value={
                confirmPassword
              }
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
            />

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              Password must contain:
              <br />
              • Minimum 8 characters
              <br />
              • One uppercase letter
              <br />
              • One lowercase letter
              <br />
              • One number
              <br />
              • One special character
            </Typography>

            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 4 }}
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Updating..."
                : "Reset Password"}
            </Button>

            <Button
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => {
                sessionStorage.clear();
                navigate("/login");
              }}
            >
              Cancel
            </Button>

          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ResetPassword;