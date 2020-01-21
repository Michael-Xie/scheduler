import React, { Fragment, useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import axios from "axios";

export default function Application(props) {
  const [day, setDay] = useState("Monday");

  const [days, setDays] = useState([]);

  useEffect(() => {
    axios.get(`/api/days`)
      .then(res => setDays(res.data))
  }, []); // run once with the [], else none would run each render

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */
          <Fragment>
            <img
              className="sidebar--centered"
              src="images/logo.png"
              alt="Interview Scheduler"
            />
            <hr className="sidebar__separator sidebar--centered" />
            <nav className="sidebar__menu">
              <DayList
                days={days}
                day={day}
                setDay={setDay}
              />
            </nav>
            <img
              className="sidebar__lhl sidebar--centered"
              src="images/lhl.png"
              alt="Lighthouse Labs"
            />
          </Fragment>
        }
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
