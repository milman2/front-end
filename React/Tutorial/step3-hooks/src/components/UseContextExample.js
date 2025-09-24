import React, { createContext, useContext, useState } from 'react';

// Context 생성
const ThemeContext = createContext();
const UserContext = createContext();

// Theme Provider 컴포넌트
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// User Provider 컴포넌트
function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: '김개발',
    email: 'kim@example.com',
    role: 'developer'
  });

  const updateUser = (newUser) => {
    setUser(prev => ({ ...prev, ...newUser }));
  };

  const value = {
    user,
    updateUser
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// Theme을 사용하는 컴포넌트
function ThemeDisplay() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="demo-box" style={{
      backgroundColor: theme === 'light' ? '#ffffff' : '#333333',
      color: theme === 'light' ? '#000000' : '#ffffff',
      border: `2px solid ${theme === 'light' ? '#61dafb' : '#ffd700'}`
    }}>
      <h3>테마 표시</h3>
      <p>현재 테마: <strong>{theme}</strong></p>
      <button 
        className="button" 
        onClick={toggleTheme}
        style={{
          backgroundColor: theme === 'light' ? '#333' : '#61dafb',
          color: theme === 'light' ? '#fff' : '#333'
        }}
      >
        테마 변경
      </button>
    </div>
  );
}

// User 정보를 사용하는 컴포넌트
function UserProfile() {
  const { user, updateUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(user);

  const handleSave = () => {
    updateUser(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(user);
    setIsEditing(false);
  };

  return (
    <div className="demo-box">
      <h3>사용자 프로필</h3>
      {!isEditing ? (
        <div>
          <div className="user-card">
            <h4>{user.name}</h4>
            <p><strong>이메일:</strong> {user.email}</p>
            <p><strong>역할:</strong> {user.role}</p>
          </div>
          <button className="button" onClick={() => setIsEditing(true)}>
            편집
          </button>
        </div>
      ) : (
        <div style={{ textAlign: 'left', maxWidth: '300px', margin: '0 auto' }}>
          <div style={{ margin: '10px 0' }}>
            <label>이름: </label>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
              style={{ padding: '5px', width: '150px' }}
            />
          </div>
          <div style={{ margin: '10px 0' }}>
            <label>이메일: </label>
            <input
              type="email"
              value={editForm.email}
              onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
              style={{ padding: '5px', width: '150px' }}
            />
          </div>
          <div style={{ margin: '10px 0' }}>
            <label>역할: </label>
            <select
              value={editForm.role}
              onChange={(e) => setEditForm(prev => ({ ...prev, role: e.target.value }))}
              style={{ padding: '5px', width: '150px' }}
            >
              <option value="developer">개발자</option>
              <option value="designer">디자이너</option>
              <option value="manager">매니저</option>
            </select>
          </div>
          <div style={{ textAlign: 'center', margin: '15px 0' }}>
            <button className="button" onClick={handleSave}>저장</button>
            <button className="button" onClick={handleCancel}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
}

// 여러 Context를 사용하는 컴포넌트
function CombinedContext() {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);

  return (
    <div className="demo-box" style={{
      backgroundColor: theme === 'light' ? '#f0f8ff' : '#1a1a2e',
      color: theme === 'light' ? '#000' : '#fff',
      border: `2px solid ${theme === 'light' ? '#4169e1' : '#ffd700'}`
    }}>
      <h3>통합 컨텍스트</h3>
      <p>현재 테마: <strong>{theme}</strong></p>
      <p>사용자: <strong>{user.name}</strong> ({user.role})</p>
      <p>이 컴포넌트는 두 개의 Context를 모두 사용합니다!</p>
    </div>
  );
}

function UseContextExample() {
  return (
    <div className="component-section">
      <h2>3. useContext Hook으로 상태 관리하기</h2>
      <p>
        useContext는 React Context를 구독하는 Hook입니다. 
        Props drilling을 피하고 전역 상태를 관리할 때 유용합니다.
      </p>

      <div className="code-example">
        <strong>Context 생성과 사용:</strong><br/>
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

// 2. Provider로 감싸기
function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <MyComponent />
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

      <div className="highlight">
        <strong>Context의 특징:</strong>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li>Props drilling 문제 해결</li>
          <li>전역 상태 관리</li>
          <li>Provider로 범위 제한</li>
          <li>여러 Context 조합 가능</li>
          <li>성능 최적화 필요 (불필요한 리렌더링 방지)</li>
        </ul>
      </div>

      {/* Context Provider로 감싸기 */}
      <ThemeProvider>
        <UserProvider>
          <ThemeDisplay />
          <UserProfile />
          <CombinedContext />
        </UserProvider>
      </ThemeProvider>

      <div className="code-example">
        <strong>Context 사용 시 주의사항:</strong><br/>
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
          {`// 1. Context 분리 (관심사 분리)
const ThemeContext = createContext();
const UserContext = createContext();

// 2. Provider 컴포넌트 분리
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. 성능 최적화 (memo 사용)
const ExpensiveComponent = React.memo(() => {
  const { theme } = useContext(ThemeContext);
  return <div>{theme}</div>;
});`}
        </pre>
      </div>
    </div>
  );
}

export default UseContextExample;
