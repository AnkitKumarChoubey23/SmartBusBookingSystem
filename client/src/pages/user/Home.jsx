import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState({
    source: "",
    destination: "",
    date: "",
  });

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

  return (
    <div
      style={{
        width: "500px",
        margin: "60px auto",
        textAlign: "center",
      }}
    >
      <h1>Smart Bus Booking System</h1>

      <h2>Search Buses</h2>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="source"
          placeholder="Source"
          value={search.source}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={search.destination}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="date"
          name="date"
          value={search.date}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">
          Search Buses
        </button>
      </form>
    </div>
  );
};

export default Home;