import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import FetchExample from './components/FetchExample';
import AxiosExample from './components/AxiosExample';
import SWRExample from './components/SWRExample';
import ReactQueryExample from './components/ReactQueryExample';

// React Query 클라이언트 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5분
      cacheTime: 10 * 60 * 1000, // 10분
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  const [activeTab, setActiveTab] = useState<'fetch' | 'axios' | 'swr' | 'react-query'>('fetch');

  const renderContent = () => {
    switch (activeTab) {
      case 'fetch':
        return <FetchExample />;
      case 'axios':
        return <AxiosExample />;
      case 'swr':
        return <SWRExample />;
      case 'react-query':
        return <ReactQueryExample />;
      default:
        return <FetchExample />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          <h1>React API 통신과 데이터 페칭 - Step 9</h1>
          <p>다양한 방법으로 API 통신과 데이터 페칭을 구현해보세요</p>
        </header>

        <nav className="App-nav">
          <button
            className={activeTab === 'fetch' ? 'active' : ''}
            onClick={() => setActiveTab('fetch')}
          >
            Fetch API
          </button>
          <button
            className={activeTab === 'axios' ? 'active' : ''}
            onClick={() => setActiveTab('axios')}
          >
            Axios
          </button>
          <button
            className={activeTab === 'swr' ? 'active' : ''}
            onClick={() => setActiveTab('swr')}
          >
            SWR
          </button>
          <button
            className={activeTab === 'react-query' ? 'active' : ''}
            onClick={() => setActiveTab('react-query')}
          >
            React Query
          </button>
        </nav>

        <main className="App-main">
          {renderContent()}
        </main>

        <footer className="App-footer">
          <div className="footer-content">
            <h3>Step 9: API 통신과 데이터 페칭</h3>
            <div className="features-list">
              <div className="feature-item">
                <h4>🌐 Fetch API</h4>
                <p>네이티브 Fetch API를 사용한 기본적인 HTTP 요청</p>
              </div>
              <div className="feature-item">
                <h4>📡 Axios</h4>
                <p>강력한 HTTP 클라이언트 라이브러리</p>
              </div>
              <div className="feature-item">
                <h4>⚡ SWR</h4>
                <p>데이터 페칭을 위한 React 훅 라이브러리</p>
              </div>
              <div className="feature-item">
                <h4>🎯 React Query</h4>
                <p>서버 상태 관리를 위한 강력한 라이브러리</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  );
}

export default App;
