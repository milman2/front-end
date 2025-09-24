import React from 'react';
import './App.css';
import UseStateExample from './components/UseStateExample';
import UseEffectExample from './components/UseEffectExample';
import UseContextExample from './components/UseContextExample';
import UseReducerExample from './components/UseReducerExample';
import UseRefExample from './components/UseRefExample';
import CustomHookExample from './components/CustomHookExample';
import PerformanceOptimization from './components/PerformanceOptimization';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Hooks 마스터하기</h1>
        <p>3단계: React Hooks를 완전히 익혀보세요!</p>
      </header>
      
      <main className="App-main">
        <UseStateExample />
        <UseEffectExample />
        <UseContextExample />
        <UseReducerExample />
        <UseRefExample />
        <CustomHookExample />
        <PerformanceOptimization />
      </main>
    </div>
  );
}

export default App;
