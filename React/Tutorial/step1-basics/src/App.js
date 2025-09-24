import React from 'react';
import './App.css';
import HelloWorld from './components/HelloWorld';
import JSXBasics from './components/JSXBasics';
import ComponentBasics from './components/ComponentBasics';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React 기초 개념 학습</h1>
        <p>1단계: React 기본 개념들을 익혀보세요!</p>
      </header>
      
      <main className="App-main">
        <HelloWorld />
        <JSXBasics />
        <ComponentBasics />
      </main>
    </div>
  );
}

export default App;
