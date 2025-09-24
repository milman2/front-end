import React, { useState } from 'react';

// useState Hook을 사용한 상태 관리 예제
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="demo-box">
      <h3>카운터 예제</h3>
      <div className="counter">현재 카운트: {count}</div>
      <button 
        className="button" 
        onClick={() => setCount(count + 1)}
      >
        증가
      </button>
      <button 
        className="button" 
        onClick={() => setCount(count - 1)}
      >
        감소
      </button>
      <button 
        className="button" 
        onClick={() => setCount(0)}
      >
        리셋
      </button>
    </div>
  );
}

// 여러 상태를 관리하는 예제
function UserProfile() {
  const [name, setName] = useState('익명');
  const [age, setAge] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="demo-box">
      <h3>사용자 프로필</h3>
      
      <div>
        <label>
          이름: 
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ margin: '0 10px', padding: '5px' }}
          />
        </label>
      </div>
      
      <div style={{ margin: '10px 0' }}>
        <label>
          나이: 
          <input 
            type="number" 
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value) || 0)}
            style={{ margin: '0 10px', padding: '5px' }}
          />
        </label>
      </div>

      <button 
        className="button"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? '숨기기' : '보이기'}
      </button>

      {isVisible && (
        <div style={{ 
          background: '#e3f2fd', 
          padding: '15px', 
          margin: '15px 0',
          borderRadius: '5px'
        }}>
          <h4>프로필 정보</h4>
          <p><strong>이름:</strong> {name}</p>
          <p><strong>나이:</strong> {age}세</p>
          <p><strong>상태:</strong> {age >= 18 ? '성인' : '미성년자'}</p>
        </div>
      )}
    </div>
  );
}

function StateExample() {
  return (
    <div className="component-section">
      <h2>4. State 사용하기 (useState Hook)</h2>
      <p>
        State는 컴포넌트 내부에서 관리되는 변경 가능한 데이터입니다.
        useState Hook을 사용하여 함수형 컴포넌트에서도 상태를 관리할 수 있습니다.
      </p>

      <div className="code-example">
        <strong>useState Hook 사용법:</strong><br/>
        {`import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        증가
      </button>
    </div>
  );
}`}
      </div>

      <Counter />
      <UserProfile />

      <div className="highlight">
        <strong>useState Hook의 특징:</strong>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li>상태값과 상태 업데이트 함수를 반환</li>
          <li>초기값을 설정할 수 있음</li>
          <li>상태가 변경되면 컴포넌트가 리렌더링됨</li>
          <li>여러 개의 useState를 사용할 수 있음</li>
          <li>함수형 업데이트도 가능</li>
        </ul>
      </div>

      <div className="code-example">
        <strong>함수형 업데이트 예제:</strong><br/>
        {`// 현재 상태값을 기반으로 업데이트
setCount(prevCount => prevCount + 1);

// 여러 상태를 객체로 관리
const [user, setUser] = useState({ name: '', age: 0 });
setUser(prevUser => ({ ...prevUser, name: '새 이름' }));`}
      </div>
    </div>
  );
}

export default StateExample;
