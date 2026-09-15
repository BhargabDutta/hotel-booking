import { useState } from "react";
import RoomDisplay from "./components/RoomDisplay";
import SelectDates from "./components/SelectDates";
function App() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  return (
    <div>
      <SelectDates />
      <RoomDisplay
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
      />
    </div>
  );
}

export default App;