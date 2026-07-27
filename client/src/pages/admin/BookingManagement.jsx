import { useEffect, useState } from "react";

import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import { toast } from "react-toastify";

import AdminLayout from "../../components/admin/AdminLayout";

import {
  getAllBookings,
  cancelBooking,
} from "../../services/bookingService";

import BookingTable from "../../components/admin/booking/BookingTable";
import BookingDetailsDialog from "../../components/admin/booking/BookingDetailsDialog";

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [detailsOpen, setDetailsOpen] =
    useState(false);

  const [selectedBooking, setSelectedBooking] =
    useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const res = await getAllBookings();

      setBookings(res.data);

    } catch (err) {

      console.error(err);

      toast.error(
        err.response?.data?.message ||
        "Unable to fetch bookings"
      );

    } finally {

      setLoading(false);

    }
  };

  const handleView = (booking) => {
    setSelectedBooking(booking);
    setDetailsOpen(true);
  };

  const handleCancel = async (booking) => {

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    try {

      await cancelBooking(booking._id);

      toast.success(
        "Booking cancelled successfully"
      );

      fetchBookings();

    } catch (err) {

      console.error(err);

      toast.error(
        err.response?.data?.message ||
        "Unable to cancel booking"
      );

    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        mt={10}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <AdminLayout>

      <Container maxWidth="xl">

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >

          <Typography
            variant="h4"
            fontWeight="bold"
          >
            Booking Management
          </Typography>

          <Typography
            color="text.secondary"
          >
            Total Bookings : {bookings.length}
          </Typography>

        </Stack>

        <BookingTable
          bookings={bookings}
          onView={handleView}
          onCancel={handleCancel}
        />

        <BookingDetailsDialog
          open={detailsOpen}
          booking={selectedBooking}
          onClose={() => {
            setDetailsOpen(false);
            setSelectedBooking(null);
          }}
        />

      </Container>

    </AdminLayout>
  );
};

export default BookingManagement;