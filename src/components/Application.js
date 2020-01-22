import React, { Fragment, useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import axios from "axios";

export default function Application(props) {
  // const [day, setDay] = useState("Monday");

  // const [days, setDays] = useState([]);
  const initialState = {
    day: "Monday", 
    days: [], 
    appointments: {}
  };
  const [state, setState] = useState(initialState);
  const setDay = day => setState(prev => ({...prev, day}));
  // const setDays = days => setState(prev => ({ ...prev, days}));

  // useEffect(() => {
  //   axios.get(`/api/days`)
  //     .then(res => setDays(res.data))
  // }, []); // run once with the [], else none would run each render

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      console.log("days", days);
      console.log("appointments", appointments);
      console.log("interviewers", interviewers);
      setState(prev => ({days: days.data, appointments: appointments.data}));
    })
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
                days={state.days}
                day={state.day}
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
