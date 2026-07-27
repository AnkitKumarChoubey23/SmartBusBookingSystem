import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  FormControlLabel,
  Switch,
} from "@mui/material";

const initialState = {
  source: "",
  destination: "",
  distance: "",
  estimatedDuration: "",
  boardingPoints: "",
  droppingPoints: "",
  isActive: true,
};

const RouteFormDialog = ({
  open,
  onClose,
  onSave,
  editingRoute,
}) => {
  const [formData, setFormData] =
    useState(initialState);

  useEffect(() => {
    if (editingRoute) {
      setFormData({
        ...editingRoute,
        boardingPoints:
          editingRoute.boardingPoints.join(", "),
        droppingPoints:
          editingRoute.droppingPoints.join(", "),
      });
    } else {
      setFormData(initialState);
    }
  }, [editingRoute]);

  const handleChange = (e) => {
    const { name, value, checked } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "isActive"
          ? checked
          : value,
    }));
  };

  const handleSubmit = () => {
    onSave({
      ...formData,
      boardingPoints:
        formData.boardingPoints
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean),

      droppingPoints:
        formData.droppingPoints
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean),
    });
  };

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        {editingRoute
          ? "Edit Route"
          : "Add Route"}
      </DialogTitle>

      <DialogContent dividers>

        <Grid container spacing={2}>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Source"
              name="source"
              value={formData.source}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="Distance (KM)"
              name="distance"
              value={formData.distance}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Estimated Duration"
              name="estimatedDuration"
              value={
                formData.estimatedDuration
              }
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Boarding Points"
              helperText="Comma separated"
              name="boardingPoints"
              value={
                formData.boardingPoints
              }
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Dropping Points"
              helperText="Comma separated"
              name="droppingPoints"
              value={
                formData.droppingPoints
              }
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={
                    formData.isActive
                  }
                  name="isActive"
                  onChange={
                    handleChange
                  }
                />
              }
              label="Active Route"
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

export default RouteFormDialog;