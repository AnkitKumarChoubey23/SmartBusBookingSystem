import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import MainLayout from "../../components/layout/MainLayout";

import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Box,
  Stack,
} from "@mui/material";

import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

import api from "../../services/api";

const SearchResults = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        `/search?source=${params.get("source")}&destination=${params.get(
          "destination"
        )}&date=${params.get("date")}`
      );

      setBuses(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      {loading ? (
        <Box
          sx={{
            height: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <CircularProgress />

          <Typography sx={{ mt: 2 }}>
            Searching available buses...
          </Typography>
        </Box>
      ) : (
        <Container
          maxWidth="md"
          sx={{
            mt: 5,
            mb: 8,
          }}
        >
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            gutterBottom
          >
            Available Buses
          </Typography>

          {buses.length === 0 ? (
            <Typography
              variant="h6"
              align="center"
              color="text.secondary"
              sx={{ mt: 5 }}
            >
              No buses found for the selected route.
            </Typography>
          ) : (
            buses.map((bus) => (
              <Card
                key={bus._id}
                elevation={4}
                sx={{
                  mb: 3,
                  borderRadius: 3,
                }}
              >
                <CardContent>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                      >
                        <DirectionsBusIcon
                          sx={{
                            mr: 1,
                            verticalAlign: "middle",
                          }}
                        />
                        {bus.bus.busName}
                      </Typography>

                      <Typography mt={1}>
                        {bus.route.source} → {bus.route.destination}
                      </Typography>

                      <Typography mt={1}>
                        Fare : ₹{bus.fare}
                      </Typography>

                      <Typography mt={1}>
                        Available Seats : {bus.availableSeats}
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      size="large"
                      onClick={() =>
                        navigate(`/seat-selection/${bus._id}`)
                      }
                    >
                      Select Seats
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            ))
          )}
        </Container>
      )}
    </MainLayout>
  );
};

export default SearchResults;