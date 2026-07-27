import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { toast } from "react-toastify";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(
        "/auth/login",
        formData
      );

      if (
        res.data.data.user.role === "admin"
      ) {
        toast.error(
          "Administrator account detected. Please use Admin Login."
        );
        return;
      }

      login(
        res.data.data.token,
        res.data.data.user
      );

      toast.success(
        `Welcome ${res.data.data.user.firstName}!`
      );

      navigate("/");

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
          "Login Failed"
      );

    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ mt: 8 }}
    >
      <Card elevation={6}>
        <CardContent sx={{ p: 5 }}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Avatar
              sx={{
                width: 70,
                height: 70,
                bgcolor: "primary.main",
                mb: 2,
              }}
            >
              <LockIcon />
            </Avatar>

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              User Login
            </Typography>

            <Typography
              color="text.secondary"
              mb={4}
            >
              Login to continue
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
          >
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                    >
                      {showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Forgot Password */}

            <Box
              display="flex"
              justifyContent="flex-end"
              mt={1}
            >
              <Link
                to="/forgot-password"
                style={{
                  textDecoration: "none",
                }}
              >
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  Forgot Password?
                </Typography>
              </Link>
            </Box>

            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3 }}
              type="submit"
            >
              Login
            </Button>

            <Typography
              align="center"
              sx={{ mt: 3 }}
            >
              New user?{" "}
              <Link to="/register">
                Sign Up
              </Link>
            </Typography>

            <Typography
              align="center"
              sx={{ mt: 2 }}
            >
              Administrator?{" "}
              <Link to="/admin/login">
                Admin Login
              </Link>
            </Typography>

          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;