import { useEffect, useState } from "react";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Chip,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import RouteIcon from "@mui/icons-material/Route";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import PaymentsIcon from "@mui/icons-material/Payments";

import AdminLayout from "../../components/admin/AdminLayout";

import { getDashboardStats } from "../../services/adminService";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboardStats();

      setStats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!stats) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        mt={10}
      >
        <CircularProgress />
      </Box>
    );
  }

  const cards = [
    {
      title: "Users",
      value: stats.totalUsers,
      icon: <PeopleIcon fontSize="large" />,
    },
    {
      title: "Buses",
      value: stats.totalBuses,
      icon: <DirectionsBusIcon fontSize="large" />,
    },
    {
      title: "Routes",
      value: stats.totalRoutes,
      icon: <RouteIcon fontSize="large" />,
    },
    {
      title: "Schedules",
      value: stats.totalSchedules,
      icon: <EventSeatIcon fontSize="large" />,
    },
    {
      title: "Bookings",
      value: stats.totalBookings,
      icon: <BookOnlineIcon fontSize="large" />,
    },
    {
      title: "Revenue",
      value: `₹${stats.totalRevenue}`,
      icon: <PaymentsIcon fontSize="large" />,
    },
  ];

  return (
    <AdminLayout>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
      >
        Dashboard
      </Typography>

      <Grid
        container
        spacing={3}
      >
        {cards.map((card) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={card.title}
          >
            <Card elevation={5}>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography
                      color="text.secondary"
                    >
                      {card.title}
                    </Typography>

                    <Typography
                      variant="h4"
                      fontWeight="bold"
                    >
                      {card.value}
                    </Typography>
                  </Box>

                  {card.icon}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box mt={6}>
  <Typography
    variant="h5"
    fontWeight="bold"
    gutterBottom
  >
    Recent Bookings
  </Typography>

  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>User</TableCell>

          <TableCell>Route</TableCell>

          <TableCell>Seats</TableCell>

          <TableCell>Total Fare</TableCell>

          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {stats.recentBookings.map((booking) => (
          <TableRow key={booking._id}>
            <TableCell>
              {booking.user.firstName}{" "}
              {booking.user.lastName}
            </TableCell>

            <TableCell>
              {booking.schedule.route.source}
              {" → "}
              {booking.schedule.route.destination}
            </TableCell>

            <TableCell>
              {booking.seats.join(", ")}
            </TableCell>

            <TableCell>
              ₹{booking.totalFare}
            </TableCell>

            <TableCell>
              <Chip
                label={booking.bookingStatus}
                color={
                  booking.bookingStatus ===
                  "Confirmed"
                    ? "success"
                    : "error"
                }
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
</Box>

<Box mt={6}>
  <Typography
    variant="h5"
    fontWeight="bold"
    gutterBottom
  >
    Recent Users
  </Typography>

  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>

          <TableCell>Email</TableCell>

          <TableCell>Phone</TableCell>

          <TableCell>Role</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {stats.recentUsers.map((user) => (
          <TableRow key={user._id}>
            <TableCell>
              {user.firstName} {user.lastName}
            </TableCell>

            <TableCell>
              {user.email}
            </TableCell>

            <TableCell>
              {user.phone}
            </TableCell>

            <TableCell>
              <Chip
                label={user.role}
                color={
                  user.role === "admin"
                    ? "primary"
                    : "secondary"
                }
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
</Box>
    </AdminLayout>
  );
};

export default Dashboard;