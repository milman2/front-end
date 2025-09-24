import React, { useState } from 'react';

// 기본 이벤트 핸들링 예제
function BasicEvents() {
  const [message, setMessage] = useState('버튼을 클릭해보세요!');

  const handleClick = () => {
    setMessage('버튼이 클릭되었습니다! 🎉');
  };

  const handleMouseEnter = () => {
    setMessage('마우스가 버튼 위에 있습니다! 🖱️');
  };

  const handleMouseLeave = () => {
    setMessage('마우스가 버튼을 벗어났습니다! 👋');
  };

  return (
    <div className="demo-box">
      <h3>기본 이벤트 핸들링</h3>
      <p>{message}</p>
      <button 
        className="button"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        클릭하거나 마우스를 올려보세요
      </button>
    </div>
  );
}

// 폼 이벤트 핸들링 예제
function FormEvents() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
    alert(`제출된 데이터:\n이름: ${formData.name}\n이메일: ${formData.email}\n메시지: ${formData.message}`);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="demo-box">
      <h3>폼 이벤트 핸들링</h3>
      <form onSubmit={handleSubmit} style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
        <div style={{ margin: '10px 0' }}>
          <label>
            이름:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '5px', marginTop: '5px' }}
            />
          </label>
        </div>
        
        <div style={{ margin: '10px 0' }}>
          <label>
            이메일:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '5px', marginTop: '5px' }}
            />
          </label>
        </div>
        
        <div style={{ margin: '10px 0' }}>
          <label>
            메시지:
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows="3"
              style={{ width: '100%', padding: '5px', marginTop: '5px' }}
            />
          </label>
        </div>
        
        <div style={{ textAlign: 'center', margin: '15px 0' }}>
          <button type="submit" className="button">제출</button>
          <button type="button" className="button" onClick={handleReset}>리셋</button>
        </div>
      </form>
    </div>
  );
}

// 키보드 이벤트 예제
function KeyboardEvents() {
  const [keyInfo, setKeyInfo] = useState('키를 눌러보세요!');

  const handleKeyDown = (e) => {
    setKeyInfo(`눌린 키: ${e.key}, 코드: ${e.code}`);
  };

  const handleKeyUp = (e) => {
    setKeyInfo(`떼어진 키: ${e.key}`);
  };

  return (
    <div className="demo-box">
      <h3>키보드 이벤트</h3>
      <p>{keyInfo}</p>
      <input
        type="text"
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        placeholder="여기에 타이핑해보세요"
        style={{ padding: '10px', width: '300px' }}
      />
    </div>
  );
}

function EventHandling() {
  return (
    <div className="component-section">
      <h2>5. 이벤트 핸들링하기</h2>
      <p>
        React에서 이벤트는 camelCase로 명명되며, JSX에 함수로 전달됩니다.
        이벤트 핸들러는 사용자의 상호작용에 반응하여 상태를 업데이트하거나 
        다른 작업을 수행합니다.
      </p>

      <div className="code-example">
        <strong>이벤트 핸들링 기본 문법:</strong><br/>
        {`function MyComponent() {
  const handleClick = () => {
    console.log('버튼이 클릭되었습니다!');
  };

  return (
    <button onClick={handleClick}>
      클릭하세요
    </button>
  );
}`}
      </div>

      <BasicEvents />
      <FormEvents />
      <KeyboardEvents />

      <div className="highlight">
        <strong>이벤트 핸들링의 특징:</strong>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li>camelCase로 명명 (onClick, onChange 등)</li>
          <li>함수를 JSX에 전달</li>
          <li>이벤트 객체는 SyntheticEvent</li>
          <li>preventDefault()로 기본 동작 방지</li>
          <li>stopPropagation()으로 이벤트 전파 방지</li>
        </ul>
      </div>

      <div className="code-example">
        <strong>주요 이벤트들:</strong><br/>
        {`// 마우스 이벤트
onClick, onDoubleClick, onMouseEnter, onMouseLeave

// 키보드 이벤트  
onKeyDown, onKeyUp, onKeyPress

// 폼 이벤트
onChange, onSubmit, onFocus, onBlur

// 기타 이벤트
onLoad, onError, onScroll, onResize`}
      </div>
    </div>
  );
}

export default EventHandling;
