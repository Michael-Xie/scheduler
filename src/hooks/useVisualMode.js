import React, {useState} from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode] || []);
  const transition = (currMode, replace = false) => {
    setMode(currMode);
    if(!replace) {
      setHistory([...history, currMode]);
    } else {
      setHistory([initialMode]); //go back to initialMode
    }
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