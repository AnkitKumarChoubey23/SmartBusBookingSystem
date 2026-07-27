import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const DeleteBusDialog = ({
  open,
  bus,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        Delete Bus
      </DialogTitle>

      <DialogContent>

        <DialogContentText>

          Are you sure you want to delete

          <strong>
            {" "}
            {bus?.busName}
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

export default DeleteBusDialog;