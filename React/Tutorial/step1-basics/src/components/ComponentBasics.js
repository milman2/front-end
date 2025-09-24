import React from 'react';

// 3. 컴포넌트 개념
// 컴포넌트는 UI를 독립적이고 재사용 가능한 조각으로 나눈 것입니다.
// 각 컴포넌트는 고유한 상태와 로직을 가질 수 있습니다.

// 함수형 컴포넌트 예제
function WelcomeMessage({ name, title }) {
  return (
    <div style={{ 
      background: '#e3f2fd', 
      padding: '15px', 
      borderRadius: '5px',
      margin: '10px 0'
    }}>
      <h3>환영합니다, {name}님!</h3>
      <p>직책: {title}</p>
    </div>
  );
}

// Props와 State의 차이점을 보여주는 컴포넌트
function PropsVsState() {
  // Props: 부모 컴포넌트에서 전달받는 읽기 전용 데이터
  // State: 컴포넌트 내부에서 관리하는 변경 가능한 데이터
  
  return (
    <div style={{ 
      background: '#f3e5f5', 
      padding: '15px', 
      borderRadius: '5px',
      margin: '10px 0'
    }}>
      <h4>Props vs State</h4>
      <p><strong>Props:</strong> 부모에서 자식으로 전달되는 읽기 전용 데이터</p>
      <p><strong>State:</strong> 컴포넌트 내부에서 관리하는 변경 가능한 데이터</p>
    </div>
  );
}

// Virtual DOM 설명 컴포넌트
function VirtualDOMExplanation() {
  return (
    <div style={{ 
      background: '#e8f5e8', 
      padding: '15px', 
      borderRadius: '5px',
      margin: '10px 0'
    }}>
      <h4>Virtual DOM이란?</h4>
      <p>Virtual DOM은 실제 DOM의 가벼운 복사본입니다.</p>
      <p>React는 상태가 변경될 때마다 Virtual DOM을 새로 생성하고,</p>
      <p>이전 Virtual DOM과 비교하여 실제로 변경된 부분만 DOM에 반영합니다.</p>
      <p><strong>장점:</strong> 빠른 렌더링, 효율적인 업데이트</p>
    </div>
  );
}

function ComponentBasics() {
  return (
    <div className="component-section">
      <h2>3. 컴포넌트 개념 이해하기</h2>
      <p>
        컴포넌트는 React의 핵심 개념으로, UI를 독립적이고 재사용 가능한 
        조각으로 나눈 것입니다.
      </p>

      <div className="code-example">
        <strong>함수형 컴포넌트 예제:</strong><br/>
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
          {`function WelcomeMessage({ name, title }) {
  return (
    <div>
      <h3>환영합니다, {name}님!</h3>
      <p>직책: {title}</p>
    </div>
  );
}`}
        </pre>
      </div>

      <h3>컴포넌트 사용 예제:</h3>
      <WelcomeMessage name="김개발" title="프론트엔드 개발자" />
      <WelcomeMessage name="이리액트" title="React 전문가" />

      <PropsVsState />
      <VirtualDOMExplanation />

      <div className="highlight">
        <strong>컴포넌트의 특징:</strong>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li>재사용 가능</li>
          <li>독립적</li>
          <li>조합 가능</li>
          <li>Props를 통해 데이터 전달</li>
          <li>State를 통해 내부 상태 관리</li>
        </ul>
      </div>
    </div>
  );
}

export default ComponentBasics;
