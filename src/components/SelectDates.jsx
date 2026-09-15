import { useState } from "react";

function SelectDates() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  function handleCheckInChange(event) {
    const value = event.target.value;

    setCheckIn(value);
    setError("");

    if (value < today) {
      setError("Check-in date cannot be in the past.");
    }

    if (checkOut && checkOut <= value) {
      setError("Check-out date must be after check-in.");
    }
  }

  function handleCheckOutChange(event) {
    const value = event.target.value;

    setCheckOut(value);
    setError("");

    if (checkIn && value <= checkIn) {
      setError("Check-out date must be after check-in.");
    }
  }

  return (
    <div>
      <section className="booking-form">
        <div className="date-fields">
          <div className="form-group">
            <label htmlFor="check-in">Check-in</label>
            <input
              id="check-in"
              type="date"
              min={today}
              value={checkIn}
              onChange={handleCheckInChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="check-out">Check-out</label>
            <input
              id="check-out"
              type="date"
              min={checkIn || today}
              value={checkOut}
              onChange={handleCheckOutChange}
            />
          </div>
        </div>

        {error && <p className="error">{error}</p>}
      </section>
    </div>
  );
}

export default SelectDates;