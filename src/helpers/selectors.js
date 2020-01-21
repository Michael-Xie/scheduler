export function getAppointmentsForDay(state, day) {
  let selectedDayAppt = []
  const filteredDays = state.days.filter(currDay => currDay.name === day);
  if (filteredDays[0]) {
    selectedDayAppt = filteredDays[0].appointments.map((value)=>state.appointments[value]);
  }
  console.log("appointment", selectedDayAppt);
  return selectedDayAppt;
}