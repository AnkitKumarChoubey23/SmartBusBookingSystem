import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";

import { getAllBuses } from "../../../services/busService";
import { getAllRoutes } from "../../../services/routeService";

const initialState = {
  bus: "",
  route: "",
  departureDate: "",
  departureTime: "",
  arrivalDate: "",
  arrivalTime: "",
  fare: "",
};

const ScheduleFormDialog = ({
  open,
  onClose,
  onSave,
  editingSchedule,
}) => {
  const [formData, setFormData] =
    useState(initialState);

  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    loadDropdowns();
  }, []);

  useEffect(() => {
    if (editingSchedule) {
      setFormData({
        bus: editingSchedule.bus._id,
        route: editingSchedule.route._id,
        departureDate:
          editingSchedule.departureDate
            ?.substring(0, 10),

        departureTime:
          editingSchedule.departureTime,

        arrivalDate:
          editingSchedule.arrivalDate
            ?.substring(0, 10),

        arrivalTime:
          editingSchedule.arrivalTime,

        fare: editingSchedule.fare,
      });
    } else {
      setFormData(initialState);
    }
  }, [editingSchedule]);

  const loadDropdowns = async () => {
    try {
      const busRes = await getAllBuses();
      const routeRes = await getAllRoutes();

      setBuses(busRes.data);
      setRoutes(routeRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>

        {editingSchedule
          ? "Edit Schedule"
          : "Create Schedule"}

      </DialogTitle>

      <DialogContent dividers>

        <Grid container spacing={2}>

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Bus"
              name="bus"
              value={formData.bus}
              onChange={handleChange}
            >
              {buses.map((bus) => (
                <MenuItem
                  key={bus._id}
                  value={bus._id}
                >
                  {bus.busName}
                  {" - "}
                  {bus.busNumber}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Route"
              name="route"
              value={formData.route}
              onChange={handleChange}
            >
              {routes.map((route) => (
                <MenuItem
                  key={route._id}
                  value={route._id}
                >
                  {route.source}
                  {" → "}
                  {route.destination}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              type="date"
              label="Departure Date"
              name="departureDate"
              InputLabelProps={{
                shrink: true,
              }}
              value={
                formData.departureDate
              }
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              type="time"
              label="Departure Time"
              name="departureTime"
              InputLabelProps={{
                shrink: true,
              }}
              value={
                formData.departureTime
              }
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              type="date"
              label="Arrival Date"
              name="arrivalDate"
              InputLabelProps={{
                shrink: true,
              }}
              value={
                formData.arrivalDate
              }
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              type="time"
              label="Arrival Time"
              name="arrivalTime"
              InputLabelProps={{
                shrink: true,
              }}
              value={
                formData.arrivalTime
              }
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              label="Fare"
              name="fare"
              value={formData.fare}
              onChange={handleChange}
            />
          </Grid>

        </Grid>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          Save
        </Button>

      </DialogActions>

    </Dialog>
  );
};

export default ScheduleFormDialog;