import {useState} from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode] || []);
  const transition = (currMode, replace = false) => {
    setMode(currMode);
    if(!replace) {
      setHistory([...history, currMode]);
    } else {
      // use the most recent history and replace the last mode with current mode
      setHistory(history => {
        const prevHistory = history.slice(0, -1);
        return [...prevHistory, currMode];
      });
    }
  };

  // Update mode to one before current
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