import {
  Card,
  CardContent,
  Typography,
  Divider,
  Button,
  Stack,
} from "@mui/material";

const BookingCard = ({
  selectedSeats,
  fare,
  onBook,
}) => {
  const total = selectedSeats.length * fare;

  return (
    <Card
      elevation={4}
      sx={{
        borderRadius: 3,
      }}
    >
      <CardContent>

        <Typography
          variant="h5"
          gutterBottom
          fontWeight="bold"
        >
          Booking Summary
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography
          variant="subtitle1"
          gutterBottom
        >
          Selected Seats
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          mb={3}
        >
          {selectedSeats.length === 0 ? (
            <Typography color="text.secondary">
              No seats selected
            </Typography>
          ) : (
            selectedSeats.map((seat) => (
              <Button
                key={seat}
                variant="contained"
                color="success"
                size="small"
              >
                {seat}
              </Button>
            ))
          )}
        </Stack>

        <Divider sx={{ mb: 2 }} />

        <Typography>
          Fare / Seat
        </Typography>

        <Typography
          variant="h6"
          mb={2}
        >
          ₹{fare}
        </Typography>

        <Typography>
          Total
        </Typography>

        <Typography
          variant="h4"
          color="primary"
          fontWeight="bold"
        >
          ₹{total}
        </Typography>

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 4,
            py: 1.5,
          }}
          disabled={selectedSeats.length === 0}
          onClick={onBook}
        >
          Book Now
        </Button>

      </CardContent>
    </Card>
  );
};

export default BookingCard;