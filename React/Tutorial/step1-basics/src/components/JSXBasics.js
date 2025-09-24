import React from "react";

// 2. JSX 문법
// JSX는 JavaScript XML의 줄임말로, JavaScript 안에서 HTML과 유사한 문법을 사용할 수 있게 해줍니다.
// JSX는 React.createElement()를 호출하는 문법적 설탕(syntactic sugar)입니다.

function JSXBasics() {
  const name = "React 개발자";
  const age = 25;
  const isStudent = true;
  const hobbies = ["코딩", "독서", "운동"];

  return (
    <div className="component-section">
      <h2>2. JSX 문법 익히기</h2>
      <p>
        JSX는 JavaScript 안에서 HTML과 유사한 문법을 사용할 수 있게 해주는
        React의 문법적 확장입니다.
      </p>

      <div className="highlight">
        <strong>JSX의 특징:</strong>
        <ul style={{ textAlign: "left", display: "inline-block" }}>
          <li>JavaScript 표현식을 중괄호 {} 안에 넣을 수 있음</li>
          <li>HTML과 유사하지만 몇 가지 차이점이 있음</li>
          <li>className을 사용 (class 대신)</li>
          <li>자체 닫는 태그는 반드시 /로 끝나야 함</li>
        </ul>
      </div>

      <div className="code-example">
        <strong>JSX 예제:</strong>
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
          {`const name = "React 개발자";
const age = 25;

return (
  <div>
    <h2>안녕하세요, {name}님!</h2>
    <p>나이: {age}세</p>
    <p>학생 여부: {isStudent ? '예' : '아니오'}</p>
  </div>
);`}
        </pre>
      </div>

      <h3>실제 결과:</h3>
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "5px",
          border: "1px solid #ddd",
        }}
      >
        <h2 style={{ color: "#282c34" }}>안녕하세요, {name}님!</h2>
        <p>
          <strong>나이:</strong> {age}세
        </p>
        <p>
          <strong>학생 여부:</strong> {isStudent ? "예" : "아니오"}
        </p>
        <p>
          <strong>취미:</strong> {hobbies.join(", ")}
        </p>
        <p>
          <strong>계산 예제:</strong> 10 + 5 = {10 + 5}
        </p>
      </div>

      <div className="highlight">
        <strong>주의사항:</strong>
        <ul style={{ textAlign: "left", display: "inline-block" }}>
          <li>JSX는 반드시 하나의 부모 요소로 감싸야 함</li>
          <li>JavaScript 예약어는 사용할 수 없음 (class → className)</li>
          <li>모든 태그는 닫혀야 함 (&lt;br/&gt;, &lt;img/&gt; 등)</li>
        </ul>
      </div>
    </div>
  );
}

export default JSXBasics;
