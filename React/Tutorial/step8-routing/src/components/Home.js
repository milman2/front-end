import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className='home'>
      <h2>홈 페이지</h2>
      <p>React Router를 사용한 라우팅 예제에 오신 것을 환영합니다!</p>

      <div className='navigation-links'>
        <h3>페이지 탐색</h3>
        <ul>
          <li>
            <Link to='/about'>소개 페이지</Link>
          </li>
          <li>
            <Link to='/products'>상품 목록</Link>
          </li>
          <li>
            <Link to='/contact'>연락처</Link>
          </li>
          <li>
            <Link to='/user/123'>사용자 프로필 (ID: 123)</Link>
          </li>
        </ul>
      </div>

      <div className='code-example'>
        <strong>기본 라우팅 설정:</strong>
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
          {`import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}`}
        </pre>
      </div>
    </div>
  );
}

export default Home;
