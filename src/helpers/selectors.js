// Return appointments object for the day
export function getAppointmentsForDay(state, day) {
  let selectedDayAppt = []
  const filteredDays = state.days.filter(currDay => currDay.name === day);
  // there can only be one element for the day of the week
  if (filteredDays[0]) {
    selectedDayAppt = filteredDays[0].appointments.map((value)=>state.appointments[value]);
  }
  return selectedDayAppt;
}

// Return interview object, given an interviewer id
export function getInterview(state, interview) {
  let interviewObj = null;
  if (interview) {
    const studentName = interview.student;
    const interviewer = state.interviewers[interview.interviewer];
    interviewObj = {student: studentName, interviewer}
  }
  return interviewObj;
}

// Return list of interviewer objects for that day
export function getInterviewersForDay(state, day) {
  let selectedDayInterviewers = [];
  const filteredDays = state.days.filter(currDay => currDay.name === day);

  if (filteredDays[0]) {
    selectedDayInterviewers = filteredDays[0].interviewers.map((value) => state.interviewers[value]);
  }

  return selectedDayInterviewers;
}
