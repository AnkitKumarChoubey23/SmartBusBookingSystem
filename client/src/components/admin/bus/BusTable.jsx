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

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const BusTable = ({
  buses,
  onEdit,
  onDelete,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>

        <TableHead>
          <TableRow>
            <TableCell><strong>Bus Name</strong></TableCell>

            <TableCell><strong>Bus Number</strong></TableCell>

            <TableCell><strong>Type</strong></TableCell>

            <TableCell><strong>Operator</strong></TableCell>

            <TableCell align="center">
              <strong>Seats</strong>
            </TableCell>

            <TableCell align="center">
              <strong>Status</strong>
            </TableCell>

            <TableCell align="center">
              <strong>Actions</strong>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {buses.map((bus) => (

            <TableRow key={bus._id} hover>

              <TableCell>
                {bus.busName}
              </TableCell>

              <TableCell>
                {bus.busNumber}
              </TableCell>

              <TableCell>
                {bus.busType}
              </TableCell>

              <TableCell>
                {bus.operator}
              </TableCell>

              <TableCell align="center">
                {bus.totalSeats}
              </TableCell>

              <TableCell align="center">

                <Chip
                  label={
                    bus.isActive
                      ? "Active"
                      : "Inactive"
                  }
                  color={
                    bus.isActive
                      ? "success"
                      : "default"
                  }
                  size="small"
                />

              </TableCell>

              <TableCell align="center">

                <Tooltip title="Edit Bus">

                  <IconButton
                    color="primary"
                    onClick={() =>
                      onEdit(bus)
                    }
                  >
                    <EditIcon />
                  </IconButton>

                </Tooltip>

                <Tooltip title="Delete Bus">

                  <IconButton
                    color="error"
                    onClick={() =>
                      onDelete(bus)
                    }
                  >
                    <DeleteIcon />
                  </IconButton>

                </Tooltip>

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>
    </TableContainer>
  );
};

export default BusTable;