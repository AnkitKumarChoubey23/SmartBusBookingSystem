import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Home from "./pages/user/Home";
import SearchResults from "./pages/user/SearchResults";
import SeatSelection from "./pages/user/SeatSelection";
import MyBookings from "./pages/user/MyBookings";
import Ticket from "./pages/user/Ticket";


import ProtectedRoute from "./components/common/ProtectedRoute";
import Dashboard from "./pages/admin/Dashboard";
import AdminRoute from "./components/common/AdminRoute";
import AdminLogin from "./pages/admin/AdminLogin";
import BusManagement from "./pages/admin/BusManagement";
import RouteManagement from "./pages/admin/RouteManagement";
import ScheduleManagement from "./pages/admin/ScheduleManagement";
import BookingManagement from "./pages/admin/BookingManagement";
import UserManagement from "./pages/admin/UserManagement";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyOTP from "./pages/auth/VerifyOTP";
import ResetPassword from "./pages/auth/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}

        <Route
          path="/login"
          element={<Login />}
        />
        <Route
  path="/admin/login"
  element={<AdminLogin />}
/>

        <Route
          path="/register"
          element={<Register />}
        />
        <Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

<Route
  path="/verify-reset-otp"
  element={<VerifyOTP />}
/>

<Route
  path="/reset-password"
  element={<ResetPassword />}
/>

        {/* Protected Routes */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchResults />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seat-selection/:id"
          element={
            <ProtectedRoute>
              <SeatSelection />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ticket/:id"
          element={
            <ProtectedRoute>
              <Ticket />
            </ProtectedRoute>
          }
        />
        <Route
  path="/admin"
  element={
    <AdminRoute>
      <Dashboard />
    </AdminRoute>
  }
/>
<Route
  path="/admin/buses"
  element={
    <AdminRoute>
      <BusManagement />
    </AdminRoute>
  }
/>
<Route
  path="/admin/routes"
  element={
    <AdminRoute>
      <RouteManagement />
    </AdminRoute>
  }
/>
<Route
  path="/admin/schedules"
  element={
    <AdminRoute>
      <ScheduleManagement />
    </AdminRoute>
  }
/>
<Route
  path="/admin/bookings"
  element={
    <AdminRoute>
      <BookingManagement />
    </AdminRoute>
  }
/>
<Route
  path="/admin/users"
  element={
    <AdminRoute>
      <UserManagement />
    </AdminRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;