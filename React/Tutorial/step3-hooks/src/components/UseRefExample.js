import React, { useRef, useState, useEffect } from 'react';
import usePrevious from '../hooks/usePrevious';

// 1. DOM 요소에 직접 접근하기
function DOMAccessExample() {
  const inputRef = useRef(null);
  const divRef = useRef(null);
  
  const focusInput = () => {
    inputRef.current.focus();
  };
  
  const changeDivColor = () => {
    divRef.current.style.backgroundColor = 
      divRef.current.style.backgroundColor === 'lightblue' ? 'lightgreen' : 'lightblue';
  };
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px 0' }}>
      <h3>1. DOM 요소에 직접 접근하기</h3>
      <input 
        ref={inputRef} 
        type="text" 
        placeholder="포커스를 받을 입력창"
        style={{ margin: '10px', padding: '5px' }}
      />
      <button onClick={focusInput} style={{ margin: '10px' }}>
        입력창에 포커스
      </button>
      
      <div 
        ref={divRef}
        style={{ 
          width: '200px', 
          height: '100px', 
          backgroundColor: 'lightblue',
          margin: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}
        onClick={changeDivColor}
      >
        클릭하면 색상 변경
      </div>
    </div>
  );
}

// 2. 변경 가능한 값 저장하기 (리렌더링 없음)
function MutableValueExample() {
  const [count, setCount] = useState(0);
  const renderCountRef = useRef(0);
  const intervalRef = useRef(null);
  
  // 렌더링 횟수 추적
  renderCountRef.current += 1;
  
  const startTimer = () => {
    if (intervalRef.current) return; // 이미 실행 중이면 무시
    
    intervalRef.current = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);
  };
  
  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  
  const resetCount = () => {
    setCount(0);
    stopTimer();
  };
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px 0' }}>
      <h3>2. 변경 가능한 값 저장하기</h3>
      <p>카운트: {count}</p>
      <p>렌더링 횟수: {renderCountRef.current}</p>
      <button onClick={startTimer} style={{ margin: '5px' }}>타이머 시작</button>
      <button onClick={stopTimer} style={{ margin: '5px' }}>타이머 정지</button>
      <button onClick={resetCount} style={{ margin: '5px' }}>리셋</button>
    </div>
  );
}

// 3. 이전 값 추적하기
function PreviousValueExample() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const prevNameRef = useRef();
  const prevAgeRef = useRef();
  
  useEffect(() => {
    prevNameRef.current = name;
  });
  
  useEffect(() => {
    prevAgeRef.current = age;
  });
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px 0' }}>
      <h3>3. 이전 값 추적하기</h3>
      <div style={{ margin: '10px 0' }}>
        <label>
          이름: 
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ margin: '5px', padding: '5px' }}
          />
        </label>
        <p>현재 이름: {name}</p>
        <p>이전 이름: {prevNameRef.current}</p>
      </div>
      
      <div style={{ margin: '10px 0' }}>
        <label>
          나이: 
          <input 
            type="number" 
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            style={{ margin: '5px', padding: '5px' }}
          />
        </label>
        <p>현재 나이: {age}</p>
        <p>이전 나이: {prevAgeRef.current}</p>
      </div>
    </div>
  );
}

// 4. 커스텀 Hook을 사용한 예제
function CustomHookExample() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');
  const prevCount = usePrevious(count);
  const prevMessage = usePrevious(message);
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px 0' }}>
      <h3>4. 커스텀 Hook: usePrevious</h3>
      <div style={{ margin: '10px 0' }}>
        <button onClick={() => setCount(count + 1)} style={{ margin: '5px' }}>
          카운트 증가
        </button>
        <p>현재 카운트: {count}</p>
        <p>이전 카운트: {prevCount}</p>
      </div>
      
      <div style={{ margin: '10px 0' }}>
        <input 
          type="text" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요"
          style={{ margin: '5px', padding: '5px', width: '200px' }}
        />
        <p>현재 메시지: {message}</p>
        <p>이전 메시지: {prevMessage}</p>
      </div>
    </div>
  );
}

