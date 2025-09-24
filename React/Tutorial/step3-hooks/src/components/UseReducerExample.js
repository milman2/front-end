import React, { useReducer } from 'react';

// Reducer 함수 정의
function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    case 'set':
      return { count: action.payload };
    default:
      throw new Error(`알 수 없는 액션: ${action.type}`);
  }
}

// 복잡한 상태를 관리하는 Reducer
function todoReducer(state, action) {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.payload,
          completed: false
        }]
      };
    case 'toggle':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case 'delete':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    case 'setFilter':
      return {
        ...state,
        filter: action.payload
      };
    case 'clearCompleted':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      };
    default:
      throw new Error(`알 수 없는 액션: ${action.type}`);
  }
}

// 기본 카운터 예제
function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div className="demo-box">
      <h3>useReducer 카운터</h3>
      <div className="counter">카운트: {state.count}</div>
      <button className="button" onClick={() => dispatch({ type: 'increment' })}>
        +1
      </button>
      <button className="button" onClick={() => dispatch({ type: 'decrement' })}>
        -1
      </button>
      <button className="button" onClick={() => dispatch({ type: 'reset' })}>
        리셋
      </button>
      <button className="button" onClick={() => dispatch({ type: 'set', payload: 10 })}>
        10으로 설정
      </button>
    </div>
  );
}

