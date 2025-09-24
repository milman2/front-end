import React, { useState, useEffect, useRef, useCallback, Suspense, lazy } from 'react';
import './LazyLoadingExample.css';

// 지연 로딩을 위한 컴포넌트들
const HeavyComponent = lazy(() => import('./HeavyComponent'));
const ImageGallery = lazy(() => import('./ImageGallery'));
const DataTable = lazy(() => import('./DataTable'));
const ChartComponent = lazy(() => import('./ChartComponent'));

// 로딩 스피너 컴포넌트
const LoadingSpinner: React.FC = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>컴포넌트를 로딩 중...</p>
  </div>
);

// Intersection Observer를 사용한 지연 로딩 훅
const useIntersectionObserver = (
  ref: React.RefObject<HTMLElement | null>,
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1, ...options }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return isIntersecting;
};

// 이미지 지연 로딩 컴포넌트
const LazyImage: React.FC<{
  src: string;
  alt: string;
  placeholder?: string;
  className?: string;
}> = ({ src, alt, placeholder = '/api/placeholder/300/200', className = '' }) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const isIntersecting = useIntersectionObserver(imgRef);

  useEffect(() => {
    if (isIntersecting && !isLoaded) {
      const img = new Image();
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
      img.src = src;
    }
  }, [isIntersecting, src, isLoaded]);

  return (
    <div ref={imgRef} className={`lazy-image-container ${className}`}>
      <img
        src={imageSrc}
        alt={alt}
        className={`lazy-image ${isLoaded ? 'loaded' : 'loading'}`}
        onLoad={() => setIsLoaded(true)}
      />
      {!isLoaded && <div className="image-placeholder">이미지 로딩 중...</div>}
    </div>
  );
};

