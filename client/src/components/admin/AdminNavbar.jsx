import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const drawerWidth = 250;

const AdminNavbar = () => {
  const navigate = useNavigate();

  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,

        ml: `${drawerWidth}px`,
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
        >
          Smart Bus Booking Admin
        </Typography>

        <Typography sx={{ mr: 3 }}>
          {user?.name}
        </Typography>

        <Button
          color="inherit"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;