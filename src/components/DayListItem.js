import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const {name, spots, setDay, selected}  = props;
  const dayClass = {
    'day-list__item--selected': selected,
    'day-list__item--full': spots === 0
  };
  return (
    <li onClick={()=> setDay(name)} className={classNames('day-list__item', dayClass)}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{spots}</h3>
    </li>
  );
}