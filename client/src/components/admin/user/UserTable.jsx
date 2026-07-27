import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const UserTable = ({
  users,
  onView,
  onToggleStatus,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>

        <TableHead>

          <TableRow>

            <TableCell>
              <strong>Name</strong>
            </TableCell>

            <TableCell>
              <strong>Email</strong>
            </TableCell>

            <TableCell>
              <strong>Phone</strong>
            </TableCell>

            <TableCell>
              <strong>Role</strong>
            </TableCell>

            <TableCell>
              <strong>Status</strong>
            </TableCell>

            <TableCell>
              <strong>Bookings</strong>
            </TableCell>

            <TableCell align="center">
              <strong>Actions</strong>
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {users.length === 0 ? (

            <TableRow>

              <TableCell
                colSpan={7}
                align="center"
              >
                No Users Found
              </TableCell>

            </TableRow>

          ) : (

            users.map((user) => (

              <TableRow
                hover
                key={user._id}
              >

                <TableCell>
                  {user.firstName} {user.lastName}
                </TableCell>

                <TableCell>
                  {user.email}
                </TableCell>

                <TableCell>
                  {user.phone}
                </TableCell>

                <TableCell>
                  {user.role}
                </TableCell>

                <TableCell>

                  <Chip
                    size="small"
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

                </TableCell>

                <TableCell>
                  {user.bookingCount}
                </TableCell>

                <TableCell align="center">

                  <Tooltip title="View Details">

                    <IconButton
                      color="primary"
                      onClick={() =>
                        onView(user)
                      }
                    >
                      <VisibilityIcon />
                    </IconButton>

                  </Tooltip>

                  <Tooltip
                    title={
                      user.isVerified
                        ? "Deactivate"
                        : "Activate"
                    }
                  >

                    <IconButton
                      color={
                        user.isVerified
                          ? "error"
                          : "success"
                      }
                      onClick={() =>
                        onToggleStatus(user)
                      }
                    >
                      {user.isVerified ? (
                        <BlockIcon />
                      ) : (
                        <CheckCircleIcon />
                      )}
                    </IconButton>

                  </Tooltip>

                </TableCell>

              </TableRow>

            ))

          )}

        </TableBody>

      </Table>
    </TableContainer>
  );
};

export default UserTable;