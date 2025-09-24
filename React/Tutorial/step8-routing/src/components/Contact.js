import React from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

function Contact() {
  return (
    <div className='contact'>
      <h2>연락처</h2>
      <p>React Router를 사용한 간단한 연락처 페이지입니다.</p>

      <div className='contact-info'>
        <h3>연락처 정보</h3>
        <div className='contact-item'>
          <strong>이메일:</strong> contact@example.com
        </div>
        <div className='contact-item'>
          <strong>전화번호:</strong> 02-1234-5678
        </div>
        <div className='contact-item'>
          <strong>주소:</strong> 서울시 강남구 테헤란로 123
        </div>
      </div>

      <div className='navigation'>
        <Link to='/' className='back-link'>
          ← 홈으로 돌아가기
        </Link>
      </div>

      <div className='code-example'>
        <strong>간단한 정적 라우팅:</strong>
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
          {`// App.js에서 정적 라우팅 설정
<Route path="/contact" element={<Contact />} />

// Contact.js - 간단한 정적 컴포넌트
function Contact() {
  return (
    <div>
      <h2>연락처</h2>
      <p>연락처 정보를 표시합니다.</p>
    </div>
  );
}`}
        </pre>
      </div>
    </div>
  );
}

export default Contact;
