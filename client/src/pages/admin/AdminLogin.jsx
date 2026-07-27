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

import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { toast } from "react-toastify";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

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
      const res = await api.post("/auth/login", formData);

      if (res.data.data.user.role !== "admin") {
        toast.error(
          "You do not have administrator privileges."
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

      navigate("/admin");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Admin Login Failed"
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
                bgcolor: "error.main",
                mb: 2,
              }}
            >
              <AdminPanelSettingsIcon />
            </Avatar>

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              Administrator Login
            </Typography>

            <Typography
              color="text.secondary"
              mb={4}
            >
              Authorized Personnel Only
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
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPassword(!showPassword)
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

            <Button
              fullWidth
              variant="contained"
              color="error"
              size="large"
              sx={{ mt: 4 }}
              type="submit"
            >
              Admin Login
            </Button>

            <Typography
              align="center"
              sx={{ mt: 3 }}
            >
              Customer?{" "}
              <Link to="/login">
                User Login
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AdminLogin;