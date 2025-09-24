import React from 'react';
import { useTheme } from './ThemeContext';
import './ThemeExample.css';

function ThemeExample() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`theme-example ${theme}`}>
      <h3>테마 Context 예제</h3>
      <p>현재 테마: {theme}</p>
      <button onClick={toggleTheme} className="theme-toggle">
        {theme === 'light' ? '다크 모드로 변경' : '라이트 모드로 변경'}
      </button>
      
      <div className="content">
        <h4>Context API 기본 사용법</h4>
        <div className="code-example">
          <strong>Context 생성과 사용:</strong>
          <br />
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
            {`// 1. Context 생성
const ThemeContext = createContext();

// 2. Provider 컴포넌트
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. useContext로 사용
function MyComponent() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return <div>현재 테마: {theme}</div>;
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default ThemeExample;
