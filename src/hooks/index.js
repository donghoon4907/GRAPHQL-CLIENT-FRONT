import { useState, useEffect } from "react";

export const useInput = defaultValue => {
  const [value, setValue] = useState(defaultValue);
  const onChange = e => {
    const {
      target: { value }
    } = e;
    setValue(value);
  };
  return { value, onChange, setValue };
};

export const useDebounce = (defaultValue, delay) => {
  const [result, setResult] = useState("");
  const [state, setState] = useState(defaultValue);

  useEffect(() => {
    if (result === state) return;
    const timeout = setTimeout(() => setResult(state), delay);

    return () => clearTimeout(timeout);
  }, [state, result]);

  return [result, setState];
};
