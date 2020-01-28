const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

const handlers = {
  [SET_DAY]: (prevState, action) => {
    return {...prevState, day: action.value};
  },
  [SET_APPLICATION_DATA]: (prevState, action) => {
    return {...prevState, ...action.value}
  },
  [SET_INTERVIEW]: (prevState, action) => {
    const appointments = action.value.appointments;
    // Find day of week that the appointment belongs to
    // Then count the number of empty spots (no interview)
    const updatedDays = prevState.days.map((day) => {
      if (day.appointments.includes(action.value.appointmentId)) {
        const spots = day.appointments.reduce((accum, curr) => {
          if(!appointments[curr].interview) {
            accum = accum + 1;
          }
          return accum;
        }, 0)
        day.spots = spots;
      }
      return {...day};
    })
    return handlers[SET_APPLICATION_DATA](prevState, {value: {appointments: appointments, days: updatedDays}});
  }
}
const reducer = (prevState, action) => {
  const handler = handlers[action.type];
  if (handler) {
    return handler(prevState, action);
  }
  return prevState;
};

export {SET_APPLICATION_DATA, SET_DAY, SET_INTERVIEW, reducer};