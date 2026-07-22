import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../services/api";

const SearchResults = () => {
  const navigate = useNavigate();

  const [params] = useSearchParams();

  const [buses, setBuses] = useState([]);

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const res = await api.get(
        `/search?source=${params.get("source")}&destination=${params.get(
          "destination"
        )}&date=${params.get("date")}`
      );

      setBuses(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        width: "900px",
        margin: "30px auto",
      }}
    >
      <h1>Available Buses</h1>

      {buses.length === 0 && <h3>No Buses Found</h3>}

      {buses.map((bus) => (
        <div
          key={bus._id}
          style={{
            border: "1px solid gray",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <h2>{bus.bus.busName}</h2>

          <p>
            {bus.route.source} → {bus.route.destination}
          </p>

          <p>Fare : ₹{bus.fare}</p>

          <p>
            Available Seats : {bus.availableSeats}
          </p>

          <button
            onClick={() =>
              navigate(`/seat-selection/${bus._id}`)
            }
          >
            Select Seats
          </button>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;