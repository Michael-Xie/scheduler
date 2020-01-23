export function getAppointmentsForDay(state, day) {
  let selectedDayAppt = []
  const filteredDays = state.days.filter(currDay => currDay.name === day);
  // there can only be one element 
  if (filteredDays[0]) {
    selectedDayAppt = filteredDays[0].appointments.map((value)=>state.appointments[value]);
  }
  return selectedDayAppt;
}

export function getInterview(state, interview) {
  let interviewObj = null;
  if (interview) {
    const studentName = interview.student;
    const interviewer = state.interviewers[interview.interviewer];
    interviewObj = {student: studentName, interviewer}
  }
  console.log("interview obj", interviewObj);
  return interviewObj;
}

export function getInterviewersForDay(state, day) {
  let selectedDayInterviewers = [];
  const filteredDays = state.days.filter(currDay => currDay.name === day);

  if (filteredDays[0]) {
    selectedDayInterviewers = filteredDays[0].interviewers.map((value) => state.interviewers[value]);
  }

  console.log("interviewer day", selectedDayInterviewers);
  return selectedDayInterviewers;
}
