import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";

const Seat = ({ seat, selected, onSelect }) => {
  let background = "#ffffff";
  let color = "#000000";

  if (seat.isBooked) {
    background = "#ef5350";
    color = "#ffffff";
  } else if (selected) {
    background = "#4caf50";
    color = "#ffffff";
  }

  return (
    <Card
      sx={{
        backgroundColor: background,
        transition: "0.3s",
        borderRadius: 2,
      }}
    >
      <CardActionArea
        disabled={seat.isBooked}
        onClick={() => onSelect(seat)}
        sx={{
          height: 65,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          fontWeight="bold"
          color={color}
        >
          {seat.seatNumber}
        </Typography>
      </CardActionArea>
    </Card>
  );
};

export default Seat;