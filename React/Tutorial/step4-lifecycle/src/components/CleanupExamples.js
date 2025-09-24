import React, { useState, useEffect } from 'react';

// 타이머 클린업 예제
function TimerCleanup() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [cleanupLogs, setCleanupLogs] = useState([]);

  const addLog = message => {
    const timestamp = new Date().toLocaleTimeString();
    setCleanupLogs(prev => [
      ...prev.slice(-4),
      { message, timestamp, id: Date.now() },
    ]);
  };

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      addLog('타이머 시작됨');
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    }

    // 클린업 함수
    return () => {
      if (interval) {
        addLog('타이머 정리됨');
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  const reset = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <div className='demo-box'>
      <h3>타이머 클린업</h3>
      <div className='timer'>{seconds}초</div>
      <button className='button' onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? '정지' : '시작'}
      </button>
      <button className='button' onClick={reset}>
        리셋
      </button>

      <div className='lifecycle-log'>
        <h4>클린업 로그:</h4>
        {cleanupLogs.map(log => (
          <div key={log.id} style={{ margin: '5px 0' }}>
            <span style={{ color: '#666' }}>[{log.timestamp}]</span>{' '}
            {log.message}
          </div>
        ))}
      </div>
    </div>
  );
}

// 이벤트 리스너 클린업 예제
function EventListenerCleanup() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [scrollPosition, setScrollPosition] = useState(0);
  const [cleanupLogs, setCleanupLogs] = useState([]);

  const addLog = message => {
    const timestamp = new Date().toLocaleTimeString();
    setCleanupLogs(prev => [
      ...prev.slice(-4),
      { message, timestamp, id: Date.now() },
    ]);
  };

  // 윈도우 리사이즈 이벤트
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    addLog('리사이즈 이벤트 리스너 등록됨');
    window.addEventListener('resize', handleResize);

    return () => {
      addLog('리사이즈 이벤트 리스너 제거됨');
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 스크롤 이벤트
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    addLog('스크롤 이벤트 리스너 등록됨');
    window.addEventListener('scroll', handleScroll);

    return () => {
      addLog('스크롤 이벤트 리스너 제거됨');
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='demo-box'>
      <h3>이벤트 리스너 클린업</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          textAlign: 'left',
        }}
      >
        <div>
          <h4>윈도우 크기</h4>
          <p>너비: {windowSize.width}px</p>
          <p>높이: {windowSize.height}px</p>
        </div>
        <div>
          <h4>스크롤 위치</h4>
          <p>Y: {scrollPosition}px</p>
        </div>
      </div>

      <div className='lifecycle-log'>
        <h4>클린업 로그:</h4>
        {cleanupLogs.map(log => (
          <div key={log.id} style={{ margin: '5px 0' }}>
            <span style={{ color: '#666' }}>[{log.timestamp}]</span>{' '}
            {log.message}
          </div>
        ))}
      </div>
    </div>
  );
}

