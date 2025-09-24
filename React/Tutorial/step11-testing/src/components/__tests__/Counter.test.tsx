import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Counter from '../Counter';

describe('Counter Component', () => {
  it('renders with initial value', () => {
    render(<Counter initialValue={5} />);
    expect(screen.getByTestId('counter-display')).toHaveTextContent('5');
  });

  it('renders with default initial value of 0', () => {
    render(<Counter />);
    expect(screen.getByTestId('counter-display')).toHaveTextContent('0');
  });

  it('increments count when increment button is clicked', () => {
    render(<Counter initialValue={0} />);
    const incrementButton = screen.getByTestId('increment-button');
    const display = screen.getByTestId('counter-display');

    fireEvent.click(incrementButton);
    expect(display).toHaveTextContent('1');
  });

  it('decrements count when decrement button is clicked', () => {
    render(<Counter initialValue={5} />);
    const decrementButton = screen.getByTestId('decrement-button');
    const display = screen.getByTestId('counter-display');

    fireEvent.click(decrementButton);
    expect(display).toHaveTextContent('4');
  });

  it('resets count when reset button is clicked', () => {
    render(<Counter initialValue={10} />);
    const incrementButton = screen.getByTestId('increment-button');
    const resetButton = screen.getByTestId('reset-button');
    const display = screen.getByTestId('counter-display');

    // Increment first
    fireEvent.click(incrementButton);
    expect(display).toHaveTextContent('11');

    // Then reset
    fireEvent.click(resetButton);
    expect(display).toHaveTextContent('10');
  });

  it('uses custom step value', () => {
    render(<Counter initialValue={0} step={5} />);
    const incrementButton = screen.getByTestId('increment-button');
    const decrementButton = screen.getByTestId('decrement-button');
    const display = screen.getByTestId('counter-display');

    fireEvent.click(incrementButton);
    expect(display).toHaveTextContent('5');

    fireEvent.click(decrementButton);
    expect(display).toHaveTextContent('0');
  });

  it('calls onCountChange callback when count changes', () => {
    const onCountChange = jest.fn();
    render(<Counter initialValue={0} onCountChange={onCountChange} />);
    const incrementButton = screen.getByTestId('increment-button');

    fireEvent.click(incrementButton);
    expect(onCountChange).toHaveBeenCalledWith(1);
  });

  it('calls onCountChange callback on reset', () => {
    const onCountChange = jest.fn();
    render(<Counter initialValue={5} onCountChange={onCountChange} />);
    const resetButton = screen.getByTestId('reset-button');

    fireEvent.click(resetButton);
    expect(onCountChange).toHaveBeenCalledWith(5);
  });

  it('renders all buttons with correct test ids', () => {
    render(<Counter />);

    expect(screen.getByTestId('increment-button')).toBeInTheDocument();
    expect(screen.getByTestId('decrement-button')).toBeInTheDocument();
    expect(screen.getByTestId('reset-button')).toBeInTheDocument();
  });

  it('has correct button text', () => {
    render(<Counter />);

    expect(screen.getByTestId('increment-button')).toHaveTextContent('+');
    expect(screen.getByTestId('decrement-button')).toHaveTextContent('-');
    expect(screen.getByTestId('reset-button')).toHaveTextContent('Reset');
  });
});