// 5. 스크롤 위치 추적
function ScrollTrackingExample() {
  const [scrollY, setScrollY] = useState(0);
  const scrollRef = useRef(0);
  
  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px 0' }}>
      <h3>5. 스크롤 위치 추적</h3>
      <p>현재 스크롤 위치: {scrollY}px</p>
      <p>useRef로 저장된 값: {scrollRef.current}px</p>
      <div style={{ height: '200px', backgroundColor: '#f0f0f0', margin: '10px 0' }}>
        스크롤해보세요!
      </div>
    </div>
  );
}

// 6. 폼 검증과 포커스 관리
function FormValidationExample() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = '이름을 입력해주세요';
    }
    
    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다';
    }
    
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요';
    } else if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 6자 이상이어야 합니다';
    }
    
    setErrors(newErrors);
    
    // 첫 번째 오류 필드에 포커스
    if (newErrors.name) {
      nameRef.current.focus();
    } else if (newErrors.email) {
      emailRef.current.focus();
    } else if (newErrors.password) {
      passwordRef.current.focus();
    }
    
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('폼이 성공적으로 제출되었습니다!');
    }
  };
  
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px 0' }}>
      <h3>6. 폼 검증과 포커스 관리</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ margin: '10px 0' }}>
          <label>
            이름:
            <input 
              ref={nameRef}
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              style={{ 
                margin: '5px', 
                padding: '5px', 
                width: '200px',
                border: errors.name ? '2px solid red' : '1px solid #ccc'
              }}
            />
          </label>
          {errors.name && <p style={{ color: 'red', margin: '5px 0' }}>{errors.name}</p>}
        </div>
        
        <div style={{ margin: '10px 0' }}>
          <label>
            이메일:
            <input 
              ref={emailRef}
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              style={{ 
                margin: '5px', 
                padding: '5px', 
                width: '200px',
                border: errors.email ? '2px solid red' : '1px solid #ccc'
              }}
            />
          </label>
          {errors.email && <p style={{ color: 'red', margin: '5px 0' }}>{errors.email}</p>}
        </div>
        
        <div style={{ margin: '10px 0' }}>
          <label>
            비밀번호:
            <input 
              ref={passwordRef}
              type="password" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              style={{ 
                margin: '5px', 
                padding: '5px', 
                width: '200px',
                border: errors.password ? '2px solid red' : '1px solid #ccc'
              }}
            />
          </label>
          {errors.password && <p style={{ color: 'red', margin: '5px 0' }}>{errors.password}</p>}
        </div>
        
        <button type="submit" style={{ margin: '10px 0', padding: '10px 20px' }}>
          제출
        </button>
      </form>
    </div>
  );
}

function UseRefExample() {
  return (
    <div className="component-section">
      <h2>useRef Hook 완전 정복</h2>
      <p>
        useRef는 DOM 요소에 직접 접근하거나, 리렌더링 없이 값을 저장할 때 사용하는 Hook입니다.
        useState와 달리 값이 변경되어도 컴포넌트가 리렌더링되지 않습니다.
      </p>
      
      <div className="code-example">
        <strong>useRef 기본 사용법:</strong><br/>
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
          {`const ref = useRef(초기값);
// ref.current로 값에 접근
ref.current = 새로운값;`}
        </pre>
      </div>
      
      <DOMAccessExample />
      <MutableValueExample />
      <PreviousValueExample />
      <CustomHookExample />
      <ScrollTrackingExample />
      <FormValidationExample />
      
      <div className="highlight">
        <strong>useRef의 주요 특징:</strong>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li>값이 변경되어도 리렌더링을 발생시키지 않음</li>
          <li>DOM 요소에 직접 접근 가능</li>
          <li>이전 값을 추적할 때 유용</li>
          <li>타이머 ID, 이벤트 리스너 등을 저장할 때 사용</li>
          <li>폼 검증 시 오류 필드에 포커스할 때 활용</li>
        </ul>
      </div>
    </div>
  );
}

export default UseRefExample;
