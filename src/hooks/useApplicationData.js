import React, { useEffect, useReducer } from "react";
import axios from "axios";

import { reducer, SET_INTERVIEW, SET_DAY, SET_APPLICATION_DATA } from "reducers/application";

export default function useApplicationData() {

  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
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
        }
      });
    })
  }, []); // run once with the [], else none would run each render

  // useEffect(() => {
  //   const sock = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
  //   console.log(sock);
  // }, [])
  const setDay = function (day) {
    dispatch({ type: SET_DAY, value: day });
  }

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview })
      .then((res) => {
        console.log("put request for interview", res);
        dispatch({ type: SET_INTERVIEW, value: { id: id, interview: interview } })
      });
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        console.log("cancelInterview", res);
        dispatch({ type: SET_INTERVIEW, value: { id: id, interview: null } })
      })
  }

  return { state, setDay, bookInterview, cancelInterview };
}