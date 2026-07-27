import { useEffect, useState } from "react";

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { toast } from "react-toastify";

import AdminLayout from "../../components/admin/AdminLayout";

import BusTable from "../../components/admin/bus/BusTable";
import BusFormDialog from "../../components/admin/bus/BusFormDialog";
import DeleteBusDialog from "../../components/admin/bus/DeleteBusDialog";

import {
  getAllBuses,
  createBus,
  updateBus,
  deleteBus,
} from "../../services/busService";

const BusManagement = () => {
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBus, setEditingBus] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);

  useEffect(() => {
    fetchBuses();
  }, []);

  useEffect(() => {
    setFilteredBuses(
      buses.filter((bus) =>
        `${bus.busName} ${bus.busNumber} ${bus.operator}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    );
  }, [search, buses]);

  const fetchBuses = async () => {
    try {
      setLoading(true);

      const res = await getAllBuses();

      setBuses(res.data);
      setFilteredBuses(res.data);
    } catch (err) {
      toast.error("Unable to fetch buses");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (busData) => {
    try {
      if (editingBus) {
        await updateBus(editingBus._id, busData);
        toast.success("Bus updated successfully");
      } else {
        await createBus(busData);
        toast.success("Bus created successfully");
      }

      setDialogOpen(false);
      setEditingBus(null);

      fetchBuses();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Operation failed"
      );
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBus(selectedBus._id);

      toast.success("Bus deleted");

      setDeleteDialogOpen(false);
      setSelectedBus(null);

      fetchBuses();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        mt={8}
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

        <TextField
          fullWidth
          label="Search Bus"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          sx={{ mb: 3 }}
        />

        <BusTable
          buses={filteredBuses}
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
          onClose={() => {
            setDialogOpen(false);
            setEditingBus(null);
          }}
          editingBus={editingBus}
          onSave={handleSave}
        />

        <DeleteBusDialog
          open={deleteDialogOpen}
          bus={selectedBus}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={handleDelete}
        />

      </Container>
    </AdminLayout>
  );
};

export default BusManagement;