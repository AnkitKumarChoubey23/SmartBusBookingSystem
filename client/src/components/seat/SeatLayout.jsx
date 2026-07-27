import {
  Box,
  Grid,
  Typography,
  Paper,
  Stack,
} from "@mui/material";

import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

import Seat from "./Seat";

const SeatLayout = ({
  seats,
  selectedSeats,
  onSeatClick,
}) => {
  // Convert 40 seats into rows of 4
  const rows = [];

  for (let i = 0; i < seats.length; i += 4) {
    rows.push(seats.slice(i, i + 4));
  }

  return (
    <Paper
      elevation={4}
      sx={{
        p: 4,
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        align="center"
      >
        Seat Layout
      </Typography>

      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        mb={3}
      >
        <DirectionsBusIcon />
        <Typography ml={1}>
          Driver
        </Typography>
      </Stack>

      {rows.map((row, index) => (
        <Grid
          container
          key={index}
          alignItems="center"
          sx={{ mb: 2 }}
        >
          {/* Left Side */}
          <Grid item xs={5.5}>
            <Grid container spacing={1}>
              {row.slice(0, 2).map((seat) => (
                <Grid
                  item
                  xs={6}
                  key={seat.seatNumber}
                >
                  <Seat
                    seat={seat}
                    selected={selectedSeats.includes(
                      seat.seatNumber
                    )}
                    onSelect={onSeatClick}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Aisle */}
          <Grid
            item
            xs={1}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: 12,
                height: 2,
              }}
            />
          </Grid>

          {/* Right Side */}
          <Grid item xs={5.5}>
            <Grid container spacing={1}>
              {row.slice(2).map((seat) => (
                <Grid
                  item
                  xs={6}
                  key={seat.seatNumber}
                >
                  <Seat
                    seat={seat}
                    selected={selectedSeats.includes(
                      seat.seatNumber
                    )}
                    onSelect={onSeatClick}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      ))}

      <Box mt={4}>

        <Typography
          variant="h6"
          gutterBottom
        >
          Legend
        </Typography>

        <Stack
          direction="row"
          spacing={3}
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <Box
              sx={{
                width: 20,
                height: 20,
                bgcolor: "#ffffff",
                border: "1px solid grey",
              }}
            />
            <Typography>
              Available
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <Box
              sx={{
                width: 20,
                height: 20,
                bgcolor: "#4caf50",
              }}
            />
            <Typography>
              Selected
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <Box
              sx={{
                width: 20,
                height: 20,
                bgcolor: "#ef5350",
              }}
            />
            <Typography>
              Booked
            </Typography>
          </Stack>
        </Stack>

      </Box>
    </Paper>
  );
};

export default SeatLayout;