import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const DeleteScheduleDialog = ({
  open,
  schedule,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        Delete Schedule
      </DialogTitle>

      <DialogContent>

        <DialogContentText>

          Delete schedule for

          <strong>

            {" "}

            {schedule?.route?.source}

            {" → "}

            {schedule?.route?.destination}

          </strong>

          ?

        </DialogContentText>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={onConfirm}
        >
          Delete
        </Button>

      </DialogActions>

    </Dialog>
  );
};

export default DeleteScheduleDialog;