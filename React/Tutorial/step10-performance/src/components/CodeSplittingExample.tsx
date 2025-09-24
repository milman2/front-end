import React, { useState, Suspense, lazy, ComponentType } from 'react';
import './CodeSplittingExample.css';

// Start of Selection
// 동적 import를 사용한 코드 분할
const Dashboard = lazy(() =>
  import('./Dashboard').catch(() => ({
    default: () => <div>대시보드 모듈을 찾을 수 없습니다.</div>,
  }))
);
const UserManagement = lazy(() =>
  import('./UserManagement').catch(() => ({
    default: () => <div>사용자 관리 모듈을 찾을 수 없습니다.</div>,
  }))
);
const Analytics = lazy(() =>
  import('./Analytics').catch(() => ({ default: () => <div>분석 모듈을 찾을 수 없습니다.</div> }))
);
const Settings = lazy(() =>
  import('./Settings').catch(() => ({ default: () => <div>설정 모듈을 찾을 수 없습니다.</div> }))
);
const Reports = lazy(() =>
  import('./Reports').catch(() => ({ default: () => <div>보고서 모듈을 찾을 수 없습니다.</div> }))
);

// 로딩 컴포넌트
const LoadingComponent: React.FC<{ name: string }> = ({ name }) => (
  <div className="loading-component">
    <div className="spinner"></div>
    <p>{name} 모듈을 로딩 중...</p>
  </div>
);

// 에러 바운더리 컴포넌트
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType<{ error?: Error }> },
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} />;
    }

    return this.props.children;
  }
}

const DefaultErrorFallback: React.FC<{ error?: Error }> = ({ error }) => (
  <div className="error-fallback">
    <h3>모듈 로딩 중 오류가 발생했습니다</h3>
    <p>{error?.message || '알 수 없는 오류가 발생했습니다.'}</p>
    <button onClick={() => window.location.reload()}>페이지 새로고침</button>
  </div>
);

// 모듈 정보 인터페이스
interface ModuleInfo {
  name: string;
  component: ComponentType;
  description: string;
  estimatedSize: string;
  features: string[];
}

