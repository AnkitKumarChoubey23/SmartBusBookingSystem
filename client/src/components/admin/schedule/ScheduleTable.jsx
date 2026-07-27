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

const ScheduleTable = ({
  schedules,
  onEdit,
  onDelete,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>

        <TableHead>

          <TableRow>

            <TableCell><strong>Bus</strong></TableCell>

            <TableCell><strong>Route</strong></TableCell>

            <TableCell><strong>Departure</strong></TableCell>

            <TableCell><strong>Arrival</strong></TableCell>

            <TableCell><strong>Fare</strong></TableCell>

            <TableCell><strong>Seats</strong></TableCell>

            <TableCell><strong>Status</strong></TableCell>

            <TableCell align="center">
              <strong>Actions</strong>
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {schedules.length === 0 ? (

            <TableRow>

              <TableCell
                align="center"
                colSpan={8}
              >
                No schedules available
              </TableCell>

            </TableRow>

          ) : (

            schedules.map((schedule) => (

              <TableRow
                hover
                key={schedule._id}
              >

                <TableCell>

                  {schedule.bus?.busName}

                  <br />

                  <small>
                    {schedule.bus?.busNumber}
                  </small>

                </TableCell>

                <TableCell>

                  {schedule.route?.source}

                  <br />

                  ↓

                  <br />

                  {schedule.route?.destination}

                </TableCell>

                <TableCell>

                  {new Date(
                    schedule.departureDate
                  ).toLocaleDateString()}

                  <br />

                  {schedule.departureTime}

                </TableCell>

                <TableCell>

                  {new Date(
                    schedule.arrivalDate
                  ).toLocaleDateString()}

                  <br />

                  {schedule.arrivalTime}

                </TableCell>

                <TableCell>

                  ₹{schedule.fare}

                </TableCell>

                <TableCell>

                  {schedule.availableSeats}

                </TableCell>

                <TableCell>

                  <Chip
                    size="small"
                    color={
                      schedule.status ===
                      "Scheduled"
                        ? "success"
                        : schedule.status ===
                          "Cancelled"
                        ? "error"
                        : "default"
                    }
                    label={schedule.status}
                  />

                </TableCell>

                <TableCell align="center">

                  <IconButton
                    color="primary"
                    onClick={() =>
                      onEdit(schedule)
                    }
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() =>
                      onDelete(schedule)
                    }
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

export default ScheduleTable;