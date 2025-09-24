import React from 'react';
import './App.css';
import ConditionalRendering from './components/ConditionalRendering';
import ListRendering from './components/ListRendering';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>React 6단계: 조건부 렌더링과 리스트</h1>
        <p>조건부 렌더링과 리스트 렌더링을 학습합니다</p>
      </header>

      <main className='App-main'>
        <ConditionalRendering />
        <ListRendering />
      </main>
    </div>
  );
}

export default App;