// 복잡한 할 일 목록 예제
function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: 'all' // all, active, completed
  });

  const [inputValue, setInputValue] = React.useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      dispatch({ type: 'add', payload: inputValue });
      setInputValue('');
    }
  };

  const filteredTodos = state.todos.filter(todo => {
    switch (state.filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const completedCount = state.todos.filter(todo => todo.completed).length;
  const activeCount = state.todos.length - completedCount;

  return (
    <div className="demo-box">
      <h3>useReducer 할 일 목록</h3>
      
      {/* 할 일 추가 */}
      <div style={{ margin: '15px 0' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="할 일을 입력하세요"
          style={{ padding: '8px', width: '200px', marginRight: '10px' }}
        />
        <button className="button" onClick={addTodo}>추가</button>
      </div>

      {/* 필터 버튼 */}
      <div style={{ margin: '15px 0' }}>
        <button 
          className={`button ${state.filter === 'all' ? 'active' : ''}`}
          onClick={() => dispatch({ type: 'setFilter', payload: 'all' })}
        >
          전체 ({state.todos.length})
        </button>
        <button 
          className={`button ${state.filter === 'active' ? 'active' : ''}`}
          onClick={() => dispatch({ type: 'setFilter', payload: 'active' })}
        >
          활성 ({activeCount})
        </button>
        <button 
          className={`button ${state.filter === 'completed' ? 'active' : ''}`}
          onClick={() => dispatch({ type: 'setFilter', payload: 'completed' })}
        >
          완료 ({completedCount})
        </button>
      </div>

      {/* 할 일 목록 */}
      <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {filteredTodos.map(todo => (
          <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <span 
              onClick={() => dispatch({ type: 'toggle', payload: todo.id })}
              style={{ cursor: 'pointer' }}
            >
              {todo.text}
            </span>
            <button 
              className="button" 
              onClick={() => dispatch({ type: 'delete', payload: todo.id })}
              style={{ padding: '5px 10px', fontSize: '12px' }}
            >
              삭제
            </button>
          </div>
        ))}
      </div>

      {/* 통계 및 액션 */}
      <div style={{ margin: '15px 0', padding: '10px', background: '#f5f5f5', borderRadius: '5px' }}>
        <p>전체: {state.todos.length}개 | 활성: {activeCount}개 | 완료: {completedCount}개</p>
        {completedCount > 0 && (
          <button 
            className="button" 
            onClick={() => dispatch({ type: 'clearCompleted' })}
            style={{ backgroundColor: '#f44336' }}
          >
            완료된 항목 삭제
          </button>
        )}
      </div>
    </div>
  );
}

// 폼 상태 관리 예제
function formReducer(state, action) {
  switch (action.type) {
    case 'setField':
      return {
        ...state,
        [action.field]: action.value,
        errors: {} // 필드 변경 시 에러 초기화
      };
    case 'reset':
      return {
        name: '',
        email: '',
        age: '',
        message: '',
        errors: {}
      };
    case 'setErrors':
      return {
        ...state,
        errors: action.payload
      };
    default:
      throw new Error(`알 수 없는 액션: ${action.type}`);
  }
}

function ContactForm() {
  const [state, dispatch] = useReducer(formReducer, {
    name: '',
    email: '',
    age: '',
    message: '',
    errors: {}
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 간단한 유효성 검사
    const errors = {};
    if (!state.name) errors.name = '이름을 입력해주세요';
    if (!state.email) errors.email = '이메일을 입력해주세요';
    if (!state.age || state.age < 1) errors.age = '올바른 나이를 입력해주세요';

    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'setErrors', payload: errors });
      return;
    }

    // 폼 제출 성공
    alert(`제출 완료!\n이름: ${state.name}\n이메일: ${state.email}\n나이: ${state.age}\n메시지: ${state.message}`);
    dispatch({ type: 'reset' });
  };

  return (
    <div className="demo-box">
      <h3>useReducer 폼 관리</h3>
      <form onSubmit={handleSubmit} style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
        <div style={{ margin: '10px 0' }}>
          <label>이름: </label>
          <input
            type="text"
            value={state.name}
            onChange={(e) => dispatch({ type: 'setField', field: 'name', value: e.target.value })}
            style={{ padding: '5px', width: '100%' }}
          />
          {state.errors.name && <p style={{ color: 'red', fontSize: '12px' }}>{state.errors.name}</p>}
        </div>
        
        <div style={{ margin: '10px 0' }}>
          <label>이메일: </label>
          <input
            type="email"
            value={state.email}
            onChange={(e) => dispatch({ type: 'setField', field: 'email', value: e.target.value })}
            style={{ padding: '5px', width: '100%' }}
          />
          {state.errors.email && <p style={{ color: 'red', fontSize: '12px' }}>{state.errors.email}</p>}
        </div>
        
        <div style={{ margin: '10px 0' }}>
          <label>나이: </label>
          <input
            type="number"
            value={state.age}
            onChange={(e) => dispatch({ type: 'setField', field: 'age', value: e.target.value })}
            style={{ padding: '5px', width: '100%' }}
          />
          {state.errors.age && <p style={{ color: 'red', fontSize: '12px' }}>{state.errors.age}</p>}
        </div>
        
        <div style={{ margin: '10px 0' }}>
          <label>메시지: </label>
          <textarea
            value={state.message}
            onChange={(e) => dispatch({ type: 'setField', field: 'message', value: e.target.value })}
            rows="3"
            style={{ padding: '5px', width: '100%' }}
          />
        </div>
        
        <div style={{ textAlign: 'center', margin: '15px 0' }}>
          <button type="submit" className="button">제출</button>
          <button type="button" className="button" onClick={() => dispatch({ type: 'reset' })}>리셋</button>
        </div>
      </form>
    </div>
  );
}

function UseReducerExample() {
  return (
    <div className="component-section">
      <h2>4. useReducer Hook으로 복잡한 상태 관리하기</h2>
      <p>
        useReducer는 useState의 대안으로, 복잡한 상태 로직을 관리할 때 유용합니다.
        Redux와 유사한 패턴으로 상태를 관리할 수 있습니다.
      </p>

      <div className="code-example">
        <strong>useReducer 기본 문법:</strong><br/>
        <pre style={{
          background: '#f8f9fa',
          padding: '15px',
          borderRadius: '6px',
          overflow: 'auto',
          fontSize: '14px',
          fontFamily: 'monospace',
          border: '1px solid #e9ecef',
          margin: '10px 0'
        }}>
          {`import React, { useReducer } from 'react';

// Reducer 함수
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  
  return (
    <div>
      <p>카운트: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>
        증가
      </button>
    </div>
  );
}`}
        </pre>
      </div>

      <Counter />
      <TodoApp />
      <ContactForm />

      <div className="highlight">
        <strong>useReducer vs useState:</strong>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li><strong>useState:</strong> 간단한 상태 관리</li>
          <li><strong>useReducer:</strong> 복잡한 상태 로직</li>
          <li><strong>예측 가능:</strong> 액션 기반 상태 변경</li>
          <li><strong>테스트 용이:</strong> 순수 함수로 구성</li>
          <li><strong>성능:</strong> 여러 상태를 하나로 관리</li>
        </ul>
      </div>

      <div className="code-example">
        <strong>useReducer 사용 시기:</strong><br/>
        <pre style={{
          background: '#f8f9fa',
          padding: '15px',
          borderRadius: '6px',
          overflow: 'auto',
          fontSize: '14px',
          fontFamily: 'monospace',
          border: '1px solid #e9ecef',
          margin: '10px 0'
        }}>
          {`// 1. 복잡한 상태 구조
const [state, dispatch] = useReducer(reducer, {
  user: null,
  loading: false,
  error: null,
  posts: []
});

// 2. 여러 상태가 함께 변경되는 경우
case 'FETCH_SUCCESS':
  return {
    ...state,
    loading: false,
    posts: action.payload,
    error: null
  };

// 3. 상태 업데이트 로직이 복잡한 경우
case 'UPDATE_POST':
  return {
    ...state,
    posts: state.posts.map(post => 
      post.id === action.id 
        ? { ...post, ...action.updates }
        : post
    )
  };`}
        </pre>
      </div>
    </div>
  );
}

export default UseReducerExample;
