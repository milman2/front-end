import React from 'react';
import './App.css';
import ComponentLifecycle from './components/ComponentLifecycle';
import SideEffects from './components/SideEffects';
import APICallPatterns from './components/APICallPatterns';
import CleanupExamples from './components/CleanupExamples';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React 생명주기와 사이드 이펙트</h1>
        <p>4단계: 컴포넌트 생명주기와 사이드 이펙트를 완전히 이해해보세요!</p>
      </header>
      
      <main className="App-main">
        <ComponentLifecycle />
        <SideEffects />
        <APICallPatterns />
        <CleanupExamples />
      </main>
    </div>
  );
}

export default App;
