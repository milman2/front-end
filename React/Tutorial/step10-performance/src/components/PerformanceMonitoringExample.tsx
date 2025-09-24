import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';
import './PerformanceMonitoringExample.css';

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  description: string;
}

interface RenderTime {
  component: string;
  renderTime: number;
  timestamp: number;
}

const PerformanceMonitoringExample: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [renderTimes, setRenderTimes] = useState<RenderTime[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [memoryUsage, setMemoryUsage] = useState<any>(null);
  const renderStartTime = useRef<number>(0);

  // Web Vitals 메트릭 수집
  useEffect(() => {
    const collectWebVitals = () => {
      getCLS((metric) => {
        setMetrics(prev => [...prev.filter(m => m.name !== 'CLS'), {
          name: 'CLS',
          value: metric.value,
          rating: metric.rating,
          description: 'Cumulative Layout Shift - 레이아웃 이동 측정'
        }]);
      });

      getFID((metric) => {
        setMetrics(prev => [...prev.filter(m => m.name !== 'FID'), {
          name: 'FID',
          value: metric.value,
          rating: metric.rating,
          description: 'First Input Delay - 첫 입력 지연 시간'
        }]);
      });

      getFCP((metric) => {
        setMetrics(prev => [...prev.filter(m => m.name !== 'FCP'), {
          name: 'FCP',
          value: metric.value,
          rating: metric.rating,
          description: 'First Contentful Paint - 첫 콘텐츠 렌더링 시간'
        }]);
      });

      getLCP((metric) => {
        setMetrics(prev => [...prev.filter(m => m.name !== 'LCP'), {
          name: 'LCP',
          value: metric.value,
          rating: metric.rating,
          description: 'Largest Contentful Paint - 가장 큰 콘텐츠 렌더링 시간'
        }]);
      });

      getTTFB((metric) => {
        setMetrics(prev => [...prev.filter(m => m.name !== 'TTFB'), {
          name: 'TTFB',
          value: metric.value,
          rating: metric.rating,
          description: 'Time to First Byte - 첫 바이트 수신 시간'
        }]);
      });
    };

    if (isMonitoring) {
      collectWebVitals();
    }
  }, [isMonitoring]);

  // 메모리 사용량 모니터링
  useEffect(() => {
    const updateMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        setMemoryUsage({
          used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
          total: Math.round(memory.totalJSHeapSize / 1024 / 1024),
          limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024),
        });
      }
    };

    let interval: NodeJS.Timeout;
    if (isMonitoring) {
      updateMemoryUsage();
      interval = setInterval(updateMemoryUsage, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMonitoring]);

  // 컴포넌트 렌더링 시간 측정
  const measureRenderTime = useCallback((componentName: string, renderFn: () => void) => {
    renderStartTime.current = performance.now();
    renderFn();
    const renderTime = performance.now() - renderStartTime.current;
    
    setRenderTimes(prev => [...prev, {
      component: componentName,
      renderTime: Math.round(renderTime * 100) / 100,
      timestamp: Date.now(),
    }]);
  }, []);

  // 성능 테스트 컴포넌트들
  const HeavyComponent = () => {
    const [data, setData] = useState<number[]>([]);
    
    useEffect(() => {
      measureRenderTime('HeavyComponent', () => {
        const heavyData = Array.from({ length: 10000 }, () => Math.random());
        setData(heavyData);
      });
    }, [measureRenderTime]);

    return (
      <div className="heavy-component">
        <h4>무거운 컴포넌트</h4>
        <p>10,000개의 랜덤 데이터 처리</p>
        <p>데이터 개수: {data.length}</p>
      </div>
    );
  };

  const LightComponent = () => {
    useEffect(() => {
      measureRenderTime('LightComponent', () => {
        // 가벼운 작업
      });
    }, [measureRenderTime]);

    return (
      <div className="light-component">
        <h4>가벼운 컴포넌트</h4>
        <p>최소한의 렌더링 작업</p>
      </div>
    );
  };

  const handleStartMonitoring = () => {
    setIsMonitoring(true);
    setMetrics([]);
    setRenderTimes([]);
  };

  const handleStopMonitoring = () => {
    setIsMonitoring(false);
  };

  const handleClearData = () => {
    setMetrics([]);
    setRenderTimes([]);
    setMemoryUsage(null);
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good': return '#28a745';
      case 'needs-improvement': return '#ffc107';
      case 'poor': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getRatingText = (rating: string) => {
    switch (rating) {
      case 'good': return '좋음';
      case 'needs-improvement': return '개선 필요';
      case 'poor': return '나쁨';
      default: return '알 수 없음';
    }
  };

  return (
    <div className="performance-monitoring-example">
      <h2>성능 모니터링 도구 예제</h2>
      
      <div className="monitoring-controls">
        <div className="control-group">
          <button 
            className={`monitor-btn ${isMonitoring ? 'stop' : 'start'}`}
            onClick={isMonitoring ? handleStopMonitoring : handleStartMonitoring}
          >
            {isMonitoring ? '모니터링 중지' : '모니터링 시작'}
          </button>
          <button className="clear-btn" onClick={handleClearData}>
            데이터 초기화
          </button>
        </div>
        
        <div className="monitoring-status">
          <span className={`status-indicator ${isMonitoring ? 'active' : 'inactive'}`}>
            {isMonitoring ? '● 모니터링 중' : '○ 모니터링 중지'}
          </span>
        </div>
      </div>

      <div className="performance-sections">
        <div className="web-vitals-section">
          <h3>Web Vitals 메트릭</h3>
          <div className="metrics-grid">
            {metrics.map(metric => (
              <div key={metric.name} className="metric-card">
                <div className="metric-header">
                  <h4>{metric.name}</h4>
                  <span 
                    className="rating-badge"
                    style={{ backgroundColor: getRatingColor(metric.rating) }}
                  >
                    {getRatingText(metric.rating)}
                  </span>
                </div>
                <div className="metric-value">
                  {metric.value.toFixed(2)}
                  {metric.name === 'CLS' ? '' : 'ms'}
                </div>
                <div className="metric-description">
                  {metric.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="memory-usage-section">
          <h3>메모리 사용량</h3>
          {memoryUsage ? (
            <div className="memory-card">
              <div className="memory-item">
                <span className="memory-label">사용 중:</span>
                <span className="memory-value">{memoryUsage.used} MB</span>
              </div>
              <div className="memory-item">
                <span className="memory-label">총 할당:</span>
                <span className="memory-value">{memoryUsage.total} MB</span>
              </div>
              <div className="memory-item">
                <span className="memory-label">제한:</span>
                <span className="memory-value">{memoryUsage.limit} MB</span>
              </div>
              <div className="memory-progress">
                <div 
                  className="memory-bar"
                  style={{ 
                    width: `${(memoryUsage.used / memoryUsage.limit) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          ) : (
            <p>메모리 정보를 사용할 수 없습니다.</p>
          )}
        </div>

        <div className="render-times-section">
          <h3>컴포넌트 렌더링 시간</h3>
          <div className="render-times-list">
            {renderTimes.slice(-10).reverse().map((render, index) => (
              <div key={index} className="render-time-item">
                <span className="component-name">{render.component}</span>
                <span className="render-time">{render.renderTime}ms</span>
                <span className="timestamp">
                  {new Date(render.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="performance-test-section">
          <h3>성능 테스트</h3>
          <div className="test-components">
            <HeavyComponent />
            <LightComponent />
          </div>
        </div>
      </div>

      <div className="performance-tips">
        <h3>성능 최적화 팁</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <h4>CLS 개선</h4>
            <ul>
              <li>이미지와 광고에 명시적 크기 설정</li>
              <li>동적 콘텐츠 삽입 시 공간 예약</li>
              <li>웹 폰트 로딩 최적화</li>
            </ul>
          </div>
          <div className="tip-card">
            <h4>FID 개선</h4>
            <ul>
              <li>JavaScript 번들 크기 최적화</li>
              <li>긴 작업을 작은 청크로 분할</li>
              <li>Web Workers 활용</li>
            </ul>
          </div>
          <div className="tip-card">
            <h4>LCP 개선</h4>
            <ul>
              <li>이미지 최적화 및 압축</li>
              <li>CDN 사용</li>
              <li>서버 응답 시간 개선</li>
            </ul>
          </div>
          <div className="tip-card">
            <h4>메모리 최적화</h4>
            <ul>
              <li>메모리 누수 방지</li>
              <li>불필요한 이벤트 리스너 제거</li>
              <li>가비지 컬렉션 최적화</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitoringExample;
