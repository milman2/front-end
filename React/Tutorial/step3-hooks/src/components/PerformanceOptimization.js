import React, { useState, useMemo, useCallback, memo } from 'react';

// React.memo를 사용한 컴포넌트 최적화
const ExpensiveComponent = memo(({ value, onUpdate }) => {
  console.log('ExpensiveComponent 렌더링됨');
  
  // 복잡한 계산 시뮬레이션
  const expensiveValue = useMemo(() => {
    console.log('복잡한 계산 실행됨');
    let result = 0;
    for (let i = 0; i < value * 1000000; i++) {
      result += i;
    }
    return result;
  }, [value]);

  return (
    <div style={{ 
      background: '#e8f5e8', 
      padding: '15px', 
      borderRadius: '5px',
      margin: '10px 0'
    }}>
      <h4>비용이 큰 컴포넌트</h4>
      <p>값: {value}</p>
      <p>계산 결과: {expensiveValue}</p>
      <button className="button" onClick={() => onUpdate(value + 1)}>
        값 증가
      </button>
    </div>
  );
});

// useCallback을 사용하지 않은 컴포넌트
function WithoutCallback() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  // 매번 새로운 함수가 생성됨
  const handleUpdate = (newValue) => {
    setCount(newValue);
  };

  return (
    <div className="demo-box">
      <h3>useCallback 없이 (비효율적)</h3>
      <p>다른 상태: {otherState}</p>
      <button className="button" onClick={() => setOtherState(otherState + 1)}>
        다른 상태 변경
      </button>
      <ExpensiveComponent value={count} onUpdate={handleUpdate} />
    </div>
  );
}

// useCallback을 사용한 컴포넌트
function WithCallback() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  // useCallback으로 함수 메모이제이션
  const handleUpdate = useCallback((newValue) => {
    setCount(newValue);
  }, []);

  return (
    <div className="demo-box">
      <h3>useCallback 사용 (효율적)</h3>
      <p>다른 상태: {otherState}</p>
      <button className="button" onClick={() => setOtherState(otherState + 1)}>
        다른 상태 변경
      </button>
      <ExpensiveComponent value={count} onUpdate={handleUpdate} />
    </div>
  );
}

// useMemo 예제
function MemoExample() {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);
  const [filter, setFilter] = useState('all');

  // useMemo로 계산 결과 메모이제이션
  const filteredNumbers = useMemo(() => {
    console.log('필터링 계산 실행됨');
    switch (filter) {
      case 'even':
        return numbers.filter(n => n % 2 === 0);
      case 'odd':
        return numbers.filter(n => n % 2 !== 0);
      default:
        return numbers;
    }
  }, [numbers, filter]);

  const sum = useMemo(() => {
    console.log('합계 계산 실행됨');
    return filteredNumbers.reduce((acc, num) => acc + num, 0);
  }, [filteredNumbers]);

  const addNumber = () => {
    setNumbers(prev => [...prev, Math.floor(Math.random() * 100) + 1]);
  };

  return (
    <div className="demo-box">
      <h3>useMemo 예제</h3>
      <div style={{ margin: '15px 0' }}>
        <button className="button" onClick={addNumber}>숫자 추가</button>
        <button 
          className="button" 
          onClick={() => setFilter(filter === 'all' ? 'even' : filter === 'even' ? 'odd' : 'all')}
        >
          필터: {filter === 'all' ? '전체' : filter === 'even' ? '짝수' : '홀수'}
        </button>
      </div>
      
      <div style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
        <p><strong>원본 배열:</strong> [{numbers.join(', ')}]</p>
        <p><strong>필터된 배열:</strong> [{filteredNumbers.join(', ')}]</p>
        <p><strong>합계:</strong> {sum}</p>
      </div>
    </div>
  );
}

