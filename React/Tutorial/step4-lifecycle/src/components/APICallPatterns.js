import React, { useState, useEffect } from 'react';

// 기본 API 호출 패턴
function BasicAPICall() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // 실제 API 대신 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData = {
        id: 1,
        name: '사용자 1',
        email: 'user1@example.com',
        avatar: '👤'
      };
      
      setData(mockData);
    } catch (err) {
      setError('데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="demo-box">
      <h3>기본 API 호출 패턴</h3>
      <button className="button" onClick={fetchData} disabled={loading}>
        {loading ? '로딩 중...' : '데이터 가져오기'}
      </button>
      
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

// useEffect를 사용한 API 호출
function UseEffectAPICall() {
  const [userId, setUserId] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // 실제 API 대신 시뮬레이션
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockData = {
          id: userId,
          name: `사용자 ${userId}`,
          email: `user${userId}@example.com`,
          avatar: `👤${userId}`
        };
        
        setData(mockData);
      } catch (err) {
        setError('사용자 데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]); // userId가 변경될 때마다 새로운 데이터 요청

  return (
    <div className="demo-box">
      <h3>useEffect를 사용한 API 호출</h3>
      <p>사용자 ID가 변경될 때마다 자동으로 새로운 데이터를 가져옵니다.</p>
      
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
        <button 
          className="button" 
          onClick={() => setUserId(Math.floor(Math.random() * 10) + 1)}
        >
          랜덤 ID
        </button>
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

// AbortController를 사용한 요청 취소
function AbortControllerAPICall() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requestId, setRequestId] = useState(0);

  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // 실제 API 대신 시뮬레이션 (3초 소요)
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(resolve, 3000);
          
          // AbortController 시그널 감지
          abortController.signal.addEventListener('abort', () => {
            clearTimeout(timeout);
            reject(new Error('Request aborted'));
          });
        });
        
        if (!abortController.signal.aborted) {
          const mockData = {
            id: requestId,
            name: `요청 ${requestId}`,
            timestamp: new Date().toLocaleTimeString(),
            data: '긴 시간이 걸리는 데이터'
          };
          
          setData(mockData);
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('데이터를 불러오는데 실패했습니다.');
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
      abortController.abort();
    };
  }, [requestId]);

  const startNewRequest = () => {
    setRequestId(prev => prev + 1);
  };

  const cancelRequest = () => {
    setRequestId(prev => prev + 1); // 새로운 요청 ID로 이전 요청 취소
  };

  return (
    <div className="demo-box">
      <h3>AbortController를 사용한 요청 취소</h3>
      <p>3초가 걸리는 요청을 시작하고 중간에 취소할 수 있습니다.</p>
      
      <div style={{ margin: '15px 0' }}>
        <button className="button" onClick={startNewRequest} disabled={loading}>
          새 요청 시작
        </button>
        <button 
          className="button" 
          onClick={cancelRequest}
          style={{ backgroundColor: '#f44336' }}
        >
          요청 취소
        </button>
      </div>
      
      <div style={{ margin: '15px 0' }}>
        <p><strong>요청 ID:</strong> {requestId}</p>
        {loading && <p className="status loading">로딩 중... (3초 소요)</p>}
        {error && <p className="status error">{error}</p>}
        {data && !loading && (
          <div className="user-card">
            <h4>{data.name}</h4>
            <p><strong>ID:</strong> {data.id}</p>
            <p><strong>시간:</strong> {data.timestamp}</p>
            <p><strong>데이터:</strong> {data.data}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// 여러 API 호출 관리
function MultipleAPICalls() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState({ users: false, posts: false });
  const [error, setError] = useState({ users: null, posts: null });

  const fetchUsers = async () => {
    setLoading(prev => ({ ...prev, users: true }));
    setError(prev => ({ ...prev, users: null }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUsers = [
        { id: 1, name: '김개발', email: 'kim@example.com' },
        { id: 2, name: '이리액트', email: 'lee@example.com' },
        { id: 3, name: '박자바', email: 'park@example.com' }
      ];
      
      setUsers(mockUsers);
    } catch (err) {
      setError(prev => ({ ...prev, users: '사용자 데이터 로딩 실패' }));
    } finally {
      setLoading(prev => ({ ...prev, users: false }));
    }
  };

  const fetchPosts = async () => {
    setLoading(prev => ({ ...prev, posts: true }));
    setError(prev => ({ ...prev, posts: null }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockPosts = [
        { id: 1, title: 'React Hooks 완벽 가이드', author: '김개발' },
        { id: 2, title: 'useEffect 마스터하기', author: '이리액트' },
        { id: 3, title: '커스텀 Hook 만들기', author: '박자바' }
      ];
      
      setPosts(mockPosts);
    } catch (err) {
      setError(prev => ({ ...prev, posts: '게시글 데이터 로딩 실패' }));
    } finally {
      setLoading(prev => ({ ...prev, posts: false }));
    }
  };

  const fetchAll = async () => {
    await Promise.all([fetchUsers(), fetchPosts()]);
  };

  return (
    <div className="demo-box">
      <h3>여러 API 호출 관리</h3>
      <p>사용자와 게시글 데이터를 개별적으로 또는 함께 가져올 수 있습니다.</p>
      
      <div style={{ margin: '15px 0' }}>
        <button 
          className="button" 
          onClick={fetchUsers} 
          disabled={loading.users}
        >
          {loading.users ? '로딩 중...' : '사용자 가져오기'}
        </button>
        <button 
          className="button" 
          onClick={fetchPosts} 
          disabled={loading.posts}
        >
          {loading.posts ? '로딩 중...' : '게시글 가져오기'}
        </button>
        <button 
          className="button" 
          onClick={fetchAll}
          disabled={loading.users || loading.posts}
        >
          모두 가져오기
        </button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <h4>사용자 목록</h4>
          {loading.users && <p className="status loading">로딩 중...</p>}
          {error.users && <p className="status error">{error.users}</p>}
          {users.map(user => (
            <div key={user.id} className="user-card">
              <h5>{user.name}</h5>
              <p>{user.email}</p>
            </div>
          ))}
        </div>
        
        <div>
          <h4>게시글 목록</h4>
          {loading.posts && <p className="status loading">로딩 중...</p>}
          {error.posts && <p className="status error">{error.posts}</p>}
          {posts.map(post => (
            <div key={post.id} className="user-card">
              <h5>{post.title}</h5>
              <p>작성자: {post.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 에러 처리와 재시도 패턴
function ErrorHandlingAndRetry() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [maxRetries] = useState(3);

  const fetchDataWithRetry = async (attempt = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      // 30% 확률로 실패하는 시뮬레이션
      if (Math.random() < 0.3) {
        throw new Error('네트워크 오류');
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData = {
        id: attempt,
        message: `시도 ${attempt}번째 성공!`,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setData(mockData);
      setRetryCount(0);
    } catch (err) {
      if (attempt < maxRetries) {
        setRetryCount(attempt);
        setTimeout(() => {
          fetchDataWithRetry(attempt + 1);
        }, 1000 * attempt); // 지수 백오프
      } else {
        setError(`최대 재시도 횟수(${maxRetries})를 초과했습니다.`);
        setRetryCount(0);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="demo-box">
      <h3>에러 처리와 재시도 패턴</h3>
      <p>30% 확률로 실패하는 API를 재시도 로직과 함께 호출합니다.</p>
      
      <div style={{ margin: '15px 0' }}>
        <button 
          className="button" 
          onClick={() => fetchDataWithRetry()} 
          disabled={loading}
        >
          {loading ? '로딩 중...' : '데이터 가져오기 (재시도 포함)'}
        </button>
      </div>
      
      {retryCount > 0 && (
        <p className="status loading">
          재시도 중... ({retryCount}/{maxRetries})
        </p>
      )}
      {loading && retryCount === 0 && <p className="status loading">로딩 중...</p>}
      {error && <p className="status error">{error}</p>}
      {data && !loading && (
        <div className="user-card">
          <h4>{data.message}</h4>
          <p><strong>ID:</strong> {data.id}</p>
          <p><strong>시간:</strong> {data.timestamp}</p>
        </div>
      )}
    </div>
  );
}

function APICallPatterns() {
  return (
    <div className="component-section">
      <h2>3. API 호출 패턴 익히기</h2>
      <p>
        React에서 API 호출을 처리하는 다양한 패턴을 익혀보세요.
        로딩 상태, 에러 처리, 요청 취소 등을 포함한 실전 패턴들을 다룹니다.
      </p>

      <div className="code-example">
        <strong>기본 API 호출 패턴:</strong><br/>
        {`function APICall() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError('데이터 로딩 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchData}>데이터 가져오기</button>
      {loading && <p>로딩 중...</p>}
      {error && <p>에러: {error}</p>}
      {data && <div>{JSON.stringify(data)}</div>}
    </div>
  );
}`}
      </div>

      <BasicAPICall />
      <UseEffectAPICall />
      <AbortControllerAPICall />
      <MultipleAPICalls />
      <ErrorHandlingAndRetry />

      <div className="highlight">
        <strong>API 호출 모범 사례:</strong>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li><strong>로딩 상태:</strong> 사용자에게 진행 상황 표시</li>
          <li><strong>에러 처리:</strong> 적절한 에러 메시지 제공</li>
          <li><strong>요청 취소:</strong> AbortController로 불필요한 요청 취소</li>
          <li><strong>재시도 로직:</strong> 네트워크 오류 시 자동 재시도</li>
          <li><strong>상태 관리:</strong> 여러 API 호출 상태 분리</li>
        </ul>
      </div>

      <div className="code-example">
        <strong>고급 API 호출 패턴:</strong><br/>
        {`// 1. AbortController로 요청 취소
useEffect(() => {
  const controller = new AbortController();
  
  const fetchData = async () => {
    try {
      const response = await fetch(url, { 
        signal: controller.signal 
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      if (error.name !== 'AbortError') {
        setError(error.message);
      }
    }
  };
  
  fetchData();
  
  return () => controller.abort();
}, [url]);

// 2. 재시도 로직
const fetchWithRetry = async (url, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => 
        setTimeout(resolve, 1000 * Math.pow(2, i))
      );
    }
  }
};`}
      </div>
    </div>
  );
}

export default APICallPatterns;
