import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import TodoList from '../TodoList';

describe('TodoList Component', () => {
  const user = userEvent.setup();

  it('renders empty todo list initially', () => {
    render(<TodoList />);
    expect(screen.getByTestId('no-todos')).toBeInTheDocument();
    expect(screen.getByText('할 일이 없습니다.')).toBeInTheDocument();
  });

  it('renders initial todos when provided', () => {
    const initialTodos = [
      { id: 1, text: 'Test todo 1', completed: false },
      { id: 2, text: 'Test todo 2', completed: true },
    ];
    render(<TodoList initialTodos={initialTodos} />);

    expect(screen.getByText('Test todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test todo 2')).toBeInTheDocument();
    expect(screen.queryByTestId('no-todos')).not.toBeInTheDocument();
  });

  it('adds new todo when add button is clicked', async () => {
    render(<TodoList />);
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-todo-button');

    await user.type(input, 'New todo item');
    await user.click(addButton);

    expect(screen.getByText('New todo item')).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('adds new todo when Enter key is pressed', async () => {
    render(<TodoList />);
    const input = screen.getByTestId('todo-input');

    await user.type(input, 'New todo item');
    await user.keyboard('{Enter}');

    expect(screen.getByText('New todo item')).toBeInTheDocument();
  });

  it('does not add empty todo', async () => {
    render(<TodoList />);
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-todo-button');

    await user.type(input, '   '); // Only spaces
    await user.click(addButton);

    expect(screen.getByTestId('no-todos')).toBeInTheDocument();
  });

  it('toggles todo completion when checkbox is clicked', async () => {
    const initialTodos = [{ id: 1, text: 'Test todo', completed: false }];
    render(<TodoList initialTodos={initialTodos} />);

    const checkbox = screen.getByTestId('todo-checkbox-1');
    const todoItem = screen.getByTestId('todo-item-1');

    expect(checkbox).not.toBeChecked();
    expect(todoItem).not.toHaveClass('completed');

    await user.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(todoItem).toHaveClass('completed');
  });

  it('toggles todo completion when text is clicked', async () => {
    const initialTodos = [{ id: 1, text: 'Test todo', completed: false }];
    render(<TodoList initialTodos={initialTodos} />);

    const todoText = screen.getByTestId('todo-text-1');
    const checkbox = screen.getByTestId('todo-checkbox-1');

    await user.click(todoText);

    expect(checkbox).toBeChecked();
  });

  it('deletes todo when delete button is clicked', async () => {
    const initialTodos = [{ id: 1, text: 'Test todo', completed: false }];
    render(<TodoList initialTodos={initialTodos} />);

    const deleteButton = screen.getByTestId('delete-todo-1');
    await user.click(deleteButton);

    expect(screen.queryByText('Test todo')).not.toBeInTheDocument();
    expect(screen.getByTestId('no-todos')).toBeInTheDocument();
  });

  it('shows correct todo statistics', () => {
    const initialTodos = [
      { id: 1, text: 'Todo 1', completed: false },
      { id: 2, text: 'Todo 2', completed: true },
      { id: 3, text: 'Todo 3', completed: true },
    ];
    render(<TodoList initialTodos={initialTodos} />);

    expect(screen.getByText('완료: 2 / 전체: 3')).toBeInTheDocument();
  });

  it('shows clear completed button when there are completed todos', () => {
    const initialTodos = [
      { id: 1, text: 'Todo 1', completed: true },
      { id: 2, text: 'Todo 2', completed: false },
    ];
    render(<TodoList initialTodos={initialTodos} />);

    expect(screen.getByTestId('clear-completed-button')).toBeInTheDocument();
  });

  it('does not show clear completed button when no completed todos', () => {
    const initialTodos = [
      { id: 1, text: 'Todo 1', completed: false },
      { id: 2, text: 'Todo 2', completed: false },
    ];
    render(<TodoList initialTodos={initialTodos} />);

    expect(
      screen.queryByTestId('clear-completed-button')
    ).not.toBeInTheDocument();
  });

  it('clears completed todos when clear button is clicked', async () => {
    const initialTodos = [
      { id: 1, text: 'Todo 1', completed: true },
      { id: 2, text: 'Todo 2', completed: false },
    ];
    render(<TodoList initialTodos={initialTodos} />);

    const clearButton = screen.getByTestId('clear-completed-button');
    await user.click(clearButton);

    expect(screen.queryByText('Todo 1')).not.toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
  });

  it('calls onTodoChange callback when todos change', async () => {
    const onTodoChange = jest.fn();
    render(<TodoList onTodoChange={onTodoChange} />);

    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-todo-button');

    await user.type(input, 'New todo');
    await user.click(addButton);

    expect(onTodoChange).toHaveBeenCalledWith([
      expect.objectContaining({
        text: 'New todo',
        completed: false,
      }),
    ]);
  });

  it('renders todos with correct test ids', () => {
    const initialTodos = [
      { id: 1, text: 'Todo 1', completed: false },
      { id: 2, text: 'Todo 2', completed: true },
    ];
    render(<TodoList initialTodos={initialTodos} />);

    expect(screen.getByTestId('todo-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item-2')).toBeInTheDocument();
    expect(screen.getByTestId('todo-checkbox-1')).toBeInTheDocument();
    expect(screen.getByTestId('todo-checkbox-2')).toBeInTheDocument();
    expect(screen.getByTestId('todo-text-1')).toBeInTheDocument();
    expect(screen.getByTestId('todo-text-2')).toBeInTheDocument();
  });
});
