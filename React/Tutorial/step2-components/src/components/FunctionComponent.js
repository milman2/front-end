import React from "react";

// 함수형 컴포넌트 예제
// React 16.8 이후부터는 함수형 컴포넌트에서도 Hooks를 사용할 수 있어서
// 함수형 컴포넌트가 더 선호됩니다.

function FunctionComponent() {
  return (
    <div className="component-section">
      <h2>1. 함수형 컴포넌트 작성하기</h2>
      <p>
        함수형 컴포넌트는 JavaScript 함수로 작성된 React 컴포넌트입니다.
        간단하고 직관적이며, Hooks를 사용할 수 있습니다.
      </p>

      <div className="code-example">
        <strong>함수형 컴포넌트 예제:</strong>
        <br />
        <pre
          style={{
            background: "#f8f9fa",
            padding: "15px",
            borderRadius: "6px",
            overflow: "auto",
            fontSize: "14px",
            fontFamily: "monospace",
            border: "1px solid #e9ecef",
            margin: "10px 0",
          }}
        >
          {`function FunctionComponent() {
  return (
    <div>
      <h3>함수형 컴포넌트입니다!</h3>
      <p>이것은 함수로 작성된 React 컴포넌트입니다.</p>
    </div>
  );
}

export default FunctionComponent;`}
        </pre>
      </div>

      <div className="demo-box">
        <h3>함수형 컴포넌트입니다!</h3>
        <p>이것은 함수로 작성된 React 컴포넌트입니다.</p>
        <p>현재 시간: {new Date().toLocaleTimeString()}</p>
      </div>

      <div className="highlight">
        <strong>함수형 컴포넌트의 특징:</strong>
        <ul style={{ textAlign: "left", display: "inline-block" }}>
          <li>간단하고 직관적인 문법</li>
          <li>Hooks 사용 가능</li>
          <li>성능상 이점 (클래스형보다 가벼움)</li>
          <li>React 팀에서 권장하는 방식</li>
        </ul>
      </div>
    </div>
  );
}

export default FunctionComponent;
