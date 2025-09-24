import React, { useState, useEffect } from 'react';

// 타이머 사이드 이펙트
function TimerEffect() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    }

    // 클린업 함수로 타이머 정리
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  const reset = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <div className="demo-box">
      <h3>타이머 사이드 이펙트</h3>
      <div className="timer">{seconds}초</div>
      <button 
        className="button" 
        onClick={() => setIsRunning(!isRunning)}
      >
        {isRunning ? '정지' : '시작'}
      </button>
      <button className="button" onClick={reset}>
        리셋
      </button>
      <p>타이머는 컴포넌트가 언마운트되거나 정지될 때 자동으로 정리됩니다.</p>
    </div>
  );
}

// 윈도우 이벤트 리스너 사이드 이펙트
function WindowEventEffect() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // 윈도우 리사이즈 이벤트
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 스크롤 이벤트
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 마우스 이동 이벤트
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="demo-box">
      <h3>윈도우 이벤트 리스너</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', textAlign: 'left' }}>
        <div>
          <h4>윈도우 크기</h4>
          <p>너비: {windowSize.width}px</p>
          <p>높이: {windowSize.height}px</p>
        </div>
        <div>
          <h4>스크롤 위치</h4>
          <p>Y: {scrollPosition}px</p>
        </div>
        <div>
          <h4>마우스 위치</h4>
          <p>X: {mousePosition.x}px</p>
          <p>Y: {mousePosition.y}px</p>
        </div>
      </div>
      <p>브라우저 창 크기를 조절하거나 스크롤해보세요!</p>
    </div>
  );
}

// 키보드 이벤트 사이드 이펙트
function KeyboardEffect() {
  const [pressedKeys, setPressedKeys] = useState(new Set());
  const [keyHistory, setKeyHistory] = useState([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      setPressedKeys(prev => new Set([...prev, e.key]));
      setKeyHistory(prev => [...prev.slice(-9), e.key]);
    };

    const handleKeyUp = (e) => {
      setPressedKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(e.key);
        return newSet;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="demo-box">
      <h3>키보드 이벤트 추적</h3>
      <div style={{ margin: '15px 0' }}>
        <h4>현재 눌린 키:</h4>
        <div style={{ 
          background: '#f5f5f5', 
          padding: '10px', 
          borderRadius: '5px',
          minHeight: '40px'
        }}>
          {pressedKeys.size > 0 ? (
            Array.from(pressedKeys).map(key => (
              <span 
                key={key}
                style={{ 
                  background: '#4caf50', 
                  color: 'white', 
                  padding: '2px 8px', 
                  margin: '2px',
                  borderRadius: '3px',
                  display: 'inline-block'
                }}
              >
                {key}
              </span>
            ))
          ) : (
            <span style={{ color: '#666' }}>키를 눌러보세요</span>
          )}
        </div>
      </div>
      
      <div>
        <h4>최근 키 히스토리:</h4>
        <div style={{ 
          background: '#f5f5f5', 
          padding: '10px', 
          borderRadius: '5px',
          fontFamily: 'monospace'
        }}>
          {keyHistory.length > 0 ? keyHistory.join(' → ') : '아직 키가 눌리지 않았습니다'}
        </div>
      </div>
    </div>
  );
}

// 문서 타이틀 변경 사이드 이펙트
function DocumentTitleEffect() {
  const [title, setTitle] = useState('React 생명주기 학습');
  const [count, setCount] = useState(0);

  // 문서 타이틀 변경
  useEffect(() => {
    document.title = title;
  }, [title]);

  // 카운트에 따른 타이틀 변경
  useEffect(() => {
    document.title = `카운트: ${count} - React 학습`;
  }, [count]);

  return (
    <div className="demo-box">
      <h3>문서 타이틀 변경</h3>
      <p>브라우저 탭의 제목이 변경되는 것을 확인해보세요!</p>
      
      <div style={{ margin: '15px 0' }}>
        <div>
          <label>사용자 정의 타이틀: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: '5px', width: '200px' }}
          />
        </div>
        <div style={{ margin: '10px 0' }}>
          <label>카운트: </label>
          <button className="button" onClick={() => setCount(count + 1)}>
            {count}
          </button>
          <button className="button" onClick={() => setCount(0)}>
            리셋
          </button>
        </div>
      </div>
    </div>
  );
}

