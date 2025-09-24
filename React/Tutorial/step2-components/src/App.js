import React from 'react';
import './App.css';
import FunctionComponent from './components/FunctionComponent';
import ClassComponent from './components/ClassComponent';
import PropsExample from './components/PropsExample';
import StateExample from './components/StateExample';
import EventHandling from './components/EventHandling';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React 기본 컴포넌트 작성</h1>
        <p>2단계: 컴포넌트, Props, State, 이벤트 핸들링을 익혀보세요!</p>
      </header>
      
      <main className="App-main">
        <FunctionComponent />
        <ClassComponent />
        <PropsExample />
        <StateExample />
        <EventHandling />
      </main>
    </div>
  );
}

export default App;
