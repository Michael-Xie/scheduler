import React, {useState} from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode] || []);
  const transition = (currMode) => {
    setMode(currMode);
    setHistory([...history, currMode])
  };
  const back = () => {
    if(history.length > 1) {
      history.pop();
    }
    const lastMode = history[history.length - 1];
    setMode(lastMode);
  }
  return {
    mode,
    transition,
    back
  };
}