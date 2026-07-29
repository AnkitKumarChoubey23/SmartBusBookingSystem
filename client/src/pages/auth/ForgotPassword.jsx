import { useState } from "react";
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

import { forgotPassword } from "../../services/authService";

const ForgotPassword = () => {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await forgotPassword(email);

      sessionStorage.setItem(
        "resetEmail",
        email
      );

      sessionStorage.setItem(
        "resetFlowStarted",
        "true"
      );

      sessionStorage.removeItem(
        "otpVerified"
      );

      toast.success(
        "OTP sent successfully."
      );

      navigate("/verify-reset-otp");

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
          "Unable to send OTP."
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
              bgcolor: "primary.main",
              mb: 2,
            }}
          >
            <LockResetIcon />
          </Avatar>

          <Typography
            variant="h4"
            fontWeight="bold"
          >
            Forgot Password
          </Typography>

          <Typography
            color="text.secondary"
            textAlign="center"
            mb={4}
          >
            Enter your registered email.
          </Typography>

          <Box
            component="form"
            width="100%"
            onSubmit={handleSubmit}
          >

            <TextField
              fullWidth
              required
              type="email"
              label="Registered Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 4 }}
              disabled={loading}
              type="submit"
            >
              {loading
                ? "Sending..."
                : "Send OTP"}
            </Button>
            <Button
  fullWidth
  sx={{ mt: 2 }}
  onClick={() => navigate("/login")}
>
  ← Back to Login
</Button>

          </Box>

        </Box>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;