import React from 'react';
import './App.css';
import ControlledComponents from './components/ControlledComponents';
import UncontrolledComponents from './components/UncontrolledComponents';
import FormValidation from './components/FormValidation';
import InputTypes from './components/InputTypes';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React 폼 처리와 사용자 입력</h1>
        <p>5단계: 폼 처리의 모든 것을 익혀보세요!</p>
      </header>
      
      <main className="App-main">
        <ControlledComponents />
        <UncontrolledComponents />
        <FormValidation />
        <InputTypes />
      </main>
    </div>
  );
}

export default App;