// 데이터 지연 로딩 컴포넌트
const LazyDataLoader: React.FC<{
  endpoint: string;
  render: (data: any) => React.ReactNode;
}> = ({ endpoint, render }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(containerRef);

  const loadData = useCallback(async () => {
    if (data || loading) return;

    setLoading(true);
    setError(null);

    try {
      // 실제 API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000));

      // 가짜 데이터 생성
      const mockData = Array.from({ length: 20 }, (_, index) => ({
        id: index + 1,
        name: `데이터 항목 ${index + 1}`,
        value: Math.floor(Math.random() * 1000),
        category: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
        timestamp: new Date().toISOString(),
      }));

      setData(mockData);
    } catch (err) {
      setError('데이터 로딩에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [data, loading]);

  useEffect(() => {
    if (isIntersecting) {
      loadData();
    }
  }, [isIntersecting, loadData]);

  return (
    <div ref={containerRef} className="lazy-data-loader">
      {loading && <LoadingSpinner />}
      {error && <div className="error-message">{error}</div>}
      {data && render(data)}
    </div>
  );
};

const LazyLoadingExample: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'components' | 'images' | 'data'>('components');
  const [showHeavyComponent, setShowHeavyComponent] = useState(false);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [showDataTable, setShowDataTable] = useState(false);
  const [showChart, setShowChart] = useState(false);

  // 이미지 목록
  const images = [
    { id: 1, src: 'https://picsum.photos/400/300?random=1', alt: '랜덤 이미지 1' },
    { id: 2, src: 'https://picsum.photos/400/300?random=2', alt: '랜덤 이미지 2' },
    { id: 3, src: 'https://picsum.photos/400/300?random=3', alt: '랜덤 이미지 3' },
    { id: 4, src: 'https://picsum.photos/400/300?random=4', alt: '랜덤 이미지 4' },
    { id: 5, src: 'https://picsum.photos/400/300?random=5', alt: '랜덤 이미지 5' },
    { id: 6, src: 'https://picsum.photos/400/300?random=6', alt: '랜덤 이미지 6' },
    { id: 7, src: 'https://picsum.photos/400/300?random=7', alt: '랜덤 이미지 7' },
    { id: 8, src: 'https://picsum.photos/400/300?random=8', alt: '랜덤 이미지 8' },
    { id: 9, src: 'https://picsum.photos/400/300?random=9', alt: '랜덤 이미지 9' },
    { id: 10, src: 'https://picsum.photos/400/300?random=10', alt: '랜덤 이미지 10' },
  ];

  const renderComponentTab = () => (
    <div className="component-tab">
      <h3>컴포넌트 지연 로딩</h3>
      <div className="component-controls">
        <button onClick={() => setShowHeavyComponent(!showHeavyComponent)}>
          {showHeavyComponent ? '무거운 컴포넌트 숨기기' : '무거운 컴포넌트 로드'}
        </button>
        <button onClick={() => setShowImageGallery(!showImageGallery)}>
          {showImageGallery ? '이미지 갤러리 숨기기' : '이미지 갤러리 로드'}
        </button>
        <button onClick={() => setShowDataTable(!showDataTable)}>
          {showDataTable ? '데이터 테이블 숨기기' : '데이터 테이블 로드'}
        </button>
        <button onClick={() => setShowChart(!showChart)}>
          {showChart ? '차트 컴포넌트 숨기기' : '차트 컴포넌트 로드'}
        </button>
      </div>

      <div className="component-area">
        {showHeavyComponent && (
          <Suspense fallback={<LoadingSpinner />}>
            <HeavyComponent />
          </Suspense>
        )}

        {showImageGallery && (
          <Suspense fallback={<LoadingSpinner />}>
            <ImageGallery />
          </Suspense>
        )}

        {showDataTable && (
          <Suspense fallback={<LoadingSpinner />}>
            <DataTable />
          </Suspense>
        )}

        {showChart && (
          <Suspense fallback={<LoadingSpinner />}>
            <ChartComponent />
          </Suspense>
        )}
      </div>
    </div>
  );

  const renderImageTab = () => (
    <div className="image-tab">
      <h3>이미지 지연 로딩</h3>
      <p>스크롤하여 이미지들이 지연 로딩되는 것을 확인하세요.</p>
      <div className="image-grid">
        {images.map((image) => (
          <LazyImage key={image.id} src={image.src} alt={image.alt} className="grid-image" />
        ))}
      </div>
    </div>
  );

  const renderDataTab = () => (
    <div className="data-tab">
      <h3>데이터 지연 로딩</h3>
      <p>스크롤하여 데이터가 지연 로딩되는 것을 확인하세요.</p>

      <LazyDataLoader
        endpoint="/api/data1"
        render={(data) => (
          <div className="data-section">
            <h4>데이터 섹션 1</h4>
            <div className="data-list">
              {data.map((item: any) => (
                <div key={item.id} className="data-item">
                  <span>{item.name}</span>
                  <span>값: {item.value}</span>
                  <span>카테고리: {item.category}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      />

      <LazyDataLoader
        endpoint="/api/data2"
        render={(data) => (
          <div className="data-section">
            <h4>데이터 섹션 2</h4>
            <div className="data-list">
              {data.map((item: any) => (
                <div key={item.id} className="data-item">
                  <span>{item.name}</span>
                  <span>값: {item.value}</span>
                  <span>카테고리: {item.category}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      />

      <LazyDataLoader
        endpoint="/api/data3"
        render={(data) => (
          <div className="data-section">
            <h4>데이터 섹션 3</h4>
            <div className="data-list">
              {data.map((item: any) => (
                <div key={item.id} className="data-item">
                  <span>{item.name}</span>
                  <span>값: {item.value}</span>
                  <span>카테고리: {item.category}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      />
    </div>
  );

  return (
    <div className="lazy-loading-example">
      <h2>지연 로딩(Lazy Loading) 최적화 예제</h2>

      <div className="tab-navigation">
        <button
          className={activeTab === 'components' ? 'active' : ''}
          onClick={() => setActiveTab('components')}
        >
          컴포넌트 지연 로딩
        </button>
        <button
          className={activeTab === 'images' ? 'active' : ''}
          onClick={() => setActiveTab('images')}
        >
          이미지 지연 로딩
        </button>
        <button
          className={activeTab === 'data' ? 'active' : ''}
          onClick={() => setActiveTab('data')}
        >
          데이터 지연 로딩
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'components' && renderComponentTab()}
        {activeTab === 'images' && renderImageTab()}
        {activeTab === 'data' && renderDataTab()}
      </div>

      <div className="explanation">
        <h3>지연 로딩 최적화 설명</h3>
        <ul>
          <li>
            <strong>컴포넌트 지연 로딩:</strong> React.lazy()와 Suspense를 사용하여 필요할 때만
            컴포넌트 로드
          </li>
          <li>
            <strong>이미지 지연 로딩:</strong> Intersection Observer API를 사용하여 뷰포트에 들어올
            때만 이미지 로드
          </li>
          <li>
            <strong>데이터 지연 로딩:</strong> 사용자가 스크롤할 때만 데이터를 가져와서 초기 로딩
            시간 단축
          </li>
          <li>
            <strong>성능 향상:</strong> 초기 번들 크기 감소 및 네트워크 사용량 최적화
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LazyLoadingExample;
