import { useRef, useEffect } from "react";

const usePreviousValue = <T>(value: T) => {
  const prevValue = useRef<T>();

  useEffect(() => {
    prevValue.current = value;

    return () => {
      prevValue.current = undefined;
    };
  });

  return prevValue.current;
};

export default usePreviousValue;
