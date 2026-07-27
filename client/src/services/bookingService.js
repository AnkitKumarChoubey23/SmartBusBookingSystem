import api from "./api";

/* ===================================================
   USER SERVICES
=================================================== */

// Create Booking
export const createBooking = async (bookingData) => {
  const response = await api.post("/bookings", bookingData);
  return response.data;
};

// Get Logged-in User Bookings
export const getMyBookings = async () => {
  const response = await api.get("/bookings/my-bookings");
  return response.data;
};

// Get Booking By ID
export const getBookingById = async (id) => {
  const response = await api.get(`/bookings/${id}`);
  return response.data;
};

// Download Ticket PDF
export const downloadTicket = async (id) => {
  return api.get(`/pdf/${id}`, {
    responseType: "blob",
  });
};

/* ===================================================
   ADMIN SERVICES
=================================================== */

// Get All Bookings
export const getAllBookings = async () => {
  const response = await api.get("/bookings");
  return response.data;
};

// Cancel Booking
export const cancelBooking = async (id) => {
  const response = await api.put(`/bookings/${id}/cancel`);
  return response.data;
};