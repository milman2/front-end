import React, { useState, useCallback } from 'react';
import Button from './Button';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  initialTodos?: Todo[];
  onTodoChange?: (todos: Todo[]) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  initialTodos = [],
  onTodoChange,
}) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodoText, setNewTodoText] = useState('');

  const addTodo = useCallback(() => {
    if (newTodoText.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: newTodoText.trim(),
        completed: false,
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      onTodoChange?.(updatedTodos);
      setNewTodoText('');
    }
  }, [newTodoText, todos, onTodoChange]);

  const toggleTodo = useCallback(
    (id: number) => {
      const updatedTodos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos);
      onTodoChange?.(updatedTodos);
    },
    [todos, onTodoChange]
  );

  const deleteTodo = useCallback(
    (id: number) => {
      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
      onTodoChange?.(updatedTodos);
    },
    [todos, onTodoChange]
  );

  const clearCompleted = useCallback(() => {
    const updatedTodos = todos.filter(todo => !todo.completed);
    setTodos(updatedTodos);
    onTodoChange?.(updatedTodos);
  }, [todos, onTodoChange]);

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="todo-list" data-testid="todo-list">
      <div className="todo-header">
        <h2>할 일 목록</h2>
        <div className="todo-stats">
          완료: {completedCount} / 전체: {totalCount}
        </div>
      </div>

      <div className="todo-input">
        <input
          type="text"
          value={newTodoText}
          onChange={e => setNewTodoText(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && addTodo()}
          placeholder="새 할 일을 입력하세요..."
          data-testid="todo-input"
        />
        <Button
          onClick={addTodo}
          variant="primary"
          size="small"
          data-testid="add-todo-button"
        >
          추가
        </Button>
      </div>

      <div className="todo-items">
        {todos.length === 0 ? (
          <div className="no-todos" data-testid="no-todos">
            할 일이 없습니다.
          </div>
        ) : (
          todos.map(todo => (
            <div
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
              data-testid={`todo-item-${todo.id}`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                data-testid={`todo-checkbox-${todo.id}`}
              />
              <span
                className="todo-text"
                onClick={() => toggleTodo(todo.id)}
                data-testid={`todo-text-${todo.id}`}
              >
                {todo.text}
              </span>
              <Button
                onClick={() => deleteTodo(todo.id)}
                variant="danger"
                size="small"
                data-testid={`delete-todo-${todo.id}`}
              >
                삭제
              </Button>
            </div>
          ))
        )}
      </div>

      {completedCount > 0 && (
        <div className="todo-actions">
          <Button
            onClick={clearCompleted}
            variant="secondary"
            size="small"
            data-testid="clear-completed-button"
          >
            완료된 항목 삭제
          </Button>
        </div>
      )}
    </div>
  );
};

export default TodoList;
