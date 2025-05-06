// useDebouncedCallback.ts
import { useRef } from "react";

export const useDebouncedCallback = (delay = 1000) => {
  const timeouts = useRef({});

  const debounce = (key, callback) => {
    if (timeouts.current[key]) {
      clearTimeout(timeouts.current[key]);
    }

    timeouts.current[key] = setTimeout(callback, delay);
  };

  return debounce;
};
