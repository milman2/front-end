import { renderHook, act } from '@testing-library/react';
import { useCounter } from '../useCounter';

describe('useCounter Hook', () => {
  it('initializes with default value', () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);
    expect(result.current.canIncrement).toBe(true);
    expect(result.current.canDecrement).toBe(true);
  });

  it('initializes with custom initial value', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 10 }));

    expect(result.current.count).toBe(10);
  });

  it('increments count by default step', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 0 }));

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it('increments count by custom step', () => {
    const { result } = renderHook(() =>
      useCounter({ initialValue: 0, step: 5 })
    );

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(5);
  });

  it('decrements count by default step', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 10 }));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(9);
  });

  it('decrements count by custom step', () => {
    const { result } = renderHook(() =>
      useCounter({ initialValue: 10, step: 3 })
    );

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(7);
  });

  it('resets to initial value', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 5 }));

    act(() => {
      result.current.increment();
      result.current.increment();
    });

    expect(result.current.count).toBe(7);

    act(() => {
      result.current.reset();
    });

    expect(result.current.count).toBe(5);
  });

  it('sets count to specific value', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 0 }));

    act(() => {
      result.current.setCount(42);
    });

    expect(result.current.count).toBe(42);
  });

  it('respects minimum value', () => {
    const { result } = renderHook(() =>
      useCounter({ initialValue: 5, min: 0 })
    );

    act(() => {
      result.current.setCount(-10);
    });

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(0);
  });

  it('respects maximum value', () => {
    const { result } = renderHook(() =>
      useCounter({ initialValue: 0, max: 10 })
    );

    act(() => {
      result.current.setCount(20);
    });

    expect(result.current.count).toBe(10);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(10);
  });

  it('correctly reports canIncrement and canDecrement', () => {
    const { result } = renderHook(() =>
      useCounter({ initialValue: 5, min: 0, max: 10 })
    );

    expect(result.current.canIncrement).toBe(true);
    expect(result.current.canDecrement).toBe(true);

    act(() => {
      result.current.setCount(0);
    });

    expect(result.current.canIncrement).toBe(true);
    expect(result.current.canDecrement).toBe(false);

    act(() => {
      result.current.setCount(10);
    });

    expect(result.current.canIncrement).toBe(false);
    expect(result.current.canDecrement).toBe(true);
  });

  it('handles multiple operations', () => {
    const { result } = renderHook(() =>
      useCounter({ initialValue: 0, step: 2 })
    );

    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.decrement();
    });

    expect(result.current.count).toBe(2);
  });

  it('maintains state between renders', () => {
    const { result, rerender } = renderHook(() =>
      useCounter({ initialValue: 0 })
    );

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);

    rerender();

    expect(result.current.count).toBe(1);
  });
});
