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
    console.log("action", action);
    const appointment = {
      ...prevState.appointments[action.value.id],
      interview: action.value.interview
    };
    const appointments = {
      ...prevState.appointments,
      [action.value.id]: appointment
    };
    console.log("set_interview appt", appointment, action.value.id);
    // Find day of week that the appointment belongs to
    // Then count the number of empty spots (no interview)
    const updatedDays = prevState.days.map((day) => {
      console.log("day.appts and action.id and appts", day.appointments, action.value.id, appointments);
      if (day.appointments.includes(action.value.id)) {
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
  throw new Error(
    `Tried to reduce with unsupported action type: ${action.type}`
  );
};

export {SET_APPLICATION_DATA, SET_DAY, SET_INTERVIEW, reducer};