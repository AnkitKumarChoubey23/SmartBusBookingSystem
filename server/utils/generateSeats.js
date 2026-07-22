const generateSeats = (totalSeats) => {
  const seats = [];

  const rows = Math.ceil(totalSeats / 4);

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let seatCount = 1;

  for (let i = 0; i < rows; i++) {
    const row = letters[i];

    for (let j = 1; j <= 4; j++) {
      if (seatCount > totalSeats) break;

      seats.push({
        seatNumber: `${row}${j}`,
        isBooked: false,
        bookedBy: null,
      });

      seatCount++;
    }
  }

  return seats;
};

module.exports = generateSeats;