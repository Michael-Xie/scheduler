import React, { Fragment, useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Grace Louis",
//       interviewer: {
//         id: 2,
//         name: "Tori Malcolm",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png"
//       }

//     }
//   }
// ];

export default function Application(props) {
  const initialState = {
    day: "Monday",
    days: [],
    appointments: {}
  };
  const [state, setState] = useState(initialState);
  const setDay = day => setState(prev => ({ ...prev, day }));

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
      setState(prev => ({ ...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data }));
    })
  }, []); // run once with the [], else none would run each render

  function bookInterview(id, interview) {
    console.log(id, interview);
  }

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
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */
          
          getAppointmentsForDay(state, state.day).map((appointment) => {
            const interview = getInterview(state, appointment.interview);
            const interviewers = getInterviewersForDay(state, state.day);
            console.log("interviewers by day", interviewers);
            return (
              <Appointment
                key={appointment.id}
                id={appointment.id}
                time={appointment.time}
                interview={interview}
                interviewers={interviewers}
                bookInterview={bookInterview}
              />
            )
          })}


      </section>
    </main>
  );
}
