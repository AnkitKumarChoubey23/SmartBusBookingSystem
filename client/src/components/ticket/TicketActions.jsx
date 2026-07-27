import { Box, Button } from "@mui/material";

const TicketActions = ({
  onDownload,
  onEmail,
}) => {
  return (
    <Box
      sx={{
        mt: 5,
        display: "flex",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Button
        variant="contained"
        onClick={onDownload}
      >
        Download PDF
      </Button>

      <Button
        variant="outlined"
        onClick={onEmail}
      >
        Email Ticket
      </Button>
    </Box>
  );
};

export default TicketActions;