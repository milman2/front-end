import React, { useState } from 'react';
import './ListRendering.css';

function ListRendering() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'React 학습하기', completed: false, priority: 'high' },
    { id: 2, text: '프로젝트 완성하기', completed: true, priority: 'medium' },
    { id: 3, text: '코드 리뷰하기', completed: false, priority: 'low' },
  ]);

  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  // 할 일 추가
  const addTodo = () => {
    if (newTodo.trim()) {
      const newId = Math.max(...todos.map(t => t.id), 0) + 1;
      setTodos(prev => [
        ...prev,
        {
          id: newId,
          text: newTodo,
          completed: false,
          priority: 'medium',
        },
      ]);
      setNewTodo('');
    }
  };

  // 할 일 삭제
  const deleteTodo = id => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  // 할 일 완료 토글
  const toggleTodo = id => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 우선순위 변경
  const changePriority = (id, priority) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, priority } : todo))
    );
  };

  // 필터링된 할 일 목록
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'completed':
        return todo.completed;
      case 'active':
        return !todo.completed;
      case 'high':
        return todo.priority === 'high';
      case 'medium':
        return todo.priority === 'medium';
      case 'low':
        return todo.priority === 'low';
      default:
        return true;
    }
  });

  // 정렬된 할 일 목록
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    switch (sortBy) {
      case 'priority': {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      case 'alphabetical':
        return a.text.localeCompare(b.text);
      case 'completed':
        return a.completed - b.completed;
      default:
        return a.id - b.id;
    }
  });

  // 통계 계산
  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length,
    high: todos.filter(t => t.priority === 'high').length,
  };

  return (
    <div className='list-rendering'>
      <h2>리스트 렌더링 예제</h2>

      {/* 할 일 추가 폼 */}
      <div className='add-todo-section'>
        <h3>새 할 일 추가</h3>
        <div className='add-todo-form'>
          <input
            type='text'
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            placeholder='할 일을 입력하세요...'
            onKeyPress={e => e.key === 'Enter' && addTodo()}
          />
          <button onClick={addTodo}>추가</button>
        </div>
      </div>

      {/* 통계 정보 */}
      <div className='stats-section'>
        <h3>할 일 통계</h3>
        <div className='stats-grid'>
          <div className='stat-item'>
            <span className='stat-number'>{stats.total}</span>
            <span className='stat-label'>전체</span>
          </div>
          <div className='stat-item'>
            <span className='stat-number'>{stats.completed}</span>
            <span className='stat-label'>완료</span>
          </div>
          <div className='stat-item'>
            <span className='stat-number'>{stats.active}</span>
            <span className='stat-label'>진행중</span>
          </div>
          <div className='stat-item'>
            <span className='stat-number'>{stats.high}</span>
            <span className='stat-label'>높은 우선순위</span>
          </div>
        </div>
      </div>

      {/* 필터 및 정렬 */}
      <div className='controls-section'>
        <div className='filter-controls'>
          <h4>필터:</h4>
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value='all'>전체</option>
            <option value='active'>진행중</option>
            <option value='completed'>완료됨</option>
            <option value='high'>높은 우선순위</option>
            <option value='medium'>보통 우선순위</option>
            <option value='low'>낮은 우선순위</option>
          </select>
        </div>

        <div className='sort-controls'>
          <h4>정렬:</h4>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value='default'>기본 순서</option>
            <option value='priority'>우선순위</option>
            <option value='alphabetical'>알파벳 순</option>
            <option value='completed'>완료 상태</option>
          </select>
        </div>
      </div>

      {/* 할 일 목록 */}
      <div className='todos-section'>
        <h3>할 일 목록 ({sortedTodos.length}개)</h3>
        {sortedTodos.length === 0 ? (
          <div className='empty-state'>
            <p>표시할 할 일이 없습니다.</p>
            <p>새로운 할 일을 추가하거나 필터를 변경해보세요.</p>
          </div>
        ) : (
          <ul className='todo-list'>
            {sortedTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onChangePriority={changePriority}
              />
            ))}
          </ul>
        )}
      </div>

      {/* 리스트 렌더링 패턴 예제 */}
      <div className='patterns-section'>
        <h3>리스트 렌더링 패턴</h3>

        <div className='pattern-example'>
          <h4>1. 기본 리스트 렌더링</h4>
          <div className='code-example'>
            <pre>{`{items.map(item => (
  <li key={item.id}>
    {item.text}
  </li>
))}`}</pre>
          </div>
        </div>

        <div className='pattern-example'>
          <h4>2. 조건부 렌더링과 함께</h4>
          <div className='code-example'>
            <pre>{`{items.length > 0 ? (
  <ul>
    {items.map(item => (
      <li key={item.id}>{item.text}</li>
    ))}
  </ul>
) : (
  <p>항목이 없습니다.</p>
)}`}</pre>
          </div>
        </div>

        <div className='pattern-example'>
          <h4>3. 필터링과 정렬</h4>
          <div className='code-example'>
            <pre>{`{items
  .filter(item => item.active)
  .sort((a, b) => a.priority - b.priority)
  .map(item => (
    <ItemComponent key={item.id} item={item} />
  ))
}`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// 할 일 아이템 컴포넌트
function TodoItem({ todo, onToggle, onDelete, onChangePriority }) {
  const getPriorityColor = priority => {
    switch (priority) {
      case 'high':
        return '#e74c3c';
      case 'medium':
        return '#f39c12';
      case 'low':
        return '#27ae60';
      default:
        return '#95a5a6';
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className='todo-content'>
        <input
          type='checkbox'
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className='todo-checkbox'
        />

        <span className='todo-text'>{todo.text}</span>

        <div className='todo-priority'>
          <select
            value={todo.priority}
            onChange={e => onChangePriority(todo.id, e.target.value)}
            style={{ color: getPriorityColor(todo.priority) }}
          >
            <option value='high'>높음</option>
            <option value='medium'>보통</option>
            <option value='low'>낮음</option>
          </select>
        </div>
      </div>

      <div className='todo-actions'>
        <button
          onClick={() => onDelete(todo.id)}
          className='delete-btn'
          title='삭제'
        >
          ×
        </button>
      </div>
    </li>
  );
}

export default ListRendering;
