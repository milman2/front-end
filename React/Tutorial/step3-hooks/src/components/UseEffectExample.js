import React, { useState, useEffect } from 'react';

// 기본 useEffect 예제
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // 클린업 함수
    return () => clearInterval(interval);
  }, []); // 빈 의존성 배열 - 컴포넌트 마운트 시에만 실행

  return (
    <div className="demo-box">
      <h3>타이머 (useEffect 기본)</h3>
      <div className="timer">{seconds}초</div>
      <p>컴포넌트가 마운트된 후 자동으로 시작됩니다.</p>
    </div>
  );
}

// 의존성 배열이 있는 useEffect
function CounterWithEffect() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (count > 0) {
      setMessage(`카운트가 ${count}가 되었습니다!`);
    }
  }, [count]); // count가 변경될 때마다 실행

  useEffect(() => {
    document.title = `카운트: ${count}`;
  }, [count]); // 브라우저 타이틀 업데이트

  return (
    <div className="demo-box">
      <h3>카운터 with useEffect</h3>
      <div className="counter">카운트: {count}</div>
      <button className="button" onClick={() => setCount(count + 1)}>
        증가
      </button>
      <button className="button" onClick={() => setCount(count - 1)}>
        감소
      </button>
      <button className="button" onClick={() => setCount(0)}>
        리셋
      </button>
      {message && <p style={{ color: '#4caf50', fontWeight: 'bold' }}>{message}</p>}
    </div>
  );
}

// API 호출 시뮬레이션
function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // 실제 API 호출 시뮬레이션
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockData = {
          id: userId,
          name: `사용자 ${userId}`,
          email: `user${userId}@example.com`,
          avatar: `👤${userId}`
        };
        
        setData(mockData);
      } catch (err) {
        setError('데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]); // userId가 변경될 때마다 새로운 데이터 요청

  return (
    <div className="demo-box">
      <h3>데이터 페칭 (API 호출 시뮬레이션)</h3>
      <div style={{ margin: '15px 0' }}>
        <label>사용자 ID: </label>
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(parseInt(e.target.value) || 1)}
          min="1"
          max="10"
          style={{ padding: '5px', width: '80px' }}
        />
      </div>
      
      {loading && <p className="status loading">로딩 중...</p>}
      {error && <p className="status error">{error}</p>}
      {data && !loading && (
        <div className="user-card">
          <h4>{data.name}</h4>
          <p><strong>ID:</strong> {data.id}</p>
          <p><strong>이메일:</strong> {data.email}</p>
          <p><strong>아바타:</strong> {data.avatar}</p>
        </div>
      )}
    </div>
  );
}

// 윈도우 이벤트 리스너
function WindowSizeTracker() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    // 클린업 함수
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="demo-box">
      <h3>윈도우 크기 추적</h3>
      <p><strong>현재 윈도우 크기:</strong></p>
      <p>너비: {windowSize.width}px</p>
      <p>높이: {windowSize.height}px</p>
      <p>브라우저 창 크기를 조절해보세요!</p>
    </div>
  );
}

function UseEffectExample() {
  return (
    <div className="component-section">
      <h2>2. useEffect Hook 이해하고 사용하기</h2>
      <p>
        useEffect는 함수형 컴포넌트에서 사이드 이펙트를 수행할 수 있게 해주는 Hook입니다.
        데이터 페칭, 구독 설정, DOM 조작 등의 작업에 사용됩니다.
      </p>

      <div className="code-example">
        <strong>useEffect 기본 문법:</strong><br/>
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
          {`import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // 사이드 이펙트 수행
    fetchData();
    
    // 클린업 함수 (선택사항)
    return () => {
      // 정리 작업
    };
  }, [의존성배열]); // 의존성 배열

  return <div>{data}</div>;
}`}
        </pre>
      </div>

      <Timer />
      <CounterWithEffect />
      <DataFetcher />
      <WindowSizeTracker />

      <div className="highlight">
        <strong>useEffect의 의존성 배열:</strong>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li><strong>[] (빈 배열):</strong> 컴포넌트 마운트/언마운트 시에만 실행</li>
          <li><strong>[value]:</strong> value가 변경될 때마다 실행</li>
          <li><strong>없음:</strong> 매 렌더링마다 실행</li>
          <li><strong>클린업 함수:</strong> 컴포넌트 언마운트나 의존성 변경 전에 실행</li>
        </ul>
      </div>

      <div className="code-example">
        <strong>useEffect 사용 사례:</strong><br/>
        {`// 1. 데이터 페칭
useEffect(() => {
  fetchData();
}, [userId]);

// 2. 이벤트 리스너 등록
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

// 3. 구독 설정
useEffect(() => {
  const subscription = api.subscribe();
  return () => subscription.unsubscribe();
}, []);

// 4. 타이머 설정
useEffect(() => {
  const timer = setInterval(tick, 1000);
  return () => clearInterval(timer);
}, []);`}
      </div>
    </div>
  );
}

export default UseEffectExample;
