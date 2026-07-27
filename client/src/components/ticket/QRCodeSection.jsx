import { Box, Typography } from "@mui/material";
import QRCode from "react-qr-code";

const QRCodeSection = ({ booking }) => {
  const qrValue = JSON.stringify({
    bookingId: booking._id,
    passenger: booking.user.name,
    bus: booking.schedule.bus.busName,
    source: booking.schedule.route.source,
    destination: booking.schedule.route.destination,
    seats: booking.seats,
    journeyDate: booking.schedule.departureDate,
  });

  return (
    <Box
      sx={{
        mt: 5,
        textAlign: "center",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
      >
        Scan QR Code
      </Typography>

      <QRCode
        value={qrValue}
        size={180}
      />
    </Box>
  );
};

export default QRCodeSection;