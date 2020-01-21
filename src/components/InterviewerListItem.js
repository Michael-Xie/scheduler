import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const interviewerClass = {
    'interviewers__item--selected': props.selected,
  };
  return (
    <li onClick={props.onChange} className={classNames('interviewers__item', interviewerClass)}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}