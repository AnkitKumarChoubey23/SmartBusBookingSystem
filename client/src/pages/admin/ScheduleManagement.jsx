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
  getAllSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "../../services/scheduleService";

import ScheduleTable from "../../components/admin/schedule/ScheduleTable";
import ScheduleFormDialog from "../../components/admin/schedule/ScheduleFormDialog";
import DeleteScheduleDialog from "../../components/admin/schedule/DeleteScheduleDialog";

const ScheduleManagement = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  const [selectedSchedule, setSelectedSchedule] =
    useState(null);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      setLoading(true);

      const res = await getAllSchedules();

      setSchedules(res.data);
    } catch (err) {
      console.error(err);

      toast.error("Unable to fetch schedules");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data) => {
    try {
      if (editingSchedule) {
        await updateSchedule(
          editingSchedule._id,
          data
        );

        toast.success(
          "Schedule updated successfully"
        );
      } else {
        await createSchedule(data);

        toast.success(
          "Schedule created successfully"
        );
      }

      setDialogOpen(false);
      setEditingSchedule(null);

      fetchSchedules();
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
      await deleteSchedule(
        selectedSchedule._id
      );

      toast.success(
        "Schedule deleted successfully"
      );

      setDeleteDialogOpen(false);
      setSelectedSchedule(null);

      fetchSchedules();
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
            Schedule Management
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setEditingSchedule(null);
              setDialogOpen(true);
            }}
          >
            Add Schedule
          </Button>
        </Stack>

        <ScheduleTable
          schedules={schedules}
          onEdit={(schedule) => {
            setEditingSchedule(schedule);
            setDialogOpen(true);
          }}
          onDelete={(schedule) => {
            setSelectedSchedule(schedule);
            setDeleteDialogOpen(true);
          }}
        />

        <ScheduleFormDialog
          open={dialogOpen}
          editingSchedule={editingSchedule}
          onClose={() => {
            setDialogOpen(false);
            setEditingSchedule(null);
          }}
          onSave={handleSave}
        />

        <DeleteScheduleDialog
          open={deleteDialogOpen}
          schedule={selectedSchedule}
          onClose={() => {
            setDeleteDialogOpen(false);
            setSelectedSchedule(null);
          }}
          onConfirm={handleDelete}
        />

      </Container>
    </AdminLayout>
  );
};

export default ScheduleManagement;