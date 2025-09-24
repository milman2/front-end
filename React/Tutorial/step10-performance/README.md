# React 성능 최적화 예제 - Step 10

React 애플리케이션의 성능을 최적화하는 다양한 기법들을 실습하는 프로젝트입니다.

## 🚀 프로젝트 개요

이 프로젝트는 React 애플리케이션의 성능을 향상시키는 주요 최적화 기법들을 다룹니다:

- **메모이제이션**: React.memo, useMemo, useCallback
- **가상화**: react-window를 사용한 대용량 리스트 최적화
- **지연 로딩**: 컴포넌트, 이미지, 데이터 지연 로딩
- **코드 분할**: React.lazy와 Suspense를 활용한 번들 분할
- **성능 모니터링**: Web Vitals와 성능 메트릭 측정

## 📦 설치된 패키지

### 주요 의존성
- `react-window`: 가상화를 위한 라이브러리
- `react-window-infinite-loader`: 무한 스크롤 가상화
- `react-virtualized-auto-sizer`: 자동 크기 조정
- `web-vitals`: 성능 메트릭 측정

### 개발 도구
- `prettier`: 코드 포맷팅
- `eslint`: 코드 품질 검사
- `typescript`: 타입 안전성

## 🛠️ 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm start

# 코드 포맷팅
npm run format

# 린트 검사
npm run lint

# 린트 자동 수정
npm run lint:fix
```

## 📚 주요 기능

### 1. 메모이제이션 (Memoization)

**파일**: `src/components/MemoizationExample.tsx`

- **React.memo**: 컴포넌트 리렌더링 방지
- **useMemo**: 계산 결과 캐싱
- **useCallback**: 함수 참조 안정화

```typescript
// React.memo 예제
const MemoizedUserCard = memo<UserCardProps>(({ user, onClick }) => {
  // 컴포넌트 로직
});

// useMemo 예제
const filteredUsers = useMemo(() => {
  return users.filter(user => user.department === filter);
}, [users, filter]);

// useCallback 예제
const handleUserClick = useCallback((id: number) => {
  setSelectedUserId(id);
}, []);
```

### 2. 가상화 (Virtualization)

**파일**: `src/components/VirtualizationExample.tsx`

- **고정 크기 리스트**: 동일한 높이의 아이템들
- **가변 크기 리스트**: 다양한 높이의 아이템들
- **AutoSizer**: 컨테이너 크기 자동 조정

```typescript
// 고정 크기 가상화
<List
  height={height}
  width={width}
  itemCount={users.length}
  itemSize={150}
  itemData={users}
>
  {FixedSizeItem}
</List>

// 가변 크기 가상화
<VariableSizeList
  height={height}
  width={width}
  itemCount={products.length}
  itemSize={getItemSize}
  itemData={products}
>
  {VariableSizeItem}
</VariableSizeList>
```

### 3. 지연 로딩 (Lazy Loading)

**파일**: `src/components/LazyLoadingExample.tsx`

- **컴포넌트 지연 로딩**: React.lazy와 Suspense
- **이미지 지연 로딩**: Intersection Observer API
- **데이터 지연 로딩**: 스크롤 기반 데이터 페칭

```typescript
// 컴포넌트 지연 로딩
const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<LoadingSpinner />}>
  <HeavyComponent />
</Suspense>

// 이미지 지연 로딩
const LazyImage = ({ src, alt }) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const isIntersecting = useIntersectionObserver(imgRef);
  
  useEffect(() => {
    if (isIntersecting) {
      setImageSrc(src);
    }
  }, [isIntersecting, src]);
};
```

### 4. 코드 분할 (Code Splitting)

**파일**: `src/components/CodeSplittingExample.tsx`

- **동적 Import**: 필요할 때만 모듈 로드
- **Error Boundary**: 로딩 실패 시 에러 처리
- **로딩 상태 관리**: 사용자 피드백 제공

```typescript
// 동적 import
const Dashboard = lazy(() => import('./Dashboard'));
const UserManagement = lazy(() => import('./UserManagement'));

// Error Boundary
class ErrorBoundary extends React.Component {
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }
}
```

### 5. 성능 모니터링 (Performance Monitoring)

**파일**: `src/components/PerformanceMonitoringExample.tsx`

- **Web Vitals**: CLS, FID, FCP, LCP, TTFB 측정
- **메모리 사용량**: JavaScript 힙 메모리 모니터링
- **렌더링 시간**: 컴포넌트별 렌더링 성능 측정

```typescript
// Web Vitals 수집
useEffect(() => {
  getCLS((metric) => {
    setMetrics(prev => [...prev, {
      name: 'CLS',
      value: metric.value,
      rating: metric.rating,
      description: 'Cumulative Layout Shift'
    }]);
  });
}, []);

