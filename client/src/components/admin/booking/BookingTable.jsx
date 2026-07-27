import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import CancelIcon from "@mui/icons-material/Cancel";

const BookingTable = ({
  bookings,
  onView,
  onCancel,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>

        <TableHead>

          <TableRow>

            <TableCell><strong>Passenger</strong></TableCell>

            <TableCell><strong>Bus</strong></TableCell>

            <TableCell><strong>Route</strong></TableCell>

            <TableCell><strong>Journey Date</strong></TableCell>

            <TableCell><strong>Seats</strong></TableCell>

            <TableCell><strong>Fare</strong></TableCell>

            <TableCell><strong>Payment</strong></TableCell>

            <TableCell><strong>Status</strong></TableCell>

            <TableCell align="center">
              <strong>Actions</strong>
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {bookings.length === 0 ? (

            <TableRow>

              <TableCell
                colSpan={9}
                align="center"
              >
                No Bookings Found
              </TableCell>

            </TableRow>

          ) : (

            bookings.map((booking) => (

              <TableRow
                hover
                key={booking._id}
              >

                <TableCell>

                  {booking.user?.firstName}{" "}
                  {booking.user?.lastName}

                </TableCell>

                <TableCell>

                  {booking.schedule?.bus?.busName}

                  <br />

                  <small>

                    {booking.schedule?.bus?.busNumber}

                  </small>

                </TableCell>

                <TableCell>

                  {booking.schedule?.route?.source}

                  <br />

                  ↓

                  <br />

                  {booking.schedule?.route?.destination}

                </TableCell>

                <TableCell>

                  {new Date(
                    booking.schedule?.departureDate
                  ).toLocaleDateString()}

                </TableCell>

                <TableCell>

                  {booking.seats.join(", ")}

                </TableCell>

                <TableCell>

                  ₹{booking.totalFare}

                </TableCell>

                <TableCell>

                  <Chip
                    size="small"
                    color={
                      booking.paymentStatus === "Paid"
                        ? "success"
                        : booking.paymentStatus === "Failed"
                        ? "error"
                        : "warning"
                    }
                    label={booking.paymentStatus}
                  />

                </TableCell>

                <TableCell>

                  <Chip
                    size="small"
                    color={
                      booking.bookingStatus === "Confirmed"
                        ? "success"
                        : booking.bookingStatus === "Cancelled"
                        ? "error"
                        : "warning"
                    }
                    label={booking.bookingStatus}
                  />

                </TableCell>

                <TableCell align="center">

                  <Tooltip title="View Details">

                    <IconButton
                      color="primary"
                      onClick={() =>
                        onView(booking)
                      }
                    >
                      <VisibilityIcon />
                    </IconButton>

                  </Tooltip>

                  {booking.bookingStatus ===
                    "Confirmed" && (

                    <Tooltip title="Cancel Booking">

                      <IconButton
                        color="error"
                        onClick={() =>
                          onCancel(booking)
                        }
                      >
                        <CancelIcon />
                      </IconButton>

                    </Tooltip>

                  )}

                </TableCell>

              </TableRow>

            ))

          )}

        </TableBody>

      </Table>
    </TableContainer>
  );
};

export default BookingTable;