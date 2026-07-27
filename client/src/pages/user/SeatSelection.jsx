import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";

import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

import MainLayout from "../../components/layout/MainLayout";

import SeatLayout from "../../components/seat/SeatLayout";
import BookingCard from "../../components/booking/BookingCard";

import { getScheduleById } from "../../services/scheduleService";
import { createBooking } from "../../services/bookingService";

const SeatSelection = () => {
  const { id } = useParams();

  const [schedule, setSchedule] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    fetchSchedule();
  }, [id]);

  const fetchSchedule = async () => {
    try {
      const res = await getScheduleById(id);
      setSchedule(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load schedule.");
    }
  };

  const toggleSeat = (seat) => {
    if (seat.isBooked) return;

    if (selectedSeats.includes(seat.seatNumber)) {
      setSelectedSeats((prev) =>
        prev.filter((s) => s !== seat.seatNumber)
      );
    } else {
      setSelectedSeats((prev) => [
        ...prev,
        seat.seatNumber,
      ]);
    }
  };

  const bookSeats = async () => {
    try {
      await createBooking({
        scheduleId: id,
        seats: selectedSeats,
      });

      toast.success("🎉 Booking Successful!");

      setSelectedSeats([]);

      fetchSchedule();

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Booking Failed"
      );
    }
  };

  return (
    <MainLayout>
      {!schedule ? (
        <Box
          display="flex"
          justifyContent="center"
          mt={10}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Container
          maxWidth="xl"
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
            {schedule.bus.busName}
          </Typography>

          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            mb={5}
          >
            {schedule.route.source}
            {"  →  "}
            {schedule.route.destination}
          </Typography>

          <Grid
            container
            spacing={4}
          >
            <Grid
              item
              xs={12}
              md={8}
            >
              <SeatLayout
                seats={schedule.seats}
                selectedSeats={selectedSeats}
                onSeatClick={toggleSeat}
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
            >
              <BookingCard
                selectedSeats={selectedSeats}
                fare={schedule.fare}
                onBook={bookSeats}
              />
            </Grid>
          </Grid>
        </Container>
      )}
    </MainLayout>
  );
};

export default SeatSelection;