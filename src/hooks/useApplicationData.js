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
      dispatch({
        type: SET_APPLICATION_DATA,
        value: {
          days: days.data,
          appointments: appointments.data,
          interviewers: interviewers.data
        }
      });
    })
  }, []); // run once with the [], else no brackets would run each render

  // Update the day
  const setDay = function (day) {
    dispatch({ type: SET_DAY, value: day });
  }
  // Execute axios PUT request to update database and update interview object for appointment id
  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview })
      .then((res) => {
        dispatch({ type: SET_INTERVIEW, value: { id: id, interview: interview } })
      });
  }

  // Execute axios DELETE request to remove appointment from database and updated interview object for appointment id
  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        dispatch({ type: SET_INTERVIEW, value: { id: id, interview: null } })
      })
  }

  return { state, setDay, bookInterview, cancelInterview };
}