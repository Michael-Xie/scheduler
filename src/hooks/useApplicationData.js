import React, { useEffect, useReducer } from "react";
import axios from "axios";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  };

  const handlers = {
    [SET_DAY]: (prevState, action) => {
      return {...prevState, day: action.value};
    },
    [SET_APPLICATION_DATA]: (prevState, action) => {
      return {...prevState, ...action.value}
    },
    [SET_INTERVIEW]: (prevState, action) => {
      return {...prevState, interview: action.value};
    }
  }
  const reducer = (prevState, action) => {
    const handler = handlers[action.type];
    if (handler) {
      return handler(prevState, action);
    }
    return prevState;
  };

  const [state, dispatch] = useReducer(reducer, initialState);

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
      dispatch({
        type: SET_APPLICATION_DATA, 
        value: {
          days: days.data, 
          appointments: appointments.data, 
          interviewers: interviewers.data
        }});
    })
  }, []); // run once with the [], else none would run each render

  const setDay = function(day) {
    dispatch({type: SET_DAY, value: day});
  }

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
          dispatch({type: SET_APPLICATION_DATA, value: {appointments: appointments}});
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
          dispatch({type: SET_APPLICATION_DATA, value: {appointments: appointments}})
        })
    }

  }

  return { state, setDay, bookInterview, cancelInterview };
}