// 메모리 사용량 모니터링
const updateMemoryUsage = () => {
  if ('memory' in performance) {
    const memory = performance.memory;
    setMemoryUsage({
      used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
      total: Math.round(memory.totalJSHeapSize / 1024 / 1024),
    });
  }
};
```

## 🎯 성능 최적화 기법

### 1. 메모이제이션 최적화
- **React.memo**: Props가 변경되지 않으면 리렌더링 방지
- **useMemo**: 의존성이 변경되지 않으면 계산 결과 캐시
- **useCallback**: 의존성이 변경되지 않으면 함수 참조 유지

### 2. 가상화 최적화
- **DOM 노드 최소화**: 화면에 보이는 아이템만 렌더링
- **스크롤 성능 향상**: 수만 개의 아이템도 부드럽게 스크롤
- **메모리 사용량 감소**: 렌더링되는 DOM 요소 수 제한

### 3. 지연 로딩 최적화
- **초기 번들 크기 감소**: 필요할 때만 코드 로드
- **네트워크 사용량 최적화**: 필요한 리소스만 다운로드
- **사용자 경험 향상**: 로딩 상태 피드백 제공

### 4. 코드 분할 최적화
- **번들 분할**: 초기 로딩 시간 단축
- **캐싱 효율성**: 변경되지 않은 모듈 재사용
- **에러 격리**: 모듈별 에러 처리

### 5. 성능 모니터링
- **실시간 성능 측정**: Web Vitals 메트릭 수집
- **메모리 누수 감지**: 메모리 사용량 모니터링
- **렌더링 성능 분석**: 컴포넌트별 성능 측정

## 📊 성능 지표

### Web Vitals 기준
- **CLS (Cumulative Layout Shift)**: 0.1 이하 권장
- **FID (First Input Delay)**: 100ms 이하 권장
- **FCP (First Contentful Paint)**: 1.8s 이하 권장
- **LCP (Largest Contentful Paint)**: 2.5s 이하 권장
- **TTFB (Time to First Byte)**: 600ms 이하 권장

### 메모리 사용량
- **사용 중 메모리**: JavaScript 힙 사용량 모니터링
- **메모리 누수**: 지속적인 메모리 증가 감지
- **가비지 컬렉션**: 메모리 정리 최적화

## 🔧 개발 도구

### 코드 품질
- **Prettier**: 일관된 코드 포맷팅
- **ESLint**: 코드 품질 검사 및 규칙 적용
- **TypeScript**: 타입 안전성 보장

### 성능 분석
- **React DevTools**: 컴포넌트 성능 분석
- **Chrome DevTools**: 메모리 및 성능 프로파일링
- **Web Vitals**: 실제 사용자 성능 측정

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── MemoizationExample.tsx      # 메모이제이션 예제
│   ├── VirtualizationExample.tsx   # 가상화 예제
│   ├── LazyLoadingExample.tsx      # 지연 로딩 예제
│   ├── CodeSplittingExample.tsx    # 코드 분할 예제
│   ├── PerformanceMonitoringExample.tsx # 성능 모니터링 예제
│   ├── HeavyComponent.tsx          # 무거운 컴포넌트
│   ├── ImageGallery.tsx            # 이미지 갤러리
│   ├── DataTable.tsx               # 데이터 테이블
│   ├── ChartComponent.tsx          # 차트 컴포넌트
│   ├── Dashboard.tsx               # 대시보드
│   ├── UserManagement.tsx          # 사용자 관리
│   ├── Analytics.tsx               # 분석
│   ├── Settings.tsx                # 설정
│   └── Reports.tsx                 # 리포트
├── App.tsx                         # 메인 애플리케이션
├── App.css                         # 메인 스타일
└── index.tsx                       # 진입점
```

## 🚀 배포 및 최적화

### 프로덕션 빌드
```bash
npm run build
```

### 번들 분석
```bash
npm install --save-dev webpack-bundle-analyzer
npm run build
npx webpack-bundle-analyzer build/static/js/*.js
```

### 성능 최적화 팁
1. **이미지 최적화**: WebP 형식 사용, 적절한 크기 조정
2. **번들 최적화**: Tree shaking, 코드 분할 활용
3. **캐싱 전략**: 적절한 HTTP 캐시 헤더 설정
4. **CDN 사용**: 정적 자원의 전역 배포
5. **서버 사이드 렌더링**: 초기 로딩 시간 단축

## 📖 학습 자료

- [React 성능 최적화 공식 문서](https://reactjs.org/docs/optimizing-performance.html)
- [Web Vitals 가이드](https://web.dev/vitals/)
- [React DevTools 사용법](https://reactjs.org/blog/2019/08/15/new-react-devtools.html)
- [Chrome DevTools 성능 분석](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance)

## 🤝 기여하기

1. 이슈 생성 또는 기능 제안
2. 포크 후 브랜치 생성
3. 변경사항 커밋
4. 풀 리퀘스트 생성

## 📄 라이선스

MIT License

---

**Step 10**: React 애플리케이션의 성능을 최적화하는 포괄적인 기법들을 실습합니다.