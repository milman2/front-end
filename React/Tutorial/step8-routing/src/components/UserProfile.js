import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './UserProfile.css';
import { getStoredUsers } from '../utils/initializeData';

function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = getStoredUsers().find(u => u.id === parseInt(id));

  if (!user) {
    return (
      <div className='user-profile'>
        <div className='error'>
          <h2>사용자를 찾을 수 없습니다</h2>
          <p>요청하신 사용자가 존재하지 않습니다.</p>
          <button onClick={() => navigate('/')} className='back-button'>
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const getRoleDisplayName = role => {
    const roleMap = {
      developer: '개발자',
      designer: '디자이너',
      planner: '기획자',
    };
    return roleMap[role] || role;
  };

  return (
    <div className='user-profile'>
      <h2>사용자 프로필</h2>

      <div className='user-info'>
        <div className='avatar'>
          <span className='avatar-text'>{user.name.charAt(0)}</span>
        </div>
        <h3>{user.name}</h3>
        <p className='email'>{user.email}</p>
        <p className='role'>{getRoleDisplayName(user.role)}</p>
      </div>

      <div className='user-actions'>
        <button
          onClick={() => navigate(`/user/${user.id}/edit`)}
          className='edit-button'
        >
          프로필 편집
        </button>
        <button
          onClick={() => navigate(`/user/${user.id}/posts`)}
          className='posts-button'
        >
          게시글 보기
        </button>
      </div>

      <div className='navigation'>
        <button onClick={() => navigate(-1)} className='back-button'>
          이전 페이지로
        </button>
        <Link to='/' className='home-link'>
          홈으로
        </Link>
      </div>

      <div className='code-example'>
        <strong>동적 라우팅과 useParams 사용법:</strong>
        <br />
        <pre
          style={{
            background: '#f8f9fa',
            padding: '15px',
            borderRadius: '6px',
            overflow: 'auto',
            fontSize: '14px',
            fontFamily: 'monospace',
            border: '1px solid #e9ecef',
            margin: '10px 0',
          }}
        >
          {`// App.js에서 동적 라우팅 설정
<Route path="/user/:id" element={<UserProfile />} />
<Route path="/user/:id/edit" element={<EditProfile />} />
<Route path="/user/:id/posts" element={<UserPosts />} />

// UserProfile.js에서 파라미터 사용
function UserProfile() {
  const { id } = useParams(); // URL에서 :id 값 추출
  
  const user = users.find(u => u.id === parseInt(id));
  
  return <div>사용자 ID: {id}</div>;
}`}
        </pre>
      </div>
    </div>
  );
}

export default UserProfile;
