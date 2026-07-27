import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import RouteIcon from "@mui/icons-material/Route";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import GroupIcon from "@mui/icons-material/Group";

import { Link, useLocation } from "react-router-dom";

const drawerWidth = 250;

const menuItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/admin",
  },
  {
    text: "Bus Management",
    icon: <DirectionsBusIcon />,
    path: "/admin/buses",
  },
  {
    text: "Route Management",
    icon: <RouteIcon />,
    path: "/admin/routes",
  },
  {
    text: "Schedule Management",
    icon: <EventSeatIcon />,
    path: "/admin/schedules",
  },
  {
    text: "Booking Management",
    icon: <BookOnlineIcon />,
    path: "/admin/bookings",
  },
  {
    text: "User Management",
    icon: <GroupIcon />,
    path: "/admin/users",
  },
];

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />

      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>

            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default AdminSidebar;