const CodeSplittingExample: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string>('dashboard');
  const [loadedModules, setLoadedModules] = useState<Set<string>>(new Set(['dashboard']));
  const [loadingTimes, setLoadingTimes] = useState<Record<string, number>>({});

  // 안전한 Object.values 헬퍼 함수
  const safeObjectValues = (obj: any): number[] => {
    if (!obj || typeof obj !== 'object' || obj === null) return [];
    try {
      return Object.values(obj) as number[];
    } catch {
      return [];
    }
  };

  // 안전한 Object.entries 헬퍼 함수
  const safeObjectEntries = (obj: any): [string, any][] => {
    if (!obj || typeof obj !== 'object' || obj === null) return [];
    try {
      return Object.entries(obj);
    } catch {
      return [];
    }
  };

  // 모듈 정보
  const modules: Record<string, ModuleInfo> = {
    dashboard: {
      name: 'Dashboard',
      component: Dashboard,
      description: '대시보드 및 메인 화면',
      estimatedSize: '~50KB',
      features: ['차트', '위젯', '요약 정보'],
    },
    users: {
      name: 'User Management',
      component: UserManagement,
      description: '사용자 관리 시스템',
      estimatedSize: '~80KB',
      features: ['사용자 목록', '권한 관리', '프로필 편집'],
    },
    analytics: {
      name: 'Analytics',
      component: Analytics,
      description: '데이터 분석 및 통계',
      estimatedSize: '~120KB',
      features: ['통계 차트', '데이터 시각화', '리포트 생성'],
    },
    settings: {
      name: 'Settings',
      component: Settings,
      description: '시스템 설정 및 구성',
      estimatedSize: '~40KB',
      features: ['환경 설정', '사용자 설정', '시스템 구성'],
    },
    reports: {
      name: 'Reports',
      component: Reports,
      description: '리포트 생성 및 관리',
      estimatedSize: '~90KB',
      features: ['리포트 생성', '템플릿 관리', '내보내기'],
    },
  };

  const handleModuleLoad = (moduleName: string) => {
    const startTime = performance.now();

    setActiveModule(moduleName);

    if (!loadedModules.has(moduleName)) {
      setLoadedModules((prev) => new Set(Array.from(prev).concat(moduleName)));
    }

    // 로딩 시간 측정 (실제로는 모듈이 로드된 후 측정해야 함)
    setTimeout(() => {
      const endTime = performance.now();
      const loadingTime = Math.round(endTime - startTime);
      setLoadingTimes((prev) => ({ ...prev, [moduleName]: loadingTime }));
    }, 100);
  };

  const renderModule = () => {
    const module = modules[activeModule];
    if (!module) return null;

    return (
      <ErrorBoundary>
        <Suspense fallback={<LoadingComponent name={module.name} />}>
          <module.component />
        </Suspense>
      </ErrorBoundary>
    );
  };

  return (
    <div className="code-splitting-example">
      <h2>코드 분할(Code Splitting) 최적화 예제</h2>

      <div className="module-navigation">
        <h3>모듈 선택</h3>
        <div className="module-buttons">
          {safeObjectEntries(modules).map(([key, module]) => (
            <button
              key={key}
              className={`module-button ${activeModule === key ? 'active' : ''} ${
                loadedModules.has(key) ? 'loaded' : ''
              }`}
              onClick={() => handleModuleLoad(key)}
            >
              <div className="module-name">{module.name}</div>
              <div className="module-size">{module.estimatedSize}</div>
              {loadedModules.has(key) && <div className="loaded-indicator">✓</div>}
            </button>
          ))}
        </div>
      </div>

      <div className="module-info">
        <h3>현재 모듈 정보</h3>
        <div className="info-card">
          <h4>{modules[activeModule]?.name}</h4>
          <p>{modules[activeModule]?.description}</p>
          <div className="module-details">
            <div className="detail-item">
              <strong>예상 크기:</strong> {modules[activeModule]?.estimatedSize}
            </div>
            <div className="detail-item">
              <strong>로딩 시간:</strong>
              {loadingTimes[activeModule] ? `${loadingTimes[activeModule]}ms` : '측정 중...'}
            </div>
            <div className="detail-item">
              <strong>로딩 상태:</strong>
              {loadedModules.has(activeModule) ? '로드됨' : '로딩 중...'}
            </div>
          </div>
          <div className="features">
            <strong>주요 기능:</strong>
            <ul>
              {modules[activeModule]?.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="module-content">
        <h3>모듈 콘텐츠</h3>
        <div className="content-container">{renderModule()}</div>
      </div>

      <div className="performance-stats">
        <h3>성능 통계</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{loadedModules.size}</div>
            <div className="stat-label">로드된 모듈</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {safeObjectValues(loadingTimes).reduce((sum, time) => sum + time, 0)}ms
            </div>
            <div className="stat-label">총 로딩 시간</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">
              {safeObjectValues(loadingTimes).length > 0
                ? Math.round(
                    safeObjectValues(loadingTimes).reduce((sum, time) => sum + time, 0) /
                      safeObjectValues(loadingTimes).length
                  )
                : 0}
              ms
            </div>
            <div className="stat-label">평균 로딩 시간</div>
          </div>
        </div>
      </div>

      <div className="explanation">
        <h3>코드 분할 최적화 설명</h3>
        <ul>
          <li>
            <strong>동적 Import:</strong> React.lazy()를 사용하여 컴포넌트를 필요할 때만 로드
          </li>
          <li>
            <strong>Suspense:</strong> 로딩 상태를 처리하고 사용자에게 피드백 제공
          </li>
          <li>
            <strong>Error Boundary:</strong> 모듈 로딩 실패 시 에러 처리
          </li>
          <li>
            <strong>번들 분할:</strong> 초기 번들 크기를 줄여서 첫 로딩 시간 단축
          </li>
          <li>
            <strong>캐싱:</strong> 한 번 로드된 모듈은 브라우저에 캐시되어 재사용
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CodeSplittingExample;
