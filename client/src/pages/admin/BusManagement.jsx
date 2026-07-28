import { useEffect, useState } from "react";

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { toast } from "react-toastify";

import AdminLayout from "../../components/admin/AdminLayout";

import {
  getAllBuses,
  createBus,
  updateBus,
  deleteBus,
} from "../../services/busService";

import BusTable from "../../components/admin/bus/BusTable";
import BusFormDialog from "../../components/admin/bus/BusFormDialog";
import DeleteBusDialog from "../../components/admin/bus/DeleteBusDialog";

const BusManagement = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBus, setEditingBus] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  const [selectedBus, setSelectedBus] =
    useState(null);

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      setLoading(true);

      const res = await getAllBuses();

      setBuses(res.data);
    } catch (err) {
      console.error(err);

      toast.error("Unable to fetch buses");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data) => {
    try {
      if (editingBus) {
        await updateBus(
          editingBus._id,
          data
        );

        toast.success(
          "Bus updated successfully"
        );
      } else {
        await createBus(data);

        toast.success(
          "Bus created successfully"
        );
      }

      setDialogOpen(false);
      setEditingBus(null);

      fetchBuses();
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Operation failed"
      );
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBus(selectedBus._id);

      toast.success(
        "Bus deleted successfully"
      );

      setDeleteDialogOpen(false);
      setSelectedBus(null);

      fetchBuses();
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Delete failed"
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
            Bus Management
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setEditingBus(null);
              setDialogOpen(true);
            }}
          >
            Add Bus
          </Button>
        </Stack>

        <BusTable
          buses={buses}
          onEdit={(bus) => {
            setEditingBus(bus);
            setDialogOpen(true);
          }}
          onDelete={(bus) => {
            setSelectedBus(bus);
            setDeleteDialogOpen(true);
          }}
        />

        <BusFormDialog
          open={dialogOpen}
          editingBus={editingBus}
          onClose={() => {
            setDialogOpen(false);
            setEditingBus(null);
          }}
          onSave={handleSave}
        />

        <DeleteBusDialog
          open={deleteDialogOpen}
          bus={selectedBus}
          onClose={() => {
            setDeleteDialogOpen(false);
            setSelectedBus(null);
          }}
          onConfirm={handleDelete}
        />

      </Container>
    </AdminLayout>
  );
};

export default BusManagement;