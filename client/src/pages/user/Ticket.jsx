import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";

import MainLayout from "../../components/layout/MainLayout";
import QRCodeSection from "../../components/ticket/QRCodeSection";
import TicketActions from "../../components/ticket/TicketActions";

import {
  getBookingById,
  downloadTicket,
} from "../../services/bookingService";

import { toast } from "react-toastify";

const Ticket = () => {
  const { id } = useParams();

  const [booking, setBooking] = useState(null);

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const fetchTicket = async () => {
    try {
      const res = await getBookingById(id);

      setBooking(res.data);
    } catch (error) {
      console.error(error);

      toast.error("Unable to load ticket");
    }
  };

  const handleDownload = async () => {
    try {
      const response = await downloadTicket(id);

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        `Ticket-${id}.pdf`
      );

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);

      toast.error("Unable to download ticket");
    }
  };

  const emailTicket = () => {
    toast.info("Ticket has already been emailed after booking.");
  };

  if (!booking) {
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

  return (
    <MainLayout>
      <Container
        maxWidth="md"
        sx={{
          mt: 5,
          mb: 8,
        }}
      >
        <Card elevation={6}>
          <CardContent>

            <Typography
              variant="h4"
              align="center"
              fontWeight="bold"
              gutterBottom
            >
              <DirectionsBusFilledIcon
                sx={{
                  mr: 1,
                  verticalAlign: "middle",
                }}
              />

              Smart Bus Ticket
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2}>

              <Grid item xs={6}>
                <Typography fontWeight="bold">
                  Passenger
                </Typography>

                <Typography>
                  {booking.user.firstName}{" "}
                  {booking.user.lastName}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography fontWeight="bold">
                  Email
                </Typography>

                <Typography>
                  {booking.user.email}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography fontWeight="bold">
                  Bus
                </Typography>

                <Typography>
                  {booking.schedule.bus.busName}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography fontWeight="bold">
                  Bus Number
                </Typography>

                <Typography>
                  {booking.schedule.bus.busNumber}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography fontWeight="bold">
                  Source
                </Typography>

                <Typography>
                  {booking.schedule.route.source}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography fontWeight="bold">
                  Destination
                </Typography>

                <Typography>
                  {booking.schedule.route.destination}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography fontWeight="bold">
                  Journey Date
                </Typography>

                <Typography>
                  {new Date(
                    booking.schedule.departureDate
                  ).toLocaleDateString()}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography fontWeight="bold">
                  Departure Time
                </Typography>

                <Typography>
                  {booking.schedule.departureTime}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography fontWeight="bold">
                  Arrival Date
                </Typography>

                <Typography>
                  {new Date(
                    booking.schedule.arrivalDate
                  ).toLocaleDateString()}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography fontWeight="bold">
                  Arrival Time
                </Typography>

                <Typography>
                  {booking.schedule.arrivalTime}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography fontWeight="bold">
                  Seats
                </Typography>

                <Typography>
                  {booking.seats.join(", ")}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography fontWeight="bold">
                  Fare
                </Typography>

                <Typography>
                  ₹{booking.totalFare}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography fontWeight="bold">
                  Payment Status
                </Typography>

                <Chip
                  label={booking.paymentStatus}
                  color={
                    booking.paymentStatus === "Paid"
                      ? "success"
                      : booking.paymentStatus === "Pending"
                      ? "warning"
                      : "error"
                  }
                />
              </Grid>

              <Grid item xs={6}>
                <Typography fontWeight="bold">
                  Booking Status
                </Typography>

                <Chip
                  label={booking.bookingStatus}
                  color={
                    booking.bookingStatus === "Confirmed"
                      ? "success"
                      : booking.bookingStatus === "Pending"
                      ? "warning"
                      : "error"
                  }
                />
              </Grid>

            </Grid>

            <QRCodeSection booking={booking} />

            <TicketActions
              onDownload={handleDownload}
              onEmail={emailTicket}
            />

          </CardContent>
        </Card>
      </Container>
    </MainLayout>
  );
};

export default Ticket;