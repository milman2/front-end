import React, { useState, useEffect, useCallback } from 'react';

// 생명주기를 추적하는 컴포넌트
function LifecycleTracker({ name, onLog, onUnmount }) {
  const [count, setCount] = useState(0);

  // 컴포넌트 마운트 시
  useEffect(() => {
    onLog(`${name}: 컴포넌트가 마운트되었습니다.`);
    
    // 언마운트 시 클린업
    return () => {
      onLog(`${name}: 컴포넌트가 언마운트됩니다.`);
    };
  }, [name, onLog]);

  // count가 변경될 때마다
  useEffect(() => {
    onLog(`${name}: count가 ${count}로 업데이트되었습니다.`);
  }, [count, name, onLog]);

  const handleUnmount = () => {
    onLog(`${name}: 언마운트 버튼이 클릭되었습니다.`);
    onUnmount?.(); // 부모 컴포넌트에게 언마운트 요청
  };

  return (
    <div style={{ 
      background: '#e8f5e8', 
      padding: '15px', 
      borderRadius: '5px',
      margin: '10px 0'
    }}>
      <h4>{name} 컴포넌트</h4>
      <div className="counter">카운트: {count}</div>
      <button className="button" onClick={() => setCount(count + 1)}>
        증가
      </button>
      <button className="button" onClick={handleUnmount}>
        언마운트
      </button>
    </div>
  );
}

// 생명주기 로그를 표시하는 컴포넌트
function LifecycleLogger() {
  const [logs, setLogs] = useState([]);
  const [showTracker, setShowTracker] = useState(true);

  const addLog = useCallback((message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { message, timestamp, id: Date.now() }]);
  }, []);

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="demo-box">
      <h3>컴포넌트 생명주기 추적</h3>
      <p>컴포넌트의 마운트, 업데이트, 언마운트 과정을 실시간으로 확인해보세요.</p>
      
      <div style={{ margin: '15px 0' }}>
        <button 
          className="button" 
          onClick={() => setShowTracker(!showTracker)}
        >
          {showTracker ? '컴포넌트 숨기기' : '컴포넌트 보이기'}
        </button>
        <button className="button" onClick={clearLogs}>
          로그 지우기
        </button>
      </div>

      {showTracker && (
        <LifecycleTracker 
          name="Tracker" 
          onLog={addLog}
          onUnmount={() => setShowTracker(false)}
        />
      )}

      <div className="lifecycle-log">
        <h4>생명주기 로그:</h4>
        {logs.length === 0 ? (
          <p>로그가 없습니다.</p>
        ) : (
          logs.map(log => (
            <div key={log.id} style={{ margin: '5px 0' }}>
              <span style={{ color: '#666' }}>[{log.timestamp}]</span> {log.message}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// useEffect 의존성 배열 예제
function DependencyArrayExample() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('React');
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev.slice(-4), { message, timestamp, id: Date.now() }]);
  };

  // 빈 의존성 배열 - 마운트 시에만 실행
  useEffect(() => {
    addLog('빈 의존성 배열: 컴포넌트 마운트 시에만 실행');
  }, []);

  // count 의존성 - count가 변경될 때마다 실행
  useEffect(() => {
    addLog(`count 의존성: count가 ${count}로 변경됨`);
  }, [count]);

  // name 의존성 - name이 변경될 때마다 실행
  useEffect(() => {
    addLog(`name 의존성: name이 ${name}로 변경됨`);
  }, [name]);

  // 의존성 없음 - 매 렌더링마다 실행
  useEffect(() => {
    addLog('의존성 없음: 매 렌더링마다 실행');
  });

  return (
    <div className="demo-box">
      <h3>useEffect 의존성 배열 이해하기</h3>
      <p>다양한 의존성 배열 설정으로 useEffect의 실행 시점을 확인해보세요.</p>
      
      <div style={{ margin: '15px 0' }}>
        <div>
          <label>카운트: </label>
          <button className="button" onClick={() => setCount(count + 1)}>
            {count}
          </button>
        </div>
        <div style={{ margin: '10px 0' }}>
          <label>이름: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: '5px', marginLeft: '10px' }}
          />
        </div>
      </div>

      <div className="lifecycle-log">
        <h4>useEffect 실행 로그:</h4>
        {logs.map(log => (
          <div key={log.id} style={{ margin: '5px 0' }}>
            <span style={{ color: '#666' }}>[{log.timestamp}]</span> {log.message}
          </div>
        ))}
      </div>
    </div>
  );
}

