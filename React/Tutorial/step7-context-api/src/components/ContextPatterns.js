import React from 'react';
import './ContextPatterns.css';

function ContextPatterns() {
  return (
    <div className="context-patterns">
      <h3>Context API 패턴과 모범 사례</h3>
      
      <div className="pattern-section">
        <h4>1. Context 분리 (관심사 분리)</h4>
        <div className="code-example">
          <strong>여러 Context 분리:</strong>
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
            {`// ❌ 나쁜 예: 모든 상태를 하나의 Context에
const AppContext = createContext();

// ✅ 좋은 예: 관심사별로 분리
const ThemeContext = createContext();
const UserContext = createContext();
const CartContext = createContext();

// Provider 조합
function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  );
}`}
          </pre>
        </div>
      </div>

      <div className="pattern-section">
        <h4>2. Custom Hook 패턴</h4>
        <div className="code-example">
          <strong>Custom Hook으로 Context 래핑:</strong>
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
            {`// Context와 Hook을 함께 제공
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// 사용법
function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  // Context 직접 사용 대신 Hook 사용
}`}
          </pre>
        </div>
      </div>

      <div className="pattern-section">
        <h4>3. 성능 최적화</h4>
        <div className="code-example">
          <strong>메모이제이션과 최적화:</strong>
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
            {`// 1. useMemo로 value 객체 메모이제이션
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const value = useMemo(() => ({
    theme,
    setTheme,
    toggleTheme: () => setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }), [theme]);
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 2. React.memo로 불필요한 리렌더링 방지
const ExpensiveComponent = React.memo(({ theme }) => {
  return <div className={theme}>비용이 큰 컴포넌트</div>;
});`}
          </pre>
        </div>
      </div>

      <div className="pattern-section">
        <h4>4. Context vs Redux 선택 가이드</h4>
        <div className="comparison">
          <div className="context-advantages">
            <h5>Context API 사용 시기:</h5>
            <ul>
              <li>간단한 전역 상태 관리</li>
              <li>테마, 언어 설정 등</li>
              <li>사용자 인증 정보</li>
              <li>작은 규모의 애플리케이션</li>
            </ul>
          </div>
          <div className="redux-advantages">
            <h5>Redux 사용 시기:</h5>
            <ul>
              <li>복잡한 상태 로직</li>
              <li>시간 여행 디버깅 필요</li>
              <li>미들웨어가 필요한 경우</li>
              <li>대규모 애플리케이션</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="pattern-section">
        <h4>5. Context 주의사항</h4>
        <div className="warnings">
          <ul>
            <li><strong>과도한 Context 사용:</strong> 모든 상태를 Context로 관리하지 말 것</li>
            <li><strong>성능 문제:</strong> Context 값이 자주 변경되면 모든 소비자가 리렌더링</li>
            <li><strong>의존성 관리:</strong> Context 간 의존성을 최소화</li>
            <li><strong>타입 안정성:</strong> TypeScript와 함께 사용 시 타입 정의 필수</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ContextPatterns;
