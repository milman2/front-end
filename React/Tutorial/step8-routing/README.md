# React 8단계: 라우팅 (React Router)

React Router를 사용한 클라이언트 사이드 라우팅을 학습하는 프로젝트입니다.

## 📚 학습 목표

1. **React Router 기본 설정**
   - BrowserRouter, Routes, Route 컴포넌트 이해
   - 기본 라우팅 구조 설정

2. **라우팅 Hook 활용**
   - useNavigate: 프로그래밍 방식 네비게이션
   - useParams: URL 파라미터 추출
   - useLocation: 현재 위치 정보 확인
   - useSearchParams: URL 쿼리 파라미터 관리

3. **다양한 라우팅 패턴**
   - 정적 라우팅 (Static Routes)
   - 동적 라우팅 (Dynamic Routes)
   - 중첩 라우팅 (Nested Routes)
   - 쿼리 파라미터 활용

4. **네비게이션 컴포넌트**
   - 활성 링크 표시
   - 반응형 네비게이션

## 🚀 프로젝트 설정

### 1. 의존성 설치
```bash
npm install react-router-dom
```

### 2. 개발 서버 실행
```bash
npm start
```

### 3. 코드 포맷팅 및 린팅
```bash
npm run format      # Prettier로 코드 포맷팅
npm run lint        # ESLint로 코드 검사
npm run lint:fix    # ESLint 오류 자동 수정
```

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── Navigation.js          # 네비게이션 컴포넌트
│   ├── Home.js               # 홈 페이지
│   ├── About.js              # 소개 페이지 (useLocation 예제)
│   ├── Products.js           # 상품 목록 (useSearchParams 예제)
│   ├── ProductDetail.js      # 상품 상세 (useParams 예제)
│   ├── UserProfile.js        # 사용자 프로필 (동적 라우팅)
│   ├── Contact.js            # 연락처 페이지
│   └── *.css                 # 각 컴포넌트별 스타일
├── App.js                    # 메인 앱 컴포넌트 (라우터 설정)
├── App.css                   # 앱 전체 스타일
└── index.js                  # 앱 진입점
```

## 🎯 주요 기능

### 1. 기본 라우팅
- **홈 페이지** (`/`): 라우팅 예제 소개
- **소개 페이지** (`/about`): useLocation Hook 사용법
- **연락처** (`/contact`): 간단한 정적 페이지

### 2. 동적 라우팅
- **상품 상세** (`/product/:id`): URL 파라미터로 상품 ID 전달
- **사용자 프로필** (`/user/:id`): 사용자 ID로 프로필 표시

### 3. 쿼리 파라미터 활용
- **상품 목록** (`/products`): 카테고리 필터링
- URL: `/products?category=book`

### 4. 프로그래밍 방식 네비게이션
- `navigate('/path')`: 특정 경로로 이동
- `navigate(-1)`: 브라우저 히스토리에서 이전 페이지로

## 🔧 React Router Hook 사용법

### useNavigate
```javascript
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/products'); // 특정 경로로 이동
    navigate(-1);          // 이전 페이지로
    navigate('/user/123', { state: { from: 'home' } }); // 상태와 함께 이동
  };
}
```

### useParams
```javascript
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams(); // URL에서 :id 값 추출
  
  return <div>상품 ID: {id}</div>;
}
```

### useLocation
```javascript
import { useLocation } from 'react-router-dom';

function MyComponent() {
  const location = useLocation();
  
  return (
    <div>
      <p>경로: {location.pathname}</p>
      <p>쿼리: {location.search}</p>
      <p>해시: {location.hash}</p>
      <p>상태: {JSON.stringify(location.state)}</p>
    </div>
  );
}
```

### useSearchParams
```javascript
import { useSearchParams } from 'react-router-dom';

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const category = searchParams.get('category');
  
  const handleFilter = (newCategory) => {
    setSearchParams({ category: newCategory });
  };
}
```

## 🎨 스타일링

- **반응형 디자인**: 모바일과 데스크톱 모두 지원
- **일관된 디자인**: 모든 페이지에서 통일된 스타일
- **인터랙티브 요소**: 호버 효과와 전환 애니메이션

## 📖 학습 포인트

### 1. 라우팅 기본 개념
- SPA (Single Page Application)에서의 클라이언트 사이드 라우팅
- 브라우저 히스토리 API 활용
- URL과 컴포넌트 매핑

### 2. React Router 컴포넌트
- `BrowserRouter`: HTML5 History API 사용
- `Routes`: 라우트 그룹화
- `Route`: 개별 라우트 정의
- `Link`: 네비게이션 링크

### 3. 고급 라우팅 패턴
- 중첩 라우팅 (Nested Routes)
- 인덱스 라우트 (Index Routes)
- 와일드카드 라우팅
- 리다이렉트 (Redirect)

### 4. 성능 최적화
- 코드 스플리팅과 지연 로딩
- 라우트 기반 청크 분할
- 메모이제이션 활용

## 🛠️ 문제 해결

### 보안 취약점 해결
```json
{
  "overrides": {
    "nth-check": ">=2.0.1",
    "postcss": ">=8.4.31",
    "webpack-dev-server": "4.15.2"
  }
}
```

### 코드 품질 도구
- **Prettier**: 코드 포맷팅
- **ESLint**: 코드 품질 검사
- **React Hooks 규칙**: Hook 사용법 검증

## 🚀 다음 단계

1. **중첩 라우팅** 구현
2. **인증 기반 라우팅** (Protected Routes)
3. **지연 로딩** (Lazy Loading) 적용
4. **라우트 가드** 구현
5. **SEO 최적화** (React Helmet)

## 📚 참고 자료

- [React Router 공식 문서](https://reactrouter.com/)
- [React Router v6 가이드](https://reactrouter.com/docs/en/v6)
- [SPA 라우팅 개념](https://developer.mozilla.org/en-US/docs/Web/API/History_API)

---

**React Router를 활용한 현대적인 웹 애플리케이션의 라우팅 시스템을 마스터하세요!** 🎯