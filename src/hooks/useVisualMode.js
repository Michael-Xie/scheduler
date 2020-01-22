import React, {useState} from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const transition = (currMode) => {
    setMode(currMode);
  };
  return {
    mode,
    transition
  };
}