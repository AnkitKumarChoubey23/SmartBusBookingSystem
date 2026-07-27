import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Chip,
  IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const RouteTable = ({
  routes,
  onEdit,
  onDelete,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>

        <TableHead>
          <TableRow>
            <TableCell><strong>Source</strong></TableCell>
            <TableCell><strong>Destination</strong></TableCell>
            <TableCell><strong>Distance</strong></TableCell>
            <TableCell><strong>Duration</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
            <TableCell align="center">
              <strong>Actions</strong>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {routes.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                align="center"
              >
                No Routes Found
              </TableCell>
            </TableRow>
          ) : (
            routes.map((route) => (
              <TableRow key={route._id} hover>

                <TableCell>
                  {route.source}
                </TableCell>

                <TableCell>
                  {route.destination}
                </TableCell>

                <TableCell>
                  {route.distance} km
                </TableCell>

                <TableCell>
                  {route.estimatedDuration}
                </TableCell>

                <TableCell>
                  <Chip
                    size="small"
                    color={
                      route.isActive
                        ? "success"
                        : "default"
                    }
                    label={
                      route.isActive
                        ? "Active"
                        : "Inactive"
                    }
                  />
                </TableCell>

                <TableCell align="center">

                  <IconButton
                    color="primary"
                    onClick={() => onEdit(route)}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => onDelete(route)}
                  >
                    <DeleteIcon />
                  </IconButton>

                </TableCell>

              </TableRow>
            ))
          )}

        </TableBody>

      </Table>
    </TableContainer>
  );
};

export default RouteTable;