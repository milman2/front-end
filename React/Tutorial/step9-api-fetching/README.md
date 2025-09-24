# Step 9: API 통신과 데이터 페칭

React에서 API 통신과 데이터 페칭을 구현하는 다양한 방법들을 학습하는 튜토리얼입니다.

## 🎯 학습 목표

- **Fetch API**: 네이티브 JavaScript API를 사용한 HTTP 요청
- **Axios**: 강력한 HTTP 클라이언트 라이브러리
- **SWR**: 데이터 페칭을 위한 React 훅 라이브러리
- **React Query**: 서버 상태 관리를 위한 강력한 라이브러리

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📚 주요 기능

### 1. Fetch API 예제
- 네이티브 Fetch API를 사용한 기본적인 HTTP 요청
- 에러 처리 및 로딩 상태 관리
- 사용자 목록과 게시글 데이터 페칭

**주요 특징:**
- ✅ 네이티브 브라우저 API 사용
- ✅ Promise 기반 비동기 처리
- ✅ 커스텀 서비스 클래스로 구조화

### 2. Axios 예제
- Axios 라이브러리를 사용한 HTTP 요청
- CRUD 작업 (생성, 읽기, 업데이트, 삭제)
- 인터셉터를 통한 요청/응답 처리

**주요 특징:**
- ✅ 강력한 HTTP 클라이언트
- ✅ 자동 JSON 변환
- ✅ 요청/응답 인터셉터
- ✅ 에러 처리 및 재시도 로직

### 3. SWR 예제
- SWR을 사용한 데이터 페칭과 캐싱
- 자동 새로고침 및 백그라운드 업데이트
- 조건부 데이터 페칭

**주요 특징:**
- ✅ 자동 캐싱 및 재검증
- ✅ 포커스 시 자동 새로고침
- ✅ 백그라운드 업데이트
- ✅ 조건부 페칭

### 4. React Query 예제
- TanStack Query를 사용한 고급 서버 상태 관리
- 뮤테이션을 통한 데이터 변경
- 쿼리 무효화 및 자동 동기화

**주요 특징:**
- ✅ 강력한 캐싱 시스템
- ✅ 뮤테이션 관리
- ✅ 자동 백그라운드 동기화
- ✅ 낙관적 업데이트

## 🛠️ 기술 스택

- **React 19.1.1** - UI 라이브러리
- **TypeScript 4.9.5** - 타입 안전성
- **Axios 1.12.2** - HTTP 클라이언트
- **SWR 2.3.6** - 데이터 페칭 훅
- **TanStack Query 5.90.2** - 서버 상태 관리
- **Prettier** - 코드 포맷팅
- **ESLint** - 코드 품질 관리

## 📁 프로젝트 구조

```
src/
├── components/           # React 컴포넌트들
│   ├── FetchExample.tsx     # Fetch API 예제
│   ├── AxiosExample.tsx     # Axios 예제
│   ├── SWRExample.tsx       # SWR 예제
│   └── ReactQueryExample.tsx # React Query 예제
├── services/            # API 서비스
│   └── api.ts              # API 클라이언트
├── types/               # TypeScript 타입 정의
│   └── api.ts              # API 관련 타입
├── App.tsx              # 메인 앱 컴포넌트
└── index.tsx            # 앱 진입점
```

## 🔧 사용된 API

이 프로젝트는 [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API를 사용합니다:

- **사용자**: `/users` - 사용자 목록
- **게시글**: `/posts` - 게시글 목록
- **댓글**: `/posts/{id}/comments` - 게시글 댓글
- **할 일**: `/todos` - 할 일 목록

## 💡 학습 포인트

### 1. 데이터 페칭 패턴
```typescript
// 기본 패턴
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const fetchData = async () => {
  setLoading(true);
  try {
    const response = await api.getData();
    setData(response.data);
  } catch (err) {
    setError(err);
  } finally {
    setLoading(false);
  }
};
```

### 2. 에러 처리
```typescript
// 통일된 에러 처리
interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

const handleError = (error: ApiError) => {
  console.error('API Error:', error.message);
  // 사용자에게 에러 메시지 표시
};
```

### 3. 캐싱 전략
```typescript
// SWR 캐싱
const { data, error } = useSWR('/api/users', fetcher, {
  revalidateOnFocus: true,
  refreshInterval: 30000,
});

// React Query 캐싱
const { data, error } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  staleTime: 5 * 60 * 1000, // 5분
  cacheTime: 10 * 60 * 1000, // 10분
});
```

## 🎨 UI/UX 특징

- **반응형 디자인**: 모바일과 데스크톱 모두 지원
- **탭 기반 네비게이션**: 각 API 방법을 쉽게 전환
- **로딩 상태 표시**: 사용자 경험 향상
- **에러 처리**: 명확한 에러 메시지 표시
- **실시간 업데이트**: 데이터 변경사항 즉시 반영

## 🚀 다음 단계

이 튜토리얼을 완료한 후 다음을 학습해보세요:

1. **인증과 권한 관리**
2. **무한 스크롤과 페이지네이션**
3. **실시간 데이터 동기화 (WebSocket)**
4. **오프라인 지원**
5. **성능 최적화**

## 📖 추가 자료

- [Fetch API 문서](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Axios 문서](https://axios-http.com/)
- [SWR 문서](https://swr.vercel.app/)
- [TanStack Query 문서](https://tanstack.com/query/latest)

## 🤝 기여하기

버그 리포트나 기능 제안은 언제든 환영합니다!

---

**Step 9: API 통신과 데이터 페칭** - React 튜토리얼 시리즈의 일부입니다.