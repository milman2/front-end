import React, { useState } from 'react';
import { useCounter } from '../hooks/useCounter';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useFetch } from '../hooks/useFetch';
import { useDebounce } from '../hooks/useDebounce';

// useCounter 커스텀 Hook 사용 예제
function CounterDemo() {
  const counter1 = useCounter(0, 1);
  const counter2 = useCounter(10, 5);

  return (
    <div className="demo-box">
      <h3>useCounter 커스텀 Hook</h3>
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0' }}>
        <div>
          <h4>카운터 1 (0부터 시작, 1씩 증가)</h4>
          <div className="counter">{counter1.count}</div>
          <button className="button" onClick={counter1.increment}>+1</button>
          <button className="button" onClick={counter1.decrement}>-1</button>
          <button className="button" onClick={counter1.reset}>리셋</button>
        </div>
        <div>
          <h4>카운터 2 (10부터 시작, 5씩 증가)</h4>
          <div className="counter">{counter2.count}</div>
          <button className="button" onClick={counter2.increment}>+5</button>
          <button className="button" onClick={counter2.decrement}>-5</button>
          <button className="button" onClick={counter2.reset}>리셋</button>
        </div>
      </div>
    </div>
  );
}

// useLocalStorage 커스텀 Hook 사용 예제
function LocalStorageDemo() {
  const [name, setName] = useLocalStorage('userName', '');
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [settings, setSettings] = useLocalStorage('userSettings', {
    notifications: true,
    language: 'ko',
    fontSize: 14
  });

  return (
    <div className="demo-box">
      <h3>useLocalStorage 커스텀 Hook</h3>
      <p>이 값들은 브라우저를 새로고침해도 유지됩니다!</p>
      
      <div style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
        <div style={{ margin: '10px 0' }}>
          <label>이름: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: '5px', width: '150px' }}
          />
        </div>
        
        <div style={{ margin: '10px 0' }}>
          <label>테마: </label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            style={{ padding: '5px', width: '150px' }}
          >
            <option value="light">라이트</option>
            <option value="dark">다크</option>
            <option value="blue">블루</option>
          </select>
        </div>
        
        <div style={{ margin: '10px 0' }}>
          <label>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => setSettings(prev => ({ ...prev, notifications: e.target.checked }))}
            />
            알림 받기
          </label>
        </div>
        
        <div style={{ margin: '10px 0' }}>
          <label>언어: </label>
          <select
            value={settings.language}
            onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
            style={{ padding: '5px', width: '150px' }}
          >
            <option value="ko">한국어</option>
            <option value="en">English</option>
            <option value="ja">日本語</option>
          </select>
        </div>
      </div>
      
      <div style={{ background: '#f5f5f5', padding: '10px', margin: '15px 0', borderRadius: '5px' }}>
        <strong>현재 설정:</strong>
        <pre>{JSON.stringify({ name, theme, settings }, null, 2)}</pre>
      </div>
    </div>
  );
}

// useFetch 커스텀 Hook 사용 예제
function FetchDemo() {
  const [userId, setUserId] = useState(1);
  const { data, loading, error, refetch } = useFetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );

  return (
    <div className="demo-box">
      <h3>useFetch 커스텀 Hook</h3>
      <p>JSONPlaceholder API에서 사용자 데이터를 가져옵니다.</p>
      
      <div style={{ margin: '15px 0' }}>
        <label>사용자 ID: </label>
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(parseInt(e.target.value) || 1)}
          min="1"
          max="10"
          style={{ padding: '5px', width: '80px', marginRight: '10px' }}
        />
        <button className="button" onClick={refetch}>새로고침</button>
      </div>
      
      {loading && <p className="status loading">로딩 중...</p>}
      {error && <p className="status error">에러: {error}</p>}
      {data && !loading && (
        <div className="user-card">
          <h4>{data.name}</h4>
          <p><strong>사용자명:</strong> {data.username}</p>
          <p><strong>이메일:</strong> {data.email}</p>
          <p><strong>전화:</strong> {data.phone}</p>
          <p><strong>웹사이트:</strong> {data.website}</p>
        </div>
      )}
    </div>
  );
}

// useDebounce 커스텀 Hook 사용 예제
function DebounceDemo() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  return (
    <div className="demo-box">
      <h3>useDebounce 커스텀 Hook</h3>
      <p>검색어 입력 후 500ms 후에 검색이 실행됩니다.</p>
      
      <div style={{ margin: '15px 0' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="검색어를 입력하세요..."
          style={{ padding: '8px', width: '250px' }}
        />
      </div>
      
      <div style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
        <p><strong>실시간 입력:</strong> {searchTerm}</p>
        <p><strong>디바운스된 검색어:</strong> {debouncedSearchTerm}</p>
        {debouncedSearchTerm && (
          <p style={{ color: '#4caf50', fontWeight: 'bold' }}>
            🔍 "{debouncedSearchTerm}" 검색 실행됨!
          </p>
        )}
      </div>
    </div>
  );
}

function CustomHookExample() {
  return (
    <div className="component-section">
      <h2>5. 커스텀 Hook 만들기</h2>
      <p>
        커스텀 Hook은 React의 내장 Hook들을 조합하여 재사용 가능한 로직을 만드는 방법입니다.
        "use"로 시작하는 함수로 만들어야 하며, 다른 Hook들을 호출할 수 있습니다.
      </p>

      <div className="code-example">
        <strong>커스텀 Hook 기본 구조:</strong><br/>
        {`import { useState, useEffect } from 'react';

// 커스텀 Hook (use로 시작)
function useCustomHook(initialValue) {
  const [value, setValue] = useState(initialValue);
  
  useEffect(() => {
    // 사이드 이펙트
  }, []);
  
  return { value, setValue };
}

// 사용법
function MyComponent() {
  const { value, setValue } = useCustomHook('초기값');
  
  return <div>{value}</div>;
}`}
      </div>

      <CounterDemo />
      <LocalStorageDemo />
      <FetchDemo />
      <DebounceDemo />

      <div className="highlight">
        <strong>커스텀 Hook의 특징:</strong>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li>"use"로 시작하는 함수명</li>
          <li>다른 Hook들을 호출할 수 있음</li>
          <li>로직의 재사용성 향상</li>
          <li>컴포넌트 간 상태 로직 공유</li>
          <li>테스트하기 쉬운 구조</li>
        </ul>
      </div>

      <div className="code-example">
        <strong>커스텀 Hook 예제들:</strong><br/>
        {`// 1. 카운터 Hook
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  return { count, increment, decrement };
}

// 2. 로컬 스토리지 Hook
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };
  
  return [storedValue, setValue];
}

// 3. API 호출 Hook
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [url]);
  
  return { data, loading, error };
}`}
      </div>
    </div>
  );
}

export default CustomHookExample;