// 구독 클린업 예제 (WebSocket 시뮬레이션)
function SubscriptionCleanup() {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [cleanupLogs, setCleanupLogs] = useState([]);

  const addLog = message => {
    const timestamp = new Date().toLocaleTimeString();
    setCleanupLogs(prev => [
      ...prev.slice(-4),
      { message, timestamp, id: Date.now() },
    ]);
  };

  const addMessage = message => {
    setMessages(prev => [
      ...prev.slice(-4),
      {
        id: Date.now(),
        text: message,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  useEffect(() => {
    if (!isConnected) return;

    addLog('WebSocket 연결 시뮬레이션 시작');

    // WebSocket 시뮬레이션
    const interval = setInterval(() => {
      const randomMessages = [
        '새로운 메시지가 도착했습니다!',
        '시스템 상태: 정상',
        '사용자 활동 감지됨',
        '데이터 동기화 완료',
        '알림: 업데이트 가능',
      ];

      const randomMessage =
        randomMessages[Math.floor(Math.random() * randomMessages.length)];
      addMessage(randomMessage);
    }, 2000);

    // 클린업 함수
    return () => {
      addLog('WebSocket 연결 시뮬레이션 종료');
      clearInterval(interval);
    };
  }, [isConnected]);

  const toggleConnection = () => {
    setIsConnected(prev => !prev);
    if (!isConnected) {
      setMessages([]);
    }
  };

  return (
    <div className='demo-box'>
      <h3>구독 클린업 (WebSocket 시뮬레이션)</h3>
      <div style={{ margin: '15px 0' }}>
        <button
          className='button'
          onClick={toggleConnection}
          style={{
            backgroundColor: isConnected ? '#f44336' : '#4caf50',
          }}
        >
          {isConnected ? '연결 해제' : '연결 시작'}
        </button>
        <span className={`status ${isConnected ? 'success' : 'error'}`}>
          {isConnected ? '연결됨' : '연결 해제됨'}
        </span>
      </div>

      <div
        style={{
          background: '#f5f5f5',
          padding: '10px',
          borderRadius: '5px',
          maxHeight: '150px',
          overflowY: 'auto',
        }}
      >
        <h4>메시지:</h4>
        {messages.length === 0 ? (
          <p style={{ color: '#666' }}>메시지가 없습니다.</p>
        ) : (
          messages.map(msg => (
            <div key={msg.id} style={{ margin: '5px 0', fontSize: '12px' }}>
              <span style={{ color: '#666' }}>[{msg.timestamp}]</span>{' '}
              {msg.text}
            </div>
          ))
        )}
      </div>

      <div className='lifecycle-log'>
        <h4>클린업 로그:</h4>
        {cleanupLogs.map(log => (
          <div key={log.id} style={{ margin: '5px 0' }}>
            <span style={{ color: '#666' }}>[{log.timestamp}]</span>{' '}
            {log.message}
          </div>
        ))}
      </div>
    </div>
  );
}

// API 요청 클린업 예제
function APICleanup() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requestId, setRequestId] = useState(0);
  const [cleanupLogs, setCleanupLogs] = useState([]);

  const addLog = message => {
    const timestamp = new Date().toLocaleTimeString();
    setCleanupLogs(prev => [
      ...prev.slice(-4),
      { message, timestamp, id: Date.now() },
    ]);
  };

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      addLog(`API 요청 시작 (ID: ${requestId})`);

      try {
        // 3초 소요되는 API 시뮬레이션
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(resolve, 3000);

          abortController.signal.addEventListener('abort', () => {
            clearTimeout(timeout);
            reject(new Error('Request aborted'));
          });
        });

        if (!abortController.signal.aborted) {
          const mockData = {
            id: requestId,
            message: `요청 ${requestId} 완료`,
            timestamp: new Date().toLocaleTimeString(),
          };

          setData(mockData);
          addLog(`API 요청 완료 (ID: ${requestId})`);
        }
      } catch (err) {
        if (err.name === 'AbortError') {
          addLog(`API 요청 취소됨 (ID: ${requestId})`);
        } else {
          setError('API 요청 실패');
          addLog(`API 요청 실패 (ID: ${requestId})`);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // 클린업 함수에서 요청 취소
    return () => {
      addLog(`API 요청 클린업 (ID: ${requestId})`);
      abortController.abort();
    };
  }, [requestId]);

  const startNewRequest = () => {
    setRequestId(prev => prev + 1);
  };

  return (
    <div className='demo-box'>
      <h3>API 요청 클린업</h3>
      <p>3초가 걸리는 API 요청을 시작하고 중간에 취소할 수 있습니다.</p>

      <div style={{ margin: '15px 0' }}>
        <button className='button' onClick={startNewRequest} disabled={loading}>
          새 요청 시작
        </button>
        <p>
          <strong>요청 ID:</strong> {requestId}
        </p>
      </div>

      {loading && <p className='status loading'>로딩 중... (3초 소요)</p>}
      {error && <p className='status error'>{error}</p>}
      {data && !loading && (
        <div className='user-card'>
          <h4>{data.message}</h4>
          <p>
            <strong>ID:</strong> {data.id}
          </p>
          <p>
            <strong>시간:</strong> {data.timestamp}
          </p>
        </div>
      )}

      <div className='lifecycle-log'>
        <h4>클린업 로그:</h4>
        {cleanupLogs.map(log => (
          <div key={log.id} style={{ margin: '5px 0' }}>
            <span style={{ color: '#666' }}>[{log.timestamp}]</span>{' '}
            {log.message}
          </div>
        ))}
      </div>
    </div>
  );
}

