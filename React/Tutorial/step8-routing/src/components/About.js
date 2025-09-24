import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './About.css';

function About() {
  const location = useLocation();

  return (
    <div className='about'>
      <h2>소개 페이지</h2>
      <p>
        이 페이지는 React Router의 useLocation Hook을 사용하여 현재 경로 정보를
        보여줍니다.
      </p>

      <div className='location-info'>
        <h3>현재 위치 정보</h3>
        <p>
          <strong>경로:</strong> {location.pathname}
        </p>
        <p>
          <strong>검색 쿼리:</strong> {location.search || '없음'}
        </p>
        <p>
          <strong>해시:</strong> {location.hash || '없음'}
        </p>
        <p>
          <strong>상태:</strong>{' '}
          {location.state ? JSON.stringify(location.state) : '없음'}
        </p>
      </div>

      <div className='navigation'>
        <Link to='/' className='back-link'>
          ← 홈으로 돌아가기
        </Link>
      </div>

      <div className='code-example'>
        <strong>useLocation Hook 사용법:</strong>
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
          {`import { useLocation } from 'react-router-dom';

function MyComponent() {
  const location = useLocation();
  
  return (
    <div>
      <p>현재 경로: {location.pathname}</p>
      <p>검색 쿼리: {location.search}</p>
      <p>해시: {location.hash}</p>
      <p>상태: {JSON.stringify(location.state)}</p>
    </div>
  );
}`}
        </pre>
      </div>
    </div>
  );
}

export default About;
