import Grid from "@mui/material/Grid";

import Seat from "./Seat";

const SeatLayout = ({
  seats,
  selectedSeats,
  onSeatClick,
}) => {

  return (

    <Grid container spacing={2}>

      {seats.map((seat) => (

        <Grid
          item
          xs={3}
          key={seat.seatNumber}
        >

          <Seat

            seat={seat}

            selected={selectedSeats.includes(seat.seatNumber)}

            onSelect={onSeatClick}

          />

        </Grid>

      ))}

    </Grid>

  );

};

export default SeatLayout;