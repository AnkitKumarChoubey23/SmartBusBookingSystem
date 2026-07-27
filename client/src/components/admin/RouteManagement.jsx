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

import RouteTable from "../../components/admin/route/RouteTable";
import RouteFormDialog from "../../components/admin/route/RouteFormDialog";
import DeleteRouteDialog from "../../components/admin/route/DeleteRouteDialog";

import {
  getAllRoutes,
  createRoute,
  updateRoute,
  deleteRoute,
} from "../../services/routeService";

const RouteManagement = () => {

  const [routes, setRoutes] = useState([]);

  const [filteredRoutes, setFilteredRoutes] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [editingRoute, setEditingRoute] =
    useState(null);

  const [
    deleteDialogOpen,
    setDeleteDialogOpen,
  ] = useState(false);

  const [selectedRoute, setSelectedRoute] =
    useState(null);

  useEffect(() => {
    fetchRoutes();
  }, []);

  useEffect(() => {

    const filtered = routes.filter((route) =>
      `${route.source}
       ${route.destination}
       ${route.estimatedDuration}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredRoutes(filtered);

  }, [search, routes]);

  const fetchRoutes = async () => {

    try {

      setLoading(true);

      const res = await getAllRoutes();

      setRoutes(res.data);

      setFilteredRoutes(res.data);

    } catch {

      toast.error("Unable to fetch routes");

    } finally {

      setLoading(false);

    }

  };

  const handleSave = async (data) => {

    try {

      if (editingRoute) {

        await updateRoute(
          editingRoute._id,
          data
        );

        toast.success(
          "Route updated successfully"
        );

      } else {

        await createRoute(data);

        toast.success(
          "Route created successfully"
        );

      }

      setDialogOpen(false);

      setEditingRoute(null);

      fetchRoutes();

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
          "Operation failed"
      );

    }

  };

  const handleDelete = async () => {

    try {

      await deleteRoute(
        selectedRoute._id
      );

      toast.success(
        "Route deleted"
      );

      setDeleteDialogOpen(false);

      fetchRoutes();

    } catch {

      toast.error(
        "Delete failed"
      );

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

        </Stack>

        <TextField
          fullWidth
          label="Search Route"
          sx={{ mb: 3 }}
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <RouteTable
          routes={filteredRoutes}
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
          onClose={() =>
            setDialogOpen(false)
          }
          onSave={handleSave}
        />

        <DeleteRouteDialog
          open={deleteDialogOpen}
          route={selectedRoute}
          onClose={() =>
            setDeleteDialogOpen(false)
          }
          onConfirm={handleDelete}
        />

      </Container>

    </AdminLayout>
  );

};

export default RouteManagement;