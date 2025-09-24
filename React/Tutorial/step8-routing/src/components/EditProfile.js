import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './EditProfile.css';
import { getStoredUsers, updateUser } from '../utils/initializeData';

function EditProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const user = getStoredUsers().find(u => u.id === parseInt(id));
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'developer',
  });

  if (!user) {
    return (
      <div className='edit-profile'>
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

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // 실제로는 API 호출
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 유틸리티 함수를 사용하여 사용자 정보 업데이트
      updateUser(parseInt(id), {
        name: formData.name,
        email: formData.email,
        role: formData.role,
      });

      setMessage('프로필이 성공적으로 업데이트되었습니다!');

      // 2초 후 프로필 페이지로 이동
      setTimeout(() => {
        navigate(`/user/${id}`);
      }, 2000);
    } catch (error) {
      setMessage('업데이트 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='edit-profile'>
      <h2>프로필 편집</h2>
      <p>사용자 정보를 수정할 수 있습니다.</p>

      <form onSubmit={handleSubmit} className='profile-form'>
        <div className='form-group'>
          <label htmlFor='name'>이름</label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            required
            disabled={isLoading}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>이메일</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            required
            disabled={isLoading}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='role'>역할</label>
          <select
            id='role'
            name='role'
            value={formData.role}
            onChange={handleInputChange}
            disabled={isLoading}
          >
            <option value='developer'>개발자</option>
            <option value='designer'>디자이너</option>
            <option value='planner'>기획자</option>
          </select>
        </div>

        {message && (
          <div
            className={`message ${message.includes('성공') ? 'success' : 'error'}`}
          >
            {message}
          </div>
        )}

        <div className='form-actions'>
          <button type='submit' disabled={isLoading} className='save-button'>
            {isLoading ? '저장 중...' : '저장'}
          </button>
          <button
            type='button'
            onClick={() => navigate(`/user/${id}`)}
            disabled={isLoading}
            className='cancel-button'
          >
            취소
          </button>
        </div>
      </form>

      <div className='navigation'>
        <button onClick={() => navigate(-1)} className='back-button'>
          이전 페이지로
        </button>
        <Link to='/' className='home-link'>
          홈으로
        </Link>
      </div>

      <div className='code-example'>
        <strong>중첩 라우팅과 폼 처리:</strong>
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
          {`// App.js에서 중첩 라우팅 설정
<Route path="/user/:id" element={<UserProfile />}>
  <Route path="edit" element={<EditProfile />} />
  <Route path="posts" element={<UserPosts />} />
</Route>

// EditProfile.js에서 폼 처리
function EditProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // API 호출 및 업데이트
    await updateUser(id, formData);
    navigate(\`/user/\${id}\`); // 프로필 페이지로 이동
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}`}
        </pre>
      </div>
    </div>
  );
}

export default EditProfile;
