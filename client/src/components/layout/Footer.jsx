import {
  Box,
  Container,
  Typography,
} from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#1976d2",
        color: "white",
        mt: 8,
        py: 3,
      }}
    >
      <Container maxWidth="lg">

        <Typography
          align="center"
          variant="body1"
        >
          © 2026 Smart Bus Booking System
        </Typography>

        <Typography
          align="center"
          variant="body2"
          sx={{ opacity: 0.8 }}
        >
          Built with React, Node.js, Express & MongoDB
        </Typography>

      </Container>
    </Box>
  );
};

export default Footer;