import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSearchOptions } from "../../services/searchService";

import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";

import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";

import MainLayout from "../../components/layout/MainLayout";

const Home = () => {
  const navigate = useNavigate();

 const [search, setSearch] = useState({
  source: "",
  destination: "",
  date: "",
});

const [options, setOptions] = useState({});

useEffect(() => {
  fetchSearchOptions();
}, []);

const fetchSearchOptions = async () => {
  try {
    const res = await getSearchOptions();
    setOptions(res.data);
  } catch (error) {
    console.log(error);
  }
};

  const handleChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    navigate(
      `/search?source=${search.source}&destination=${search.destination}&date=${search.date}`
    );
  };

  const sources = Object.keys(options);

const destinations = search.source
  ? Object.keys(options[search.source] || {})
  : [];

const dates =
  search.source && search.destination
    ? options[search.source][search.destination] || []
    : [];

  return (
    <MainLayout>
      <Container maxWidth="md">
        <Box
          sx={{
            mt: 6,
            mb: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <DirectionsBusFilledIcon
            color="primary"
            sx={{
              fontSize: 70,
              mb: 2,
            }}
          />

          <Typography
            variant="h2"
            align="center"
            fontWeight="bold"
            gutterBottom
          >
            Smart Bus Booking
          </Typography>

          <Typography
            variant="h5"
            color="text.secondary"
            align="center"
            mb={5}
          >
            Book comfortable journeys across India
          </Typography>

          <Card
            sx={{
              width: "100%",
              borderRadius: 4,
            }}
            elevation={6}
          >
            <CardContent>
              <Typography
                variant="h4"
                align="center"
                gutterBottom
              >
                Search Buses
              </Typography>

              <Box
                component="form"
                onSubmit={handleSearch}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  mt: 3,
                }}
              >
                <Autocomplete
  options={sources}
  value={search.source}
  onChange={(e, value) =>
    setSearch({
      source: value || "",
      destination: "",
      date: "",
    })
  }
  renderInput={(params) => (
    <TextField
      {...params}
      label="Source"
    />
  )}
/>

<Autocomplete
  options={destinations}
  value={search.destination}
  onChange={(e, value) =>
    setSearch({
      ...search,
      destination: value || "",
      date: "",
    })
  }
  disabled={!search.source}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Destination"
    />
  )}
/>

<Autocomplete
  options={dates}
  value={search.date}
  onChange={(e, value) =>
    setSearch({
      ...search,
      date: value || "",
    })
  }
  disabled={!search.destination}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Journey Date"
    />
  )}
/>

                <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  sx={{
                    py: 1.5,
                  }}
                >
                  Search Buses
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default Home;