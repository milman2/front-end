import React, { useState } from "react";

// useState Hook 심화 예제
function Counter() {
  const [count, setCount] = useState(0);

  // 함수형 업데이트
  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(0);

  return (
    <div className="demo-box">
      <h3>기본 카운터</h3>
      <div className="counter">카운트: {count}</div>
      <button className="button" onClick={increment}>
        +1
      </button>
      <button className="button" onClick={decrement}>
        -1
      </button>
      <button className="button" onClick={reset}>
        리셋
      </button>
    </div>
  );
}

// 여러 상태 관리
function UserProfile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: 0,
  });

  const updateUser = (field, value) => {
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="demo-box">
      <h3>사용자 프로필 (객체 상태)</h3>
      <div style={{ textAlign: "left", maxWidth: "300px", margin: "0 auto" }}>
        <div style={{ margin: "10px 0" }}>
          <label>이름: </label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => updateUser("name", e.target.value)}
            style={{ padding: "5px", width: "150px" }}
          />
        </div>
        <div style={{ margin: "10px 0" }}>
          <label>이메일: </label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => updateUser("email", e.target.value)}
            style={{ padding: "5px", width: "150px" }}
          />
        </div>
        <div style={{ margin: "10px 0" }}>
          <label>나이: </label>
          <input
            type="number"
            value={user.age}
            onChange={(e) => updateUser("age", parseInt(e.target.value) || 0)}
            style={{ padding: "5px", width: "150px" }}
          />
        </div>
      </div>
      <div
        style={{
          background: "#e3f2fd",
          padding: "10px",
          margin: "10px 0",
          borderRadius: "5px",
        }}
      >
        <strong>현재 사용자 정보:</strong>
        <pre
          style={{
            background: "#f5f5f5",
            padding: "10px",
            borderRadius: "4px",
            overflow: "auto",
            fontSize: "14px",
            fontFamily: "monospace",
          }}
        >
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  );
}

// 배열 상태 관리
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: inputValue,
          completed: false,
        },
      ]);
      setInputValue("");
    }
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="demo-box">
      <h3>할 일 목록 (배열 상태)</h3>
      <div style={{ margin: "15px 0" }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
          placeholder="할 일을 입력하세요"
          style={{ padding: "8px", width: "200px", marginRight: "10px" }}
        />
        <button className="button" onClick={addTodo}>
          추가
        </button>
      </div>
      <div style={{ maxHeight: "200px", overflowY: "auto" }}>
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
          >
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{ cursor: "pointer" }}
            >
              {todo.text}
            </span>
            <button
              className="button"
              onClick={() => deleteTodo(todo.id)}
              style={{ padding: "5px 10px", fontSize: "12px" }}
            >
              삭제
            </button>
          </div>
        ))}
      </div>
      <p>
        총 {todos.length}개, 완료 {todos.filter((t) => t.completed).length}개
      </p>
    </div>
  );
}

function UseStateExample() {
  return (
    <div className="component-section">
      <h2>1. useState Hook 완전히 익히기</h2>
      <p>
        useState는 React에서 가장 기본적인 Hook입니다. 컴포넌트의 상태를
        관리하고, 상태가 변경될 때 컴포넌트를 리렌더링합니다.
      </p>

      <div className="code-example">
        <strong>useState 기본 문법:</strong>
        <br />
        {`import React, { useState } from 'react';

function MyComponent() {
  const [state, setState] = useState(초기값);
  
  return (
    <div>
      <p>현재 상태: {state}</p>
      <button onClick={() => setState(새값)}>
        상태 변경
      </button>
    </div>
  );
}`}
      </div>

      <Counter />
      <UserProfile />
      <TodoList />

      <div className="highlight">
        <strong>useState Hook의 특징:</strong>
        <ul style={{ textAlign: "left", display: "inline-block" }}>
          <li>상태값과 상태 업데이트 함수를 배열로 반환</li>
          <li>초기값은 첫 렌더링에서만 사용됨</li>
          <li>함수형 업데이트로 이전 상태 기반 업데이트 가능</li>
          <li>여러 개의 useState 사용 가능</li>
          <li>객체나 배열 상태도 관리 가능</li>
        </ul>
      </div>

      <div className="code-example">
        <strong>함수형 업데이트와 객체/배열 상태:</strong>
        <br />
        <pre
          style={{
            background: "#f8f9fa",
            padding: "15px",
            borderRadius: "6px",
            overflow: "auto",
            fontSize: "14px",
            fontFamily: "monospace",
            border: "1px solid #e9ecef",
            margin: "10px 0",
          }}
        >
          {`// 함수형 업데이트
setCount(prev => prev + 1);

// 객체 상태 업데이트
setUser(prev => ({ ...prev, name: '새 이름' }));

// 배열 상태 업데이트
setTodos(prev => [...prev, newTodo]);
setTodos(prev => prev.filter(todo => todo.id !== id));`}
        </pre>
      </div>
    </div>
  );
}

export default UseStateExample;
