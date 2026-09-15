import React from 'react'
import { useState } from "react";
function SelectDates() {
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");

  return (
    <div>
        <section className="booking-form">
          <div className="date-fields">
            <div className="form-group">
              <label htmlFor="check-in">Check-in</label>
              <input
                id="check-in"
                type="date"
                value={checkIn}
                onChange={(event) => setCheckIn(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="check-out">Check-out</label>
              <input
                id="check-out"
                type="date"
                value={checkOut}
                onChange={(event) => setCheckOut(event.target.value)}
              />
            </div>
          </div>
        </section>
    </div>
  )
}

export default SelectDates