import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

const SeatSelection = () => {

  const { id } = useParams();

  const [schedule, setSchedule] = useState(null);

  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {

    fetchSchedule();

  }, []);

  const fetchSchedule = async () => {

    const res = await api.get(`/schedules/${id}`);

    setSchedule(res.data.data);

  };

  const toggleSeat = (seat) => {

    if (seat.isBooked) return;

    if (selectedSeats.includes(seat.seatNumber)) {

      setSelectedSeats(
        selectedSeats.filter(
          s => s !== seat.seatNumber
        )
      );

    } else {

      setSelectedSeats([
        ...selectedSeats,
        seat.seatNumber
      ]);

    }

  };

  const bookSeats = async () => {

    await api.post("/bookings",{

      scheduleId:id,

      seats:selectedSeats

    });

    alert("Booking Successful");

    fetchSchedule();

    setSelectedSeats([]);

  };

  if(!schedule){

    return <h2>Loading...</h2>;

  }

  return(

    <div>

      <h1>

        {schedule.bus.busName}

      </h1>

      <h3>

        Select Seats

      </h3>

      <div
      style={{
        display:"grid",
        gridTemplateColumns:"repeat(4,80px)",
        gap:"10px"
      }}
      >

      {

        schedule.seats.map(seat=>(

          <button

          key={seat.seatNumber}

          disabled={seat.isBooked}

          onClick={()=>toggleSeat(seat)}

          style={{

            height:"60px",

            background:

            seat.isBooked

            ?"red"

            :selectedSeats.includes(seat.seatNumber)

            ?"green"

            :"white"

          }}

          >

          {seat.seatNumber}

          </button>

        ))

      }

      </div>

      <br/>

      <button

      onClick={bookSeats}

      >

      Book Selected Seats

      </button>

    </div>

  );

};

export default SeatSelection;