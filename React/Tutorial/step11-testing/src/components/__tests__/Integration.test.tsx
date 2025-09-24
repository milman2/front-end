import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Counter from '../Counter';
import TodoList from '../TodoList';
import Button from '../Button';

// 통합 테스트: 여러 컴포넌트가 함께 작동하는지 테스트
describe('Integration Tests', () => {
  const user = userEvent.setup();

  describe('Counter and Button Integration', () => {
    it('works with multiple counters', async () => {
      render(
        <div>
          <Counter initialValue={0} data-testid="counter1" />
          <Counter initialValue={10} data-testid="counter2" />
        </div>
      );

      const counter1Increment = screen
        .getByTestId('counter1')
        .querySelector('[data-testid="increment-button"]');
      const counter2Increment = screen
        .getByTestId('counter2')
        .querySelector('[data-testid="increment-button"]');

      await user.click(counter1Increment!);
      await user.click(counter2Increment!);

      expect(
        screen
          .getByTestId('counter1')
          .querySelector('[data-testid="counter-display"]')
      ).toHaveTextContent('1');
      expect(
        screen
          .getByTestId('counter2')
          .querySelector('[data-testid="counter-display"]')
      ).toHaveTextContent('11');
    });
  });

  describe('TodoList with Counter Integration', () => {
    it('tracks todo count with counter', async () => {
      const TodoCounter = () => {
        const [todoCount, setTodoCount] = React.useState(0);

        return (
          <div>
            <Counter
              initialValue={todoCount}
              onCountChange={setTodoCount}
            />
            <TodoList onTodoChange={todos => setTodoCount(todos.length)} />
          </div>
        );
      };

      render(<TodoCounter />);

      const todoInput = screen.getByTestId('todo-input');
      const addButton = screen.getByTestId('add-todo-button');
      const counterDisplay = screen.getByTestId('counter-display');

      // Add first todo
      await user.type(todoInput, 'First todo');
      await user.click(addButton);

      await waitFor(() => {
        expect(counterDisplay).toHaveTextContent('1');
      });

      // Add second todo
      await user.type(todoInput, 'Second todo');
      await user.click(addButton);

      await waitFor(() => {
        expect(counterDisplay).toHaveTextContent('2');
      });
    });
  });

  describe('Complex User Interactions', () => {
    it('handles complete todo workflow', async () => {
      render(<TodoList />);

      const todoInput = screen.getByTestId('todo-input');
      const addButton = screen.getByTestId('add-todo-button');

      // Add multiple todos
      await user.type(todoInput, 'Buy groceries');
      await user.click(addButton);

      await user.type(todoInput, 'Walk the dog');
      await user.click(addButton);

      await user.type(todoInput, 'Finish project');
      await user.click(addButton);

      // Verify todos are added
      expect(screen.getByText('Buy groceries')).toBeInTheDocument();
      expect(screen.getByText('Walk the dog')).toBeInTheDocument();
      expect(screen.getByText('Finish project')).toBeInTheDocument();

      // Complete some todos
      const firstTodoCheckbox = screen.getAllByRole('checkbox')[0];
      const secondTodoCheckbox = screen.getAllByRole('checkbox')[1];

      await user.click(firstTodoCheckbox);
      await user.click(secondTodoCheckbox);

      // Verify completion
      expect(firstTodoCheckbox).toBeChecked();
      expect(secondTodoCheckbox).toBeChecked();

      // Clear completed todos
      const clearButton = screen.getByTestId('clear-completed-button');
      await user.click(clearButton);

      // Verify only incomplete todo remains
      expect(screen.queryByText('Buy groceries')).not.toBeInTheDocument();
      expect(screen.queryByText('Walk the dog')).not.toBeInTheDocument();
      expect(screen.getByText('Finish project')).toBeInTheDocument();
    });

    it('handles keyboard navigation', async () => {
      render(<TodoList />);

      const todoInput = screen.getByTestId('todo-input');

      // Add todo with Enter key
      await user.type(todoInput, 'Keyboard todo');
      await user.keyboard('{Enter}');

      expect(screen.getByText('Keyboard todo')).toBeInTheDocument();
      expect(todoInput).toHaveValue('');

      // Add another todo
      await user.type(todoInput, 'Another todo');
      await user.keyboard('{Enter}');

      expect(screen.getByText('Another todo')).toBeInTheDocument();
    });
  });

  describe('Error Handling Integration', () => {
    it('handles empty todo input gracefully', async () => {
      render(<TodoList />);

      const todoInput = screen.getByTestId('todo-input');
      const addButton = screen.getByTestId('add-todo-button');

      // Try to add empty todo
      await user.click(addButton);
      expect(screen.getByTestId('no-todos')).toBeInTheDocument();

      // Try to add todo with only spaces
      await user.type(todoInput, '   ');
      await user.click(addButton);
      expect(screen.getByTestId('no-todos')).toBeInTheDocument();
    });
  });

  describe('Performance Integration', () => {
    it('handles rapid button clicks', async () => {
      render(<Counter initialValue={0} />);

      const incrementButton = screen.getByTestId('increment-button');
      const display = screen.getByTestId('counter-display');

      // Rapid clicks
      for (let i = 0; i < 10; i++) {
        await user.click(incrementButton);
      }

      expect(display).toHaveTextContent('10');
    });

    it('handles rapid todo additions', async () => {
      render(<TodoList />);

      const todoInput = screen.getByTestId('todo-input');
      const addButton = screen.getByTestId('add-todo-button');

      // Add multiple todos rapidly
      for (let i = 1; i <= 5; i++) {
        await user.type(todoInput, `Todo ${i}`);
        await user.click(addButton);
      }

      // Verify all todos are added
      for (let i = 1; i <= 5; i++) {
        expect(screen.getByText(`Todo ${i}`)).toBeInTheDocument();
      }
    });
  });
});
