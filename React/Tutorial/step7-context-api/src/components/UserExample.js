import React, { useState } from 'react';
import { useUser } from './UserContext';
import './UserExample.css';

function UserExample() {
  const { user, isAuthenticated, isLoading, login, logout, updateProfile } = useUser();
  const [credentials, setCredentials] = useState({ username: '', email: '' });
  const [profileUpdates, setProfileUpdates] = useState({ name: '', email: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      setCredentials({ username: '', email: '' });
    } catch (error) {
      alert('로그인 실패: ' + error.message);
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateProfile(profileUpdates);
    setProfileUpdates({ name: '', email: '' });
  };

  return (
    <div className="user-example">
      <h3>사용자 Context 예제</h3>
      
      {!isAuthenticated ? (
        <div className="login-section">
          <h4>로그인</h4>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="사용자명"
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
              required
            />
            <input
              type="email"
              placeholder="이메일"
              value={credentials.email}
              onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
              required
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? '로그인 중...' : '로그인'}
            </button>
          </form>
        </div>
      ) : (
        <div className="user-section">
          <h4>사용자 정보</h4>
          <div className="user-info">
            <p><strong>이름:</strong> {user.name}</p>
            <p><strong>이메일:</strong> {user.email}</p>
            <p><strong>아바타:</strong> {user.avatar}</p>
          </div>
          
          <div className="profile-update">
            <h5>프로필 업데이트</h5>
            <form onSubmit={handleUpdateProfile}>
              <input
                type="text"
                placeholder="새 이름"
                value={profileUpdates.name}
                onChange={(e) => setProfileUpdates(prev => ({ ...prev, name: e.target.value }))}
              />
              <input
                type="email"
                placeholder="새 이메일"
                value={profileUpdates.email}
                onChange={(e) => setProfileUpdates(prev => ({ ...prev, email: e.target.value }))}
              />
              <button type="submit">업데이트</button>
            </form>
          </div>
          
          <button onClick={logout} className="logout-btn">
            로그아웃
          </button>
        </div>
      )}

      <div className="code-example">
        <strong>사용자 Context 사용법:</strong>
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
          {`// 사용자 Context 사용
function MyComponent() {
  const { user, isAuthenticated, login, logout } = useUser();
  
  if (!isAuthenticated) {
    return <LoginForm onLogin={login} />;
  }
  
  return (
    <div>
      <h2>안녕하세요, {user.name}님!</h2>
      <button onClick={logout}>로그아웃</button>
    </div>
  );
}`}
        </pre>
      </div>
    </div>
  );
}

export default UserExample;
