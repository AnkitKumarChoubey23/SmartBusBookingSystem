import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Chip,
} from "@mui/material";

const UserDetailsDialog = ({
  open,
  user,
  onClose,
}) => {
  if (!user) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        User Details
      </DialogTitle>

      <DialogContent dividers>

        <Grid container spacing={2}>

          <Grid item xs={6}>
            <Typography fontWeight="bold">
              Name
            </Typography>

            <Typography>
              {user.firstName} {user.lastName}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography fontWeight="bold">
              Email
            </Typography>

            <Typography>
              {user.email}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography fontWeight="bold">
              Phone
            </Typography>

            <Typography>
              {user.phone}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography fontWeight="bold">
              Role
            </Typography>

            <Typography>
              {user.role}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography fontWeight="bold">
              Status
            </Typography>

            <Chip
              color={
                user.isVerified
                  ? "success"
                  : "warning"
              }
              label={
                user.isVerified
                  ? "Active"
                  : "Inactive"
              }
            />
          </Grid>

          <Grid item xs={6}>
            <Typography fontWeight="bold">
              Total Bookings
            </Typography>

            <Typography>
              {user.bookingCount}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight="bold">
              Registered On
            </Typography>

            <Typography>
              {new Date(
                user.createdAt
              ).toLocaleString()}
            </Typography>
          </Grid>

        </Grid>

      </DialogContent>

      <DialogActions>

        <Button
          onClick={onClose}
        >
          Close
        </Button>

      </DialogActions>
    </Dialog>
  );
};

export default UserDetailsDialog;