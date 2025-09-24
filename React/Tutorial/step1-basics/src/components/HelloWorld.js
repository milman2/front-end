import React from 'react';

// 1. React란 무엇인가?
// React는 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리입니다.
// 컴포넌트 기반으로 UI를 구성하며, Virtual DOM을 사용해 효율적으로 렌더링합니다.

function HelloWorld() {
  return (
    <div className="component-section">
      <h2>1. React란 무엇인가?</h2>
      <p>
        React는 Facebook에서 개발한 JavaScript 라이브러리로, 
        사용자 인터페이스(UI)를 구축하기 위해 사용됩니다.
      </p>
      
      <div className="highlight">
        <strong>주요 특징:</strong>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li>컴포넌트 기반 아키텍처</li>
          <li>Virtual DOM 사용</li>
          <li>단방향 데이터 흐름</li>
          <li>선언적 프로그래밍</li>
        </ul>
      </div>

      <div className="code-example">
        <strong>Hello World 예제:</strong><br/>
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
          {`function HelloWorld() {
  return <h1>Hello, React World!</h1>;
}`}
        </pre>
      </div>

      <h3>실제 결과:</h3>
      <h1 style={{ color: '#61dafb' }}>Hello, React World!</h1>
    </div>
  );
}

export default HelloWorld;
