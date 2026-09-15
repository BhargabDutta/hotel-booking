import React from 'react'
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
function RoomDisplay() {
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
                </tr>
              </thead>

              <tbody>
                {rooms.map((room) => (
                  <tr key={room.roomCode}>
                    <td>
                      <span className="room-code">{room.roomCode}</span>
                    </td>

                    <td>
                      <div className="room-type">
                        <span className="room-dot"></span>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}

export default RoomDisplay