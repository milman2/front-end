import React, { useState } from 'react';
import MemoizationExample from './components/MemoizationExample';
import VirtualizationExample from './components/VirtualizationExample';
import LazyLoadingExample from './components/LazyLoadingExample';
import CodeSplittingExample from './components/CodeSplittingExample';
import PerformanceMonitoringExample from './components/PerformanceMonitoringExample';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState<
    'memoization' | 'virtualization' | 'lazy-loading' | 'code-splitting' | 'performance-monitoring'
  >('memoization');

  const renderContent = () => {
    switch (activeTab) {
      case 'memoization':
        return <MemoizationExample />;
      case 'virtualization':
        return <VirtualizationExample />;
      case 'lazy-loading':
        return <LazyLoadingExample />;
      case 'code-splitting':
        return <CodeSplittingExample />;
      case 'performance-monitoring':
        return <PerformanceMonitoringExample />;
      default:
        return <MemoizationExample />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React 성능 최적화 예제 - Step 10</h1>
        <p>React 애플리케이션의 성능을 최적화하는 다양한 기법들을 학습합니다</p>
      </header>

      <nav className="tab-navigation">
        <button
          className={activeTab === 'memoization' ? 'active' : ''}
          onClick={() => setActiveTab('memoization')}
        >
          메모이제이션
        </button>
        <button
          className={activeTab === 'virtualization' ? 'active' : ''}
          onClick={() => setActiveTab('virtualization')}
        >
          가상화
        </button>
        <button
          className={activeTab === 'lazy-loading' ? 'active' : ''}
          onClick={() => setActiveTab('lazy-loading')}
        >
          지연 로딩
        </button>
        <button
          className={activeTab === 'code-splitting' ? 'active' : ''}
          onClick={() => setActiveTab('code-splitting')}
        >
          코드 분할
        </button>
        <button
          className={activeTab === 'performance-monitoring' ? 'active' : ''}
          onClick={() => setActiveTab('performance-monitoring')}
        >
          성능 모니터링
        </button>
      </nav>

      <main className="App-main">{renderContent()}</main>

      <footer className="App-footer">
        <div className="performance-info">
          <h3>성능 최적화 기법들</h3>
          <ul>
            <li>
              ✅ <strong>메모이제이션:</strong> React.memo, useMemo, useCallback
            </li>
            <li>
              ✅ <strong>가상화:</strong> react-window를 사용한 대용량 리스트 최적화
            </li>
            <li>
              ✅ <strong>지연 로딩:</strong> 컴포넌트, 이미지, 데이터 지연 로딩
            </li>
            <li>
              ✅ <strong>코드 분할:</strong> React.lazy와 Suspense를 활용한 번들 분할
            </li>
            <li>
              ✅ <strong>성능 모니터링:</strong> Web Vitals와 성능 메트릭 측정
            </li>
          </ul>
          <p>
            <strong>Step 10:</strong> React 애플리케이션의 성능을 최적화하는 포괄적인 기법들을
            실습합니다
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
