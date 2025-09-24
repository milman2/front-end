import React from 'react';
import './App.css';
import Button from './components/Button';
import Counter from './components/Counter';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Testing Examples - Step 11</h1>
        <p>React Testing Library를 사용한 포괄적인 테스트 예제들</p>
      </header>

      <main className="App-main">
        <section className="component-section">
          <h2>Button Component</h2>
          <div className="button-examples">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="danger">Danger Button</Button>
            <Button disabled>Disabled Button</Button>
          </div>
        </section>

        <section className="component-section">
          <h2>Counter Component</h2>
          <Counter initialValue={0} />
        </section>

        <section className="component-section">
          <h2>Todo List Component</h2>
          <TodoList />
        </section>

        <section className="component-section">
          <h2>Testing Features - Step 11</h2>
          <div className="testing-info">
            <h3>포함된 테스트 유형:</h3>
            <ul>
              <li>✅ 단위 테스트 (Unit Tests)</li>
              <li>✅ 통합 테스트 (Integration Tests)</li>
              <li>✅ 사용자 상호작용 테스트</li>
              <li>✅ 비동기 테스트</li>
              <li>✅ 모킹 테스트</li>
              <li>✅ 커스텀 훅 테스트</li>
              <li>✅ 유틸리티 함수 테스트</li>
            </ul>
            <p>
              <strong>Step 11:</strong> React Testing Library를 사용한 포괄적인
              테스트 구현
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
