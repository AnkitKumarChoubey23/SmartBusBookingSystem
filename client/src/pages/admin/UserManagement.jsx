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
  getAllUsers,
  toggleUserStatus,
} from "../../services/userService";

import UserTable from "../../components/admin/user/UserTable";
import UserDetailsDialog from "../../components/admin/user/UserDetailsDialog";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [selectedUser, setSelectedUser] =
    useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {

      setLoading(true);

      const res = await getAllUsers();

      setUsers(res.data);

    } catch (err) {

      console.error(err);

      toast.error(
        "Unable to fetch users"
      );

    } finally {

      setLoading(false);

    }
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  const handleToggle = async (user) => {
    try {

      await toggleUserStatus(user._id);

      toast.success(
        "User status updated"
      );

      fetchUsers();

    } catch (err) {

      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Operation failed"
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
            User Management
          </Typography>

          <Typography
            color="text.secondary"
          >
            Total Users : {users.length}
          </Typography>

        </Stack>

        <UserTable
          users={users}
          onView={handleView}
          onToggleStatus={handleToggle}
        />

        <UserDetailsDialog
          open={dialogOpen}
          user={selectedUser}
          onClose={() => {
            setDialogOpen(false);
            setSelectedUser(null);
          }}
        />

      </Container>

    </AdminLayout>
  );
};

export default UserManagement;