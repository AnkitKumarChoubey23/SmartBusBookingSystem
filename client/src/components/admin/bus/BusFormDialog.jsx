import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Switch,
} from "@mui/material";

import {
  BUS_TYPES,
  AMENITIES,
} from "./BusConstants";

const initialState = {
  busName: "",
  busNumber: "",
  busType: "",
  operator: "",
  totalSeats: 40,
  amenities: [],
  isActive: true,
};

const BusFormDialog = ({
  open,
  onClose,
  onSave,
  editingBus,
}) => {
  const [formData, setFormData] =
    useState(initialState);

  useEffect(() => {
    if (editingBus) {
      setFormData({
        ...editingBus,
      });
    } else {
      setFormData(initialState);
    }
  }, [editingBus]);

  const handleChange = (e) => {
    const { name, value, checked } =
      e.target;

    if (name === "isActive") {
      setFormData((prev) => ({
        ...prev,
        isActive: checked,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAmenityChange = (
    amenity
  ) => {
    const exists =
      formData.amenities.includes(
        amenity
      );

    setFormData((prev) => ({
      ...prev,
      amenities: exists
        ? prev.amenities.filter(
            (a) => a !== amenity
          )
        : [
            ...prev.amenities,
            amenity,
          ],
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        {editingBus
          ? "Edit Bus"
          : "Add New Bus"}
      </DialogTitle>

      <DialogContent dividers>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={12}
            md={6}
          >
            <TextField
              fullWidth
              label="Bus Name"
              name="busName"
              value={formData.busName}
              onChange={handleChange}
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
          >
            <TextField
              fullWidth
              label="Bus Number"
              name="busNumber"
              value={
                formData.busNumber
              }
              onChange={handleChange}
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
          >
            <FormControl fullWidth>
              <InputLabel>
                Bus Type
              </InputLabel>

              <Select
                name="busType"
                value={
                  formData.busType
                }
                label="Bus Type"
                onChange={
                  handleChange
                }
              >
                {BUS_TYPES.map((type) => (
                  <MenuItem
                    key={type}
                    value={type}
                  >
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
          >
            <TextField
              fullWidth
              label="Operator"
              name="operator"
              value={
                formData.operator
              }
              onChange={handleChange}
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
          >
            <TextField
              fullWidth
              type="number"
              label="Total Seats"
              name="totalSeats"
              value={
                formData.totalSeats
              }
              onChange={handleChange}
            />
          </Grid>

          <Grid
            item
            xs={12}
          >
            <FormGroup row>
              {AMENITIES.map(
                (amenity) => (
                  <FormControlLabel
                    key={amenity}
                    control={
                      <Checkbox
                        checked={formData.amenities.includes(
                          amenity
                        )}
                        onChange={() =>
                          handleAmenityChange(
                            amenity
                          )
                        }
                      />
                    }
                    label={amenity}
                  />
                )
              )}
            </FormGroup>
          </Grid>

          <Grid
            item
            xs={12}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={
                    formData.isActive
                  }
                  onChange={
                    handleChange
                  }
                  name="isActive"
                />
              }
              label="Active Bus"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          {editingBus
            ? "Update"
            : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BusFormDialog;