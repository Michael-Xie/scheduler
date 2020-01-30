import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";
import PropTypes from "prop-types";

export default function InterviewerList(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map((interviewer) => {
          return <InterviewerListItem
            key={interviewer.id}
            name={interviewer.name}
            avatar={interviewer.avatar}
            onChange={() => props.onChange(interviewer.id)} 
            selected={interviewer.id === props.value}/>
        })}
      </ul>
    </section>
  );
}

// Type checking for below props
InterviewerList.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number
}