// 성능 비교 예제
function PerformanceComparison() {
  const [renderCount, setRenderCount] = useState(0);

  // 매번 새로운 객체 생성 (비효율적)
  const inefficientObject = {
    timestamp: Date.now(),
    random: Math.random()
  };

  // useMemo로 객체 메모이제이션 (효율적)
  const efficientObject = useMemo(() => ({
    timestamp: Date.now(),
    random: Math.random()
  }), [renderCount]);

  return (
    <div className="demo-box">
      <h3>성능 비교</h3>
      <p>렌더링 횟수: {renderCount}</p>
      <button className="button" onClick={() => setRenderCount(renderCount + 1)}>
        강제 리렌더링
      </button>
      
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0' }}>
        <div style={{ background: '#ffebee', padding: '10px', borderRadius: '5px' }}>
          <h4>비효율적 (매번 새 객체)</h4>
          <p>타임스탬프: {inefficientObject.timestamp}</p>
          <p>랜덤값: {inefficientObject.random}</p>
        </div>
        <div style={{ background: '#e8f5e8', padding: '10px', borderRadius: '5px' }}>
          <h4>효율적 (메모이제이션)</h4>
          <p>타임스탬프: {efficientObject.timestamp}</p>
          <p>랜덤값: {efficientObject.random}</p>
        </div>
      </div>
    </div>
  );
}

function PerformanceOptimization() {
  return (
    <div className="component-section">
      <h2>6. useMemo, useCallback으로 성능 최적화하기</h2>
      <p>
        React에서 성능 최적화를 위해 useMemo와 useCallback을 사용할 수 있습니다.
        하지만 과도한 사용은 오히려 성능을 저하시킬 수 있으므로 적절히 사용해야 합니다.
      </p>

      <div className="code-example">
        <strong>성능 최적화 Hook들:</strong><br/>
        {`import React, { useMemo, useCallback, memo } from 'react';

// 1. useMemo - 계산 결과 메모이제이션
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// 2. useCallback - 함수 메모이제이션
const handleClick = useCallback(() => {
  doSomething(value);
}, [value]);

// 3. React.memo - 컴포넌트 메모이제이션
const MyComponent = memo(({ prop1, prop2 }) => {
  return <div>{prop1} {prop2}</div>;
});`}
      </div>

      <WithoutCallback />
      <WithCallback />
      <MemoExample />
      <PerformanceComparison />

      <div className="highlight">
        <strong>성능 최적화 가이드라인:</strong>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li><strong>useMemo:</strong> 비용이 큰 계산 결과를 메모이제이션</li>
          <li><strong>useCallback:</strong> 자식 컴포넌트에 전달하는 함수를 메모이제이션</li>
          <li><strong>React.memo:</strong> Props가 변경되지 않으면 리렌더링 방지</li>
          <li><strong>주의:</strong> 과도한 사용은 오히려 성능 저하</li>
          <li><strong>측정:</strong> React DevTools로 성능 측정 후 최적화</li>
        </ul>
      </div>

      <div className="code-example">
        <strong>언제 사용해야 할까?</strong><br/>
        {`// ✅ 좋은 사용 예
const expensiveValue = useMemo(() => {
  return items.filter(item => item.active).length;
}, [items]);

const handleClick = useCallback((id) => {
  onItemClick(id);
}, [onItemClick]);

// ❌ 나쁜 사용 예
const simpleValue = useMemo(() => {
  return a + b; // 간단한 계산
}, [a, b]);

const handleClick = useCallback(() => {
  console.log('clicked'); // 의존성이 없는 함수
}, []);`}
      </div>

      <div className="highlight">
        <strong>성능 최적화 체크리스트:</strong>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li>React DevTools Profiler로 성능 측정</li>
          <li>불필요한 리렌더링 원인 파악</li>
          <li>비용이 큰 계산 식별</li>
          <li>자식 컴포넌트에 전달하는 함수 최적화</li>
          <li>과도한 최적화 피하기</li>
        </ul>
      </div>
    </div>
  );
}

export default PerformanceOptimization;
