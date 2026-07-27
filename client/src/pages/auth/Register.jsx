import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { toast } from "react-toastify";

import api from "../../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      toast.error("Passwords do not match");

      return;
    }

    try {
      await api.post("/auth/register", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      toast.success(
        "Registration Successful"
      );

      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ mt: 8, mb: 8 }}
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
                bgcolor: "primary.main",
                width: 70,
                height: 70,
                mb: 2,
              }}
            >
              <PersonAddAlt1Icon
                fontSize="large"
              />
            </Avatar>

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              Create Account
            </Typography>

            <Typography
              color="text.secondary"
              mb={4}
            >
              Sign up to Smart Bus Booking
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
          >
            <Grid
              container
              spacing={2}
            >
              <Grid
                item
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={
                    formData.firstName
                  }
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid
                item
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={
                    formData.lastName
                  }
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid
                item
                xs={12}
              >
                <TextField
                  fullWidth
                  type="email"
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid
                item
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid
                item
                xs={12}
              >
                <TextField
                  fullWidth
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  label="Password"
                  name="password"
                  value={
                    formData.password
                  }
                  onChange={handleChange}
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
              </Grid>

              <Grid
                item
                xs={12}
              >
                <TextField
                  fullWidth
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  label="Confirm Password"
                  name="confirmPassword"
                  value={
                    formData.confirmPassword
                  }
                  onChange={handleChange}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword(
                              !showConfirmPassword
                            )
                          }
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              sx={{ mt: 4 }}
            >
              Sign Up
            </Button>

            <Typography
              align="center"
              sx={{ mt: 3 }}
            >
              Already have an account?{" "}
              <Link to="/login">
                Login
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Register;