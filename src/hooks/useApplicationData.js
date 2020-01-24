import React, { useState, useReducer } from "react";

export default function useApplicationData(state, action) {
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
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log("bookInterview", interview, id);
    if (interview && id) {
      return axios.put(`/api/appointments/${id}`, { interview })
        .then((res) => {
          console.log("put request for interview", res);
          setState(prev => ({ ...prev, appointments }));

        });
    }
  }

  function cancelInterview(id) {
    // set interview to null
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log("cancelInterview", appointments, id);
    if (id) {
      return axios.delete(`/api/appointments/${id}`)
        .then((res) => {
          console.log("cancelInterview", res);
          setState(prev => ({ ...prev, appointments }));
        })
    }

  }

  return { state, setDay, bookInterview, cancelInterview };
}