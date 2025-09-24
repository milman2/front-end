import React from 'react';
import './App.css';
import { ThemeProvider } from './components/ThemeContext';
import { UserProvider } from './components/UserContext';
import { ShoppingCartProvider } from './components/ShoppingCartContext';
import ThemeExample from './components/ThemeExample';
import UserExample from './components/UserExample';
import ShoppingCartExample from './components/ShoppingCartExample';
import ContextPatterns from './components/ContextPatterns';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>React 7단계: Context API와 전역 상태 관리</h1>
        <p>Context API를 사용한 전역 상태 관리와 모범 사례를 학습합니다</p>
      </header>

      <main className='App-main'>
        <ThemeProvider>
          <UserProvider>
            <ShoppingCartProvider>
              <ThemeExample />
              <UserExample />
              <ShoppingCartExample />
              <ContextPatterns />
            </ShoppingCartProvider>
          </UserProvider>
        </ThemeProvider>
      </main>
    </div>
  );
}

export default App;
