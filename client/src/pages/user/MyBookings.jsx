import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Button,
  Stack,
  Typography,
} from "@mui/material";

import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";

import MainLayout from "../../components/layout/MainLayout";

import {
  getMyBookings,
  cancelBooking,
} from "../../services/bookingService";

import { toast } from "react-toastify";

const MyBookings = () => {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
  try {
    await cancelBooking(bookingId);

    toast.success("Booking cancelled successfully");

    fetchBookings();

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Unable to cancel booking"
    );
  }
};

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const res = await getMyBookings();

      setBookings(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load bookings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <Container
        maxWidth="lg"
        sx={{
          mt: 5,
          mb: 8,
        }}
      >
        <Typography
          variant="h3"
          align="center"
          fontWeight="bold"
          gutterBottom
        >
          My Bookings
        </Typography>

        {loading ? (
          <Box
            sx={{
              mt: 8,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : bookings.length === 0 ? (
          <Typography
            align="center"
            sx={{ mt: 8 }}
          >
            No bookings found.
          </Typography>
        ) : (
          bookings.map((booking) => (
            <Card
              key={booking._id}
              elevation={5}
              sx={{
                mb: 4,
                borderRadius: 3,
              }}
            >
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                    >
                      <DirectionsBusFilledIcon
                        sx={{
                          mr: 1,
                          verticalAlign: "middle",
                        }}
                      />
                      {booking.schedule.bus.busName}
                    </Typography>

                    <Typography mt={2}>
                      {booking.schedule.route.source}
                      {" → "}
                      {booking.schedule.route.destination}
                    </Typography>

                    <Typography mt={1}>
                      Journey Date :{" "}
                      {new Date(
                        booking.schedule.departureDate
                      ).toLocaleDateString()}
                    </Typography>

                    <Typography mt={1}>
                      Seats :{" "}
                      {booking.seats.join(", ")}
                    </Typography>

                    <Typography mt={1}>
                      Fare : ₹{booking.totalFare}
                    </Typography>
                  </Box>

                  <Box textAlign="right">
                    <Chip
  label={booking.bookingStatus}
  color={
    booking.bookingStatus === "Confirmed"
      ? "success"
      : booking.bookingStatus === "Cancelled"
      ? "error"
      : "warning"
  }
/>

                    <br />

                 <Stack spacing={2}>

  <Button
    variant="contained"
    onClick={() =>
      navigate(`/ticket/${booking._id}`)
    }
    disabled={
      booking.bookingStatus === "Cancelled"
    }
  >
    View Ticket
  </Button>

  <Button
    variant="outlined"
    color="error"
    disabled={
      booking.bookingStatus === "Cancelled"
    }
    onClick={() =>
      handleCancelBooking(booking._id)
    }
  >
    Cancel Booking
  </Button>

</Stack>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))
        )}
      </Container>
    </MainLayout>
  );
};

export default MyBookings;