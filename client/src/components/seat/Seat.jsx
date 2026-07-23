import Button from "@mui/material/Button";

const Seat = ({ seat, selected, onSelect }) => {

  let background = "#ffffff";

  if (seat.isBooked) {

    background = "#ef5350";

  } else if (selected) {

    background = "#66bb6a";

  }

  return (

    <Button

      variant="outlined"

      disabled={seat.isBooked}

      onClick={() => onSelect(seat)}

      sx={{
        width: 70,
        height: 60,
        backgroundColor: background,
        color: "#000",
        borderColor: "#999",
        fontWeight: "bold",
        "&:hover": {
          backgroundColor: background,
        },
      }}

    >

      {seat.seatNumber}

    </Button>

  );

};

export default Seat;