import React from "react";

const rooms = [
  {
    roomCode: "R101",
    roomType: "Deluxe Room",
    pricePerNight: 3500,
    maxGuests: 2,
  },
  {
    roomCode: "R102",
    roomType: "Deluxe Room",
    pricePerNight: 3500,
    maxGuests: 2,
  },
  {
    roomCode: "R201",
    roomType: "Executive Suite",
    pricePerNight: 5800,
    maxGuests: 3,
  },
  {
    roomCode: "R202",
    roomType: "Executive Suite",
    pricePerNight: 5800,
    maxGuests: 3,
  },
  {
    roomCode: "R301",
    roomType: "Family Room",
    pricePerNight: 4200,
    maxGuests: 4,
  },
];

function calculateNights(checkIn, checkOut) {
  const start = new Date(`${checkIn}T00:00:00`);
  const end = new Date(`${checkOut}T00:00:00`);

  return Math.round((end - start) / (1000 * 60 * 60 * 24));
}

function RoomDisplay({
  selectedRooms,
  setSelectedRooms,
  bookings,
  setBookings,
  dates,
}) {
  const nights =
    dates.checkIn && dates.checkOut
      ? calculateNights(dates.checkIn, dates.checkOut)
      : 0;

  function isRoomBooked(roomCode) {
    return bookings.some(
      (booking) =>
        booking.roomCode === roomCode &&
        dates.checkIn < booking.checkOut &&
        dates.checkOut > booking.checkIn
    );
  }

  function handleRoomSelect(room) {
    const alreadySelected = selectedRooms.some(
      (selectedRoom) => selectedRoom.roomCode === room.roomCode
    );

    if (alreadySelected) {
      setSelectedRooms(
        selectedRooms.filter(
          (selectedRoom) => selectedRoom.roomCode !== room.roomCode
        )
      );
    } else {
      setSelectedRooms([...selectedRooms, room]);
    }
  }

  function handleBooking() {
    const newBookings = selectedRooms.map((room) => ({
      roomCode: room.roomCode,
      checkIn: dates.checkIn,
      checkOut: dates.checkOut,
    }));

    setBookings([...bookings, ...newBookings]);
    setSelectedRooms([]);
  }

  return (
    <main className="container">
      <section className="room-card">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Room Code</th>
                <th>Room Type</th>
                <th>Price / Night</th>
                <th>Max Guests</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {rooms.map((room) => {
                const isSelected = selectedRooms.some(
                  (selectedRoom) =>
                    selectedRoom.roomCode === room.roomCode
                );

                const isBooked = isRoomBooked(room.roomCode);

                return (
                  <tr
                    key={room.roomCode}
                    className={isSelected ? "selected-row" : ""}
                  >
                    <td>
                      <span className="room-code">
                        {room.roomCode}
                      </span>
                    </td>

                    <td>
                      <div className="room-type">
                        {room.roomType}
                      </div>
                    </td>

                    <td>
                      <span className="price">
                        ₹{room.pricePerNight.toLocaleString("en-IN")}
                      </span>
                      <span className="price-label"> / night</span>
                    </td>

                    <td>
                      <span className="guest-badge">
                        {room.maxGuests} guests
                      </span>
                    </td>

                    <td>
                      <button
                        className={`select-btn ${
                          isSelected ? "selected" : ""
                        }`}
                        disabled={isBooked}
                        onClick={() => handleRoomSelect(room)}
                      >
                        {isBooked
                          ? "Booked"
                          : isSelected
                          ? "Selected"
                          : "Select Room"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {selectedRooms.length > 0 && (
            <div className="selected-room-info">
              <h3>Booking Summary</h3>
                <div style={{display: "flex", flexDirection: "row", gap: "40px"}}>
              {selectedRooms.map((room) => (
                <div key={room.roomCode}>
                  <p>
                    <strong>{room.roomCode}</strong> - {room.roomType}
                  </p>

                  <p>
                    ₹{room.pricePerNight.toLocaleString("en-IN")} / night
                  </p>

                  {nights > 0 && (
                    <p>
                      {nights} {nights === 1 ? "night" : "nights"} — ₹
                      {(room.pricePerNight * nights).toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  )}
                </div>
              ))}
              </div>

              <button
                className="select-btn"
                onClick={handleBooking}
                disabled={!dates.checkIn || !dates.checkOut || nights <= 0}
              >
                Book Selected Rooms
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default RoomDisplay;