import React, { useState, useCallback } from 'react';
import Button from './Button';

interface CounterProps {
  initialValue?: number;
  step?: number;
  onCountChange?: (count: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  initialValue = 0,
  step = 1,
  onCountChange,
}) => {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    const newCount = count + step;
    setCount(newCount);
    onCountChange?.(newCount);
  }, [count, step, onCountChange]);

  const decrement = useCallback(() => {
    const newCount = count - step;
    setCount(newCount);
    onCountChange?.(newCount);
  }, [count, step, onCountChange]);

  const reset = useCallback(() => {
    setCount(initialValue);
    onCountChange?.(initialValue);
  }, [initialValue, onCountChange]);

  return (
    <div className="counter" data-testid="counter">
      <div className="counter-display" data-testid="counter-display">
        {count}
      </div>
      <div className="counter-controls">
        <Button
          onClick={decrement}
          variant="secondary"
          size="small"
          data-testid="decrement-button"
        >
          -
        </Button>
        <Button
          onClick={increment}
          variant="primary"
          size="small"
          data-testid="increment-button"
        >
          +
        </Button>
        <Button
          onClick={reset}
          variant="danger"
          size="small"
          data-testid="reset-button"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Counter;
