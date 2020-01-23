import React from 'react'
import "./styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";

import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  console.log("Appointment prop interview", props.interview);
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview);
    transition(SHOW);
  }
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => {
        console.log('johnny clicked');
        transition(CREATE);
      }} />}
      {mode === SHOW && (
        <Show
          student={props.interview && props.interview.student}
          interviewer={props.interview && props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => {
            back()
          }}
          onSave={save}
        />
      )}
    </article>
  )
}