// 메모리 누수 방지 예제
function MemoryLeakPrevention() {
  const [components, setComponents] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [memoryLogs, setMemoryLogs] = useState([]);

  const addLog = message => {
    const timestamp = new Date().toLocaleTimeString();
    setMemoryLogs(prev => [
      ...prev.slice(-4),
      { message, timestamp, id: Date.now() },
    ]);
  };

  const addComponent = () => {
    const id = nextId;
    setComponents(prev => [...prev, { id, name: `컴포넌트 ${id}` }]);
    setNextId(prev => prev + 1);
    addLog(`컴포넌트 ${id} 추가됨`);
  };

  const removeComponent = id => {
    setComponents(prev => prev.filter(comp => comp.id !== id));
    addLog(`컴포넌트 ${id} 제거됨`);
  };

  const clearAll = () => {
    setComponents([]);
    addLog('모든 컴포넌트 제거됨');
  };

  return (
    <div className='demo-box'>
      <h3>메모리 누수 방지</h3>
      <p>동적으로 컴포넌트를 추가/제거하여 메모리 누수 방지를 확인해보세요.</p>

      <div style={{ margin: '15px 0' }}>
        <button className='button' onClick={addComponent}>
          컴포넌트 추가
        </button>
        <button className='button' onClick={clearAll}>
          모두 제거
        </button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {components.map(comp => (
          <MemoryLeakComponent
            key={comp.id}
            name={comp.name}
            onRemove={() => removeComponent(comp.id)}
            onLog={addLog}
          />
        ))}
      </div>

      <div className='lifecycle-log'>
        <h4>메모리 관리 로그:</h4>
        {memoryLogs.map(log => (
          <div key={log.id} style={{ margin: '5px 0' }}>
            <span style={{ color: '#666' }}>[{log.timestamp}]</span>{' '}
            {log.message}
          </div>
        ))}
      </div>
    </div>
  );
}

// 메모리 누수 방지를 위한 컴포넌트
function MemoryLeakComponent({ name, onRemove, onLog }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    onLog(`${name} 마운트됨`);

    return () => {
      onLog(`${name} 언마운트됨 (메모리 정리됨)`);
    };
  }, [name, onLog]);

  return (
    <div
      style={{
        background: '#e3f2fd',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #2196f3',
        minWidth: '150px',
      }}
    >
      <h5>{name}</h5>
      <div>카운트: {count}</div>
      <button
        className='button'
        onClick={() => setCount(count + 1)}
        style={{ padding: '5px 10px', fontSize: '12px', margin: '5px' }}
      >
        +1
      </button>
      <button
        className='button'
        onClick={onRemove}
        style={{
          padding: '5px 10px',
          fontSize: '12px',
          margin: '5px',
          backgroundColor: '#f44336',
        }}
      >
        제거
      </button>
    </div>
  );
}

function CleanupExamples() {
  return (
    <div className='component-section'>
      <h2>4. 클린업 함수 작성하기</h2>
      <p>
        React에서 사이드 이펙트를 정리하는 클린업 함수는 메모리 누수를 방지하고
        성능을 최적화하는 데 매우 중요합니다. 다양한 클린업 패턴을 익혀보세요.
      </p>

      <div className='code-example'>
        <strong>클린업 함수 기본 패턴:</strong>
        <br />
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
          {`useEffect(() => {
  // 사이드 이펙트 설정
  
  // 클린업 함수 반환
  return () => {
    // 정리 작업
  };
}, []);`}
        </pre>
      </div>

      <TimerCleanup />
      <EventListenerCleanup />
      <SubscriptionCleanup />
      <APICleanup />
      <MemoryLeakPrevention />

      <div className='highlight'>
        <strong>클린업이 필요한 경우:</strong>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li>
            <strong>타이머:</strong> setInterval, setTimeout
          </li>
          <li>
            <strong>이벤트 리스너:</strong> addEventListener
          </li>
          <li>
            <strong>구독:</strong> WebSocket, API 구독
          </li>
          <li>
            <strong>API 요청:</strong> AbortController
          </li>
          <li>
            <strong>DOM 조작:</strong> 직접적인 DOM 접근
          </li>
        </ul>
      </div>

      <div className='code-example'>
        <strong>클린업 함수 작성 예제:</strong>
        <br />
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
          {`// 1. 타이머 클린업
useEffect(() => {
  const timer = setInterval(() => {
    // 작업
  }, 1000);
  
  return () => clearInterval(timer);
}, []);

// 2. 이벤트 리스너 클린업
useEffect(() => {
  const handleResize = () => {};
  window.addEventListener('resize', handleResize);
  
  return () => window.removeEventListener('resize', handleResize);
}, []);

// 3. API 요청 클린업
useEffect(() => {
  const controller = new AbortController();
  fetch(url, { signal: controller.signal });
  
  return () => controller.abort();
}, []);

// 4. 구독 클린업
useEffect(() => {
  const subscription = api.subscribe();
  
  return () => subscription.unsubscribe();
}, []);`}
        </pre>
      </div>

      <div className='highlight'>
        <strong>클린업 함수 작성 팁:</strong>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li>모든 사이드 이펙트에 대해 클린업 함수 작성</li>
          <li>클린업 함수는 항상 함수를 반환</li>
          <li>의존성 배열이 변경될 때도 클린업 실행</li>
          <li>메모리 누수 방지를 위한 필수 작업</li>
          <li>React DevTools로 메모리 사용량 모니터링</li>
        </ul>
      </div>
    </div>
  );
}

export default CleanupExamples;
