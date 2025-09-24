import { useState, useCallback } from 'react';

interface UseCounterOptions {
  initialValue?: number;
  step?: number;
  min?: number;
  max?: number;
}

interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: (value: number) => void;
  canIncrement: boolean;
  canDecrement: boolean;
}

export const useCounter = ({
  initialValue = 0,
  step = 1,
  min = -Infinity,
  max = Infinity,
}: UseCounterOptions = {}): UseCounterReturn => {
  const [count, setCountState] = useState(initialValue);

  const setCount = useCallback(
    (value: number) => {
      const newValue = Math.max(min, Math.min(max, value));
      setCountState(newValue);
    },
    [min, max]
  );

  const increment = useCallback(() => {
    setCount(count + step);
  }, [count, step, setCount]);

  const decrement = useCallback(() => {
    setCount(count - step);
  }, [count, step, setCount]);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue, setCount]);

  const canIncrement = count + step <= max;
  const canDecrement = count - step >= min;

  return {
    count,
    increment,
    decrement,
    reset,
    setCount,
    canIncrement,
    canDecrement,
  };
};