// 로컬 스토리지 사이드 이펙트
function LocalStorageEffect() {
  const [data, setData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('lifecycle-demo-data')) || {
        name: '',
        email: '',
        preferences: {
          theme: 'light',
          notifications: true
        }
      };
    } catch (error) {
      return {
        name: '',
        email: '',
        preferences: {
          theme: 'light',
          notifications: true
        }
      };
    }
  });

  // 데이터가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    try {
      localStorage.setItem('lifecycle-demo-data', JSON.stringify(data));
    } catch (error) {
      console.error('로컬 스토리지 저장 실패:', error);
    }
  }, [data]);

  const updateData = (field, value) => {
    setData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updatePreferences = (field, value) => {
    setData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value
      }
    }));
  };

  return (
    <div className="demo-box">
      <h3>로컬 스토리지 동기화</h3>
      <p>입력한 데이터가 자동으로 로컬 스토리지에 저장됩니다.</p>
      
      <div style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
        <div style={{ margin: '10px 0' }}>
          <label>이름: </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => updateData('name', e.target.value)}
            style={{ padding: '5px', width: '150px' }}
          />
        </div>
        
        <div style={{ margin: '10px 0' }}>
          <label>이메일: </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => updateData('email', e.target.value)}
            style={{ padding: '5px', width: '150px' }}
          />
        </div>
        
        <div style={{ margin: '10px 0' }}>
          <label>테마: </label>
          <select
            value={data.preferences.theme}
            onChange={(e) => updatePreferences('theme', e.target.value)}
            style={{ padding: '5px', width: '150px' }}
          >
            <option value="light">라이트</option>
            <option value="dark">다크</option>
          </select>
        </div>
        
        <div style={{ margin: '10px 0' }}>
          <label>
            <input
              type="checkbox"
              checked={data.preferences.notifications}
              onChange={(e) => updatePreferences('notifications', e.target.checked)}
            />
            알림 받기
          </label>
        </div>
      </div>
      
      <div style={{ 
        background: '#f5f5f5', 
        padding: '10px', 
        margin: '15px 0', 
        borderRadius: '5px',
        textAlign: 'left'
      }}>
        <strong>저장된 데이터:</strong>
        <pre style={{ fontSize: '12px', margin: '5px 0' }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
}

function SideEffects() {
  return (
    <div className="component-section">
      <h2>2. useEffect 의존성 배열 이해하기</h2>
      <p>
        useEffect는 사이드 이펙트를 처리하는 Hook입니다. 
        의존성 배열을 통해 언제 사이드 이펙트가 실행될지 제어할 수 있습니다.
      </p>

      <div className="code-example">
        <strong>useEffect 의존성 배열 패턴:</strong><br/>
        {`// 1. 빈 배열 - 마운트/언마운트 시에만
useEffect(() => {
  // 초기화 작업
  return () => {
    // 클린업 작업
  };
}, []);

// 2. 의존성 있음 - 특정 값 변경 시
useEffect(() => {
  // value가 변경될 때마다 실행
}, [value]);

// 3. 의존성 없음 - 매 렌더링마다
useEffect(() => {
  // 매 렌더링마다 실행
});`}
      </div>

      <TimerEffect />
      <WindowEventEffect />
      <KeyboardEffect />
      <DocumentTitleEffect />
      <LocalStorageEffect />

      <div className="highlight">
        <strong>사이드 이펙트의 종류:</strong>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li><strong>타이머:</strong> setInterval, setTimeout</li>
          <li><strong>이벤트 리스너:</strong> addEventListener</li>
          <li><strong>구독:</strong> WebSocket, API 구독</li>
          <li><strong>DOM 조작:</strong> document.title, localStorage</li>
          <li><strong>API 호출:</strong> fetch, axios</li>
        </ul>
      </div>

      <div className="code-example">
        <strong>클린업 함수 작성 패턴:</strong><br/>
        {`useEffect(() => {
  // 1. 타이머 정리
  const timer = setInterval(() => {}, 1000);
  return () => clearInterval(timer);

  // 2. 이벤트 리스너 정리
  const handleResize = () => {};
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);

  // 3. 구독 정리
  const subscription = api.subscribe();
  return () => subscription.unsubscribe();

  // 4. AbortController로 API 요청 취소
  const controller = new AbortController();
  fetch(url, { signal: controller.signal });
  return () => controller.abort();
}, []);`}
      </div>
    </div>
  );
}

export default SideEffects;
