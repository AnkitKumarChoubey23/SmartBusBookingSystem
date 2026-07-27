import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
} from "@mui/material";

import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";

import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";



const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

const { user, logout } = useAuth();

 const handleLogout = () => {
  logout();
  navigate("/login");
};

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <AppBar
      position="sticky"
      elevation={3}
    >
      <Toolbar>

        <DirectionsBusFilledIcon
          sx={{
            fontSize: 34,
            mr: 1,
          }}
        />

        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            flexGrow: 1,
          }}
        >
          Smart Bus Booking
        </Typography>

        

       {/* Guest Navigation */}

{!user && (
  <>
    <Button
      color="inherit"
      component={Link}
      to="/"
    >
      Home
    </Button>

    <Button
      color="inherit"
      component={Link}
      to="/login"
    >
      User Login
    </Button>

    <Button
      color="inherit"
      component={Link}
      to="/register"
    >
      Sign Up
    </Button>

    <Button
      color="inherit"
      component={Link}
      to="/admin/login"
    >
      Admin Login
    </Button>
  </>
)}

{/* User Navigation */}

{user?.role === "user" && (
  <>
    <Button
      color="inherit"
      component={Link}
      to="/"
    >
      Home
    </Button>

    <Button
      color="inherit"
      component={Link}
      to="/my-bookings"
    >
      My Bookings
    </Button>
  </>
)}

{/* Admin Navigation */}

{user?.role === "admin" && (
  <Button
    color="inherit"
    component={Link}
    to="/admin"
  >
    Dashboard
  </Button>
)}

      

        {user && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              ml: 4,
              gap: 2,
            }}
          >
            <Avatar
              sx={{
                bgcolor: "secondary.main",
              }}
            >
             {(user?.firstName || user?.name || "?")
  .charAt(0)
  .toUpperCase()}
            </Avatar>

            <Box>
              <Typography
                variant="body2"
                sx={{
                  lineHeight: 1,
                }}
              >
                Welcome
              </Typography>

              <Typography
                fontWeight="bold"
              >
              {user?.firstName || user?.name || "User"}
              </Typography>
            </Box>

            <Button
              variant="contained"
              color="error"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        )}

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;