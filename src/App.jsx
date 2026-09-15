import { useState } from "react";
import RoomDisplay from "./components/RoomDisplay";
import SelectDates from "./components/SelectDates";

function App() {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [dates, setDates] = useState({
    checkIn: "",
    checkOut: "",
  });

  return (
    <div>
      <SelectDates setDates={setDates} />

      <RoomDisplay
        selectedRooms={selectedRooms}
        setSelectedRooms={setSelectedRooms}
        bookings={bookings}
        setBookings={setBookings}
        dates={dates}
      />
    </div>
  );
}

export default App;