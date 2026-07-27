import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
} from "@mui/material";

const BookingDetailsDialog = ({
  open,
  booking,
  onClose,
}) => {
  if (!booking) return null;

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        Booking Details
      </DialogTitle>

      <DialogContent dividers>

        <Grid container spacing={2}>

          <Grid item xs={6}>
            <Typography>

              <strong>Passenger:</strong>

              {" "}

              {booking.user?.firstName}{" "}
              {booking.user?.lastName}

            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography>

              <strong>Email:</strong>

              {" "}

              {booking.user?.email}

            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography>

              <strong>Bus:</strong>

              {" "}

              {booking.schedule?.bus?.busName}

            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography>

              <strong>Route:</strong>

              {" "}

              {booking.schedule?.route?.source}

              {" → "}

              {booking.schedule?.route?.destination}

            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography>

              <strong>Journey Date:</strong>

              {" "}

              {new Date(
                booking.schedule?.departureDate
              ).toLocaleDateString()}

            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography>

              <strong>Departure:</strong>

              {" "}

              {booking.schedule?.departureTime}

            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography>

              <strong>Seats:</strong>

              {" "}

              {booking.seats.join(", ")}

            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography>

              <strong>Total Fare:</strong>

              {" "}

              ₹{booking.totalFare}

            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography>

              <strong>Payment:</strong>

              {" "}

              {booking.paymentStatus}

            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography>

              <strong>Status:</strong>

              {" "}

              {booking.bookingStatus}

            </Typography>
          </Grid>

        </Grid>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Close
        </Button>

      </DialogActions>

    </Dialog>
  );
};

export default BookingDetailsDialog;