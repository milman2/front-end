import React, { Component } from 'react';

// 클래스형 컴포넌트 예제
// React 16.8 이전에는 상태 관리와 생명주기 메서드를 위해 클래스형 컴포넌트를 사용했습니다.
// 현재는 Hooks가 도입되어 함수형 컴포넌트를 주로 사용하지만, 
// 기존 코드를 이해하기 위해 알아두는 것이 좋습니다.

class ClassComponent extends Component {
  render() {
    return (
      <div className="component-section">
        <h2>2. 클래스형 컴포넌트 작성하기 (참고용)</h2>
        <p>
          클래스형 컴포넌트는 ES6 클래스로 작성된 React 컴포넌트입니다.
          현재는 함수형 컴포넌트 + Hooks를 주로 사용하지만, 
          기존 코드를 이해하기 위해 알아두는 것이 좋습니다.
        </p>

        <div className="code-example">
          <strong>클래스형 컴포넌트 예제:</strong><br/>
          {`import React, { Component } from 'react';

class ClassComponent extends Component {
  render() {
    return (
      <div>
        <h3>클래스형 컴포넌트입니다!</h3>
        <p>이것은 클래스로 작성된 React 컴포넌트입니다.</p>
      </div>
    );
  }
}

export default ClassComponent;`}
        </div>

        <div className="demo-box">
          <h3>클래스형 컴포넌트입니다!</h3>
          <p>이것은 클래스로 작성된 React 컴포넌트입니다.</p>
          <p>컴포넌트가 마운트된 시간: {new Date().toLocaleTimeString()}</p>
        </div>

        <div className="highlight">
          <strong>클래스형 vs 함수형 컴포넌트:</strong>
          <ul style={{ textAlign: 'left', display: 'inline-block' }}>
            <li><strong>클래스형:</strong> this 키워드 사용, 생명주기 메서드</li>
            <li><strong>함수형:</strong> Hooks 사용, 더 간단한 문법</li>
            <li><strong>현재 권장:</strong> 함수형 컴포넌트 + Hooks</li>
            <li><strong>학습 목적:</strong> 기존 코드 이해를 위해 알아두기</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default ClassComponent;
