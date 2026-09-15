import { useState } from "react";

function getToday() {
  const date = new Date();

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
}

function SelectDates({ setDates }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [error, setError] = useState("");

  const today = getToday();

  function handleCheckIn(event) {
    const value = event.target.value;

    setCheckIn(value);
    setDates((prev) => ({ ...prev, checkIn: value }));

    if (value < today) {
      setError("Check-in cannot be in the past.");
    } else if (checkOut && checkOut <= value) {
      setError("Check-out must be after check-in.");
    } else {
      setError("");
    }
  }

  function handleCheckOut(event) {
    const value = event.target.value;

    setCheckOut(value);
    setDates((prev) => ({ ...prev, checkOut: value }));

    if (checkIn && value <= checkIn) {
      setError("Check-out must be after check-in.");
    } else {
      setError("");
    }
  }

  return (
    <section className="booking-form">
      <div className="date-fields">
        <div className="form-group">
          <label htmlFor="check-in">Check-in</label>
          <input
            id="check-in"
            type="date"
            min={today}
            value={checkIn}
            onChange={handleCheckIn}
          />
        </div>

        <div className="form-group">
          <label htmlFor="check-out">Check-out</label>
          <input
            id="check-out"
            type="date"
            min={checkIn || today}
            value={checkOut}
            onChange={handleCheckOut}
          />
        </div>
      </div>

      {error && <p className="error">{error}</p>}
    </section>
  );
}

export default SelectDates;