// 컴포넌트 마운트/언마운트 시뮬레이션
function MountUnmountDemo() {
  const [components, setComponents] = useState([]);
  const [nextId, setNextId] = useState(1);

  const addComponent = () => {
    const id = nextId;
    setComponents(prev => [...prev, { id, name: `컴포넌트 ${id}` }]);
    setNextId(prev => prev + 1);
  };

  const removeComponent = (id) => {
    setComponents(prev => prev.filter(comp => comp.id !== id));
  };

  return (
    <div className="demo-box">
      <h3>컴포넌트 마운트/언마운트 시뮬레이션</h3>
      <p>동적으로 컴포넌트를 추가하고 제거하여 생명주기를 확인해보세요.</p>
      
      <div style={{ margin: '15px 0' }}>
        <button className="button" onClick={addComponent}>
          컴포넌트 추가
        </button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {components.map(comp => (
          <DynamicComponent 
            key={comp.id}
            name={comp.name}
            onRemove={() => removeComponent(comp.id)}
          />
        ))}
      </div>
    </div>
  );
}

// 동적으로 생성/제거되는 컴포넌트
function DynamicComponent({ name, onRemove }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`${name} 마운트됨`);
    
    return () => {
      console.log(`${name} 언마운트됨`);
    };
  }, [name]);

  return (
    <div style={{ 
      background: '#e3f2fd', 
      padding: '10px', 
      borderRadius: '5px',
      border: '1px solid #2196f3',
      minWidth: '150px'
    }}>
      <h5>{name}</h5>
      <div>카운트: {count}</div>
      <button 
        className="button" 
        onClick={() => setCount(count + 1)}
        style={{ padding: '5px 10px', fontSize: '12px', margin: '5px' }}
      >
        +1
      </button>
      <button 
        className="button" 
        onClick={onRemove}
        style={{ 
          padding: '5px 10px', 
          fontSize: '12px', 
          margin: '5px',
          backgroundColor: '#f44336'
        }}
      >
        제거
      </button>
    </div>
  );
}

function ComponentLifecycle() {
  return (
    <div className="component-section">
      <h2>1. 컴포넌트 마운트/언마운트 이해하기</h2>
      <p>
        React 컴포넌트는 생성(마운트), 업데이트, 제거(언마운트)의 생명주기를 가집니다.
        useEffect를 통해 각 단계에서 필요한 작업을 수행할 수 있습니다.
      </p>

      <div className="code-example">
        <strong>컴포넌트 생명주기와 useEffect:</strong><br/>
        {`import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  // 마운트 시에만 실행
  useEffect(() => {
    console.log('컴포넌트가 마운트되었습니다.');
    
    // 언마운트 시 클린업
    return () => {
      console.log('컴포넌트가 언마운트됩니다.');
    };
  }, []);

  // count가 변경될 때마다 실행
  useEffect(() => {
    console.log('count가 변경되었습니다:', count);
  }, [count]);

  return <div>카운트: {count}</div>;
}`}
      </div>

      <LifecycleLogger />
      <DependencyArrayExample />
      <MountUnmountDemo />

      <div className="highlight">
        <strong>컴포넌트 생명주기 단계:</strong>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li><strong>마운트:</strong> 컴포넌트가 DOM에 추가됨</li>
          <li><strong>업데이트:</strong> Props나 State가 변경됨</li>
          <li><strong>언마운트:</strong> 컴포넌트가 DOM에서 제거됨</li>
          <li><strong>클린업:</strong> 메모리 누수 방지를 위한 정리 작업</li>
        </ul>
      </div>

      <div className="code-example">
        <strong>useEffect 의존성 배열 패턴:</strong><br/>
        {`// 1. 빈 배열 [] - 마운트/언마운트 시에만
useEffect(() => {
  // 초기화 작업
  return () => {
    // 클린업 작업
  };
}, []);

// 2. 의존성 있음 [value] - 특정 값 변경 시
useEffect(() => {
  // value가 변경될 때마다 실행
}, [value]);

// 3. 의존성 없음 - 매 렌더링마다
useEffect(() => {
  // 매 렌더링마다 실행 (주의해서 사용)
});`}
      </div>
    </div>
  );
}

export default ComponentLifecycle;
