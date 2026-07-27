import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from "@mui/material";

import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

import { toast } from "react-toastify";

import {
  forgotPassword,
  verifyResetOTP,
} from "../../services/authService";

import maskEmail from "../../utils/maskEmail";
import OTPInput from "../../components/auth/OTPInput";

const VerifyOTP = () => {
  const navigate = useNavigate();

  const email = sessionStorage.getItem("resetEmail");

  const flowStarted = sessionStorage.getItem(
    "resetFlowStarted"
  );

  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (!email || !flowStarted) {
      navigate("/forgot-password");
      return;
    }
  }, [email, flowStarted, navigate]);

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      await verifyResetOTP(email, otp);

      sessionStorage.setItem(
        "otpVerified",
        "true"
      );

      toast.success(
        "OTP verified successfully."
      );

      setTimeout(() => {
        navigate("/reset-password");
      }, 800);

    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Invalid OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await forgotPassword(email);

      setOtp("");

      setSeconds(60);

      toast.success(
        "OTP sent successfully."
      );

    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Unable to resend OTP."
      );
    }
  };

  const handleChangeEmail = () => {
    sessionStorage.removeItem("resetEmail");
    sessionStorage.removeItem(
      "resetFlowStarted"
    );
    sessionStorage.removeItem(
      "otpVerified"
    );

    navigate("/forgot-password");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ mt: 8 }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
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
              bgcolor: "success.main",
              width: 70,
              height: 70,
              mb: 2,
            }}
          >
            <VerifiedUserIcon />
          </Avatar>

          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
          >
            Verify OTP
          </Typography>

          <Typography
            color="text.secondary"
            align="center"
          >
            Enter the verification code sent to
          </Typography>

          <Typography
            color="primary"
            fontWeight="bold"
            sx={{ mt: 1, mb: 4 }}
          >
            {maskEmail(email)}
          </Typography>

          <Box
            component="form"
            width="100%"
            onSubmit={handleVerify}
          >
            <OTPInput
              value={otp}
              onChange={setOtp}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Verifying..."
                : "Verify OTP"}
            </Button>

            <Button
              fullWidth
              sx={{ mt: 2 }}
              disabled={seconds > 0}
              onClick={handleResend}
            >
              {seconds > 0
                ? `Resend OTP in ${seconds}s`
                : "Resend OTP"}
            </Button>

            <Button
              fullWidth
              sx={{ mt: 1 }}
              onClick={handleChangeEmail}
            >
              Change Email
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default VerifyOTP;