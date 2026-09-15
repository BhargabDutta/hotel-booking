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

function RoomDisplay({ selectedRooms, setSelectedRooms, dates }) {
  const nights =
    dates.checkIn && dates.checkOut
      ? calculateNights(dates.checkIn, dates.checkOut)
      : 0;

  const totalPrice =
    selectedRooms.reduce(
      (total, room) => total + room.pricePerNight,
      0
    ) * nights;

  return (
    <div>
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
                          onClick={() =>
                            setSelectedRooms((rooms) => {
                              if (isSelected) {
                                return rooms.filter(
                                  (selectedRoom) =>
                                    selectedRoom.roomCode !==
                                    room.roomCode
                                );
                              }

                              return [...rooms, room];
                            })
                          }
                        >
                          {isSelected ? "Selected" : "Select Room"}
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

                {selectedRooms.map((room) => (
                  <p key={room.roomCode}>
                    <strong>{room.roomCode}</strong> - {room.roomType}
                  </p>
                ))}

                {nights > 0 && (
                  <>
                    <p>
                      {nights} {nights === 1 ? "night" : "nights"}
                    </p>

                    <p>
                      <strong>
                        Total: ₹{totalPrice.toLocaleString("en-IN")}
                      </strong>
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default RoomDisplay;