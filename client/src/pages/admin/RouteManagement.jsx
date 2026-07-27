import { useEffect, useState } from "react";

import {
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { toast } from "react-toastify";

import AdminLayout from "../../components/admin/AdminLayout";

import {
  getAllRoutes,
  createRoute,
  updateRoute,
  deleteRoute,
} from "../../services/routeService";

import RouteTable from "../../components/admin/route/RouteTable";
import RouteFormDialog from "../../components/admin/route/RouteFormDialog";
import DeleteRouteDialog from "../../components/admin/route/DeleteRouteDialog";

const RouteManagement = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRoute, setEditingRoute] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  const [selectedRoute, setSelectedRoute] =
    useState(null);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      setLoading(true);

      const res = await getAllRoutes();

      setRoutes(res.data);
    } catch (err) {
      console.error(err);

      toast.error("Unable to fetch routes");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data) => {
    try {
      if (editingRoute) {
        await updateRoute(editingRoute._id, data);

        toast.success("Route updated successfully");
      } else {
        await createRoute(data);

        toast.success("Route created successfully");
      }

      setDialogOpen(false);
      setEditingRoute(null);

      fetchRoutes();
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
      await deleteRoute(selectedRoute._id);

      toast.success("Route deleted successfully");

      setDeleteDialogOpen(false);
      setSelectedRoute(null);

      fetchRoutes();
    } catch (err) {
      console.error(err);

      toast.error("Delete failed");
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
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
        >
          Route Management
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditingRoute(null);
            setDialogOpen(true);
          }}
        >
          Add Route
        </Button>
      </Box>

      <RouteTable
        routes={routes}
        onEdit={(route) => {
          setEditingRoute(route);
          setDialogOpen(true);
        }}
        onDelete={(route) => {
          setSelectedRoute(route);
          setDeleteDialogOpen(true);
        }}
      />

      <RouteFormDialog
        open={dialogOpen}
        editingRoute={editingRoute}
        onClose={() => {
          setDialogOpen(false);
          setEditingRoute(null);
        }}
        onSave={handleSave}
      />

      <DeleteRouteDialog
        open={deleteDialogOpen}
        route={selectedRoute}
        onClose={() => {
          setDeleteDialogOpen(false);
          setSelectedRoute(null);
        }}
        onConfirm={handleDelete}
      />
    </AdminLayout>
  );
};

export default RouteManagement;