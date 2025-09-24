import React, { useState } from 'react';
import './ConditionalRendering.css';

function ConditionalRendering() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: '', email: '' });
  const [showDetails, setShowDetails] = useState(false);
  const [theme, setTheme] = useState('light');

  const handleLogin = () => {
    setUser({ name: '홍길동', email: 'hong@example.com' });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser({ name: '', email: '' });
    setIsLoggedIn(false);
    setShowDetails(false);
  };

  return (
    <div className={`conditional-rendering ${theme}`}>
      <h2>조건부 렌더링 예제</h2>

      {/* 1. 삼항 연산자를 사용한 조건부 렌더링 */}
      <div className='demo-section'>
        <h3>1. 삼항 연산자 (Ternary Operator)</h3>
        {isLoggedIn ? (
          <div className='user-info'>
            <h4>환영합니다, {user.name}님!</h4>
            <p>이메일: {user.email}</p>
            <button onClick={handleLogout}>로그아웃</button>
          </div>
        ) : (
          <div className='login-form'>
            <h4>로그인이 필요합니다</h4>
            <button onClick={handleLogin}>로그인</button>
          </div>
        )}
      </div>

      {/* 2. 논리 연산자를 사용한 조건부 렌더링 */}
      <div className='demo-section'>
        <h3>2. 논리 연산자 (Logical Operator)</h3>
        {isLoggedIn && (
          <div className='user-actions'>
            <button onClick={() => setShowDetails(!showDetails)}>
              {showDetails ? '상세 정보 숨기기' : '상세 정보 보기'}
            </button>

            {showDetails && (
              <div className='user-details'>
                <p>
                  <strong>사용자 ID:</strong> 12345
                </p>
                <p>
                  <strong>가입일:</strong> 2024-01-01
                </p>
                <p>
                  <strong>마지막 로그인:</strong> 방금 전
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. 조건부 스타일링 */}
      <div className='demo-section'>
        <h3>3. 조건부 스타일링</h3>
        <div className='theme-selector'>
          <button
            className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
            onClick={() => setTheme('light')}
          >
            라이트 테마
          </button>
          <button
            className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => setTheme('dark')}
          >
            다크 테마
          </button>
        </div>

        <div className='status-indicator'>
          <div className={`status ${isLoggedIn ? 'online' : 'offline'}`}>
            {isLoggedIn ? '온라인' : '오프라인'}
          </div>
        </div>
      </div>

      {/* 4. 조건부 클래스 적용 */}
      <div className='demo-section'>
        <h3>4. 조건부 클래스 적용</h3>
        <div className='notification-container'>
          <div className={`notification ${isLoggedIn ? 'success' : 'warning'}`}>
            {isLoggedIn ? '로그인 성공!' : '로그인이 필요합니다.'}
          </div>
        </div>
      </div>

      {/* 5. 복합 조건부 렌더링 */}
      <div className='demo-section'>
        <h3>5. 복합 조건부 렌더링</h3>
        {!isLoggedIn ? (
          <div className='guest-message'>
            <p>게스트로 접속 중입니다.</p>
            <p>더 많은 기능을 사용하려면 로그인하세요.</p>
          </div>
        ) : showDetails ? (
          <div className='full-profile'>
            <h4>전체 프로필</h4>
            <div className='profile-grid'>
              <div className='profile-item'>
                <label>이름:</label>
                <span>{user.name}</span>
              </div>
              <div className='profile-item'>
                <label>이메일:</label>
                <span>{user.email}</span>
              </div>
              <div className='profile-item'>
                <label>상태:</label>
                <span className='status-badge active'>활성</span>
              </div>
            </div>
          </div>
        ) : (
          <div className='simple-profile'>
            <p>간단한 프로필 정보만 표시됩니다.</p>
            <p>상세 정보를 보려면 위의 버튼을 클릭하세요.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ConditionalRendering;
