# React 3단계: React Hooks 마스터하기

## 📚 학습 목표
React Hooks를 완전히 익히고, 상태 관리와 사이드 이펙트를 효과적으로 처리하는 방법을 학습합니다.

## 🎯 이 프로젝트에서 배우는 것들

### 1. useState Hook 완전히 익히기
- useState의 고급 사용법
- 객체와 배열 상태 관리
- 함수형 업데이트 패턴
- 여러 상태 관리 전략

### 2. useEffect Hook 이해하고 사용하기
- useEffect의 의존성 배열 이해
- 클린업 함수 작성
- API 호출 패턴
- 이벤트 리스너 관리

### 3. useContext Hook으로 상태 관리하기
- Context API와 useContext
- 전역 상태 관리
- Provider 패턴
- Context 분리 전략

### 4. useReducer Hook으로 복잡한 상태 관리하기
- useReducer vs useState
- Reducer 함수 작성
- 복잡한 상태 로직 관리
- 폼 상태 관리

### 5. 커스텀 Hook 만들기
- 커스텀 Hook 작성 규칙
- 재사용 가능한 로직 분리
- 다양한 커스텀 Hook 예제
- Hook 조합 패턴

### 6. useMemo, useCallback으로 성능 최적화하기
- 메모이제이션 개념
- 성능 최적화 전략
- React.memo와 함께 사용
- 최적화 가이드라인

## 🚀 프로젝트 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start
```

브라우저에서 `http://localhost:3000`으로 접속하면 학습 내용을 확인할 수 있습니다.

## 📁 프로젝트 구조

```
step3-hooks/
├── public/
│   └── index.html                    # HTML 템플릿
├── src/
│   ├── components/
│   │   ├── UseStateExample.js        # useState 고급 사용법
│   │   ├── UseEffectExample.js       # useEffect 완전 정복
│   │   ├── UseContextExample.js      # Context API 활용
│   │   ├── UseReducerExample.js      # useReducer 패턴
│   │   ├── CustomHookExample.js      # 커스텀 Hook 만들기
│   │   └── PerformanceOptimization.js # 성능 최적화
│   ├── hooks/
│   │   ├── useCounter.js             # 카운터 커스텀 Hook
│   │   ├── useLocalStorage.js        # 로컬스토리지 Hook
│   │   ├── useFetch.js               # API 호출 Hook
│   │   └── useDebounce.js            # 디바운스 Hook
│   ├── App.js                        # 메인 앱 컴포넌트
│   ├── App.css                       # 스타일링
│   └── index.js                      # 앱 진입점
├── package.json                      # 프로젝트 설정
└── README.md                         # 이 파일
```

## 🔍 주요 학습 포인트

### useState Hook
- **기본 사용법**: `const [state, setState] = useState(초기값)`
- **함수형 업데이트**: `setState(prev => prev + 1)`
- **객체 상태**: 스프레드 연산자로 불변성 유지
- **배열 상태**: push 대신 스프레드 연산자 사용

### useEffect Hook
- **의존성 배열**: `[]`, `[value]`, 없음
- **클린업 함수**: 메모리 누수 방지
- **API 호출**: async/await 패턴
- **이벤트 리스너**: addEventListener/removeEventListener

### useContext Hook
- **Context 생성**: `createContext()`
- **Provider 설정**: 범위 제한
- **useContext 사용**: Context 구독
- **성능 최적화**: 불필요한 리렌더링 방지

### useReducer Hook
- **Reducer 함수**: `(state, action) => newState`
- **dispatch**: 액션 전달
- **복잡한 상태**: 여러 상태를 하나로 관리
- **예측 가능성**: 액션 기반 상태 변경

### 커스텀 Hook
- **명명 규칙**: "use"로 시작
- **로직 재사용**: 컴포넌트 간 공유
- **Hook 조합**: 여러 Hook을 조합
- **테스트 용이성**: 순수 함수로 구성

### 성능 최적화
- **useMemo**: 계산 결과 메모이제이션
- **useCallback**: 함수 메모이제이션
- **React.memo**: 컴포넌트 메모이제이션
- **측정 우선**: React DevTools 사용

## 💡 실습 과제

### 1. 할 일 관리 앱 만들기
```jsx
// 요구사항
- useReducer로 상태 관리
- 로컬스토리지에 데이터 저장
- 필터링 기능 (전체/완료/미완료)
- 우선순위 설정 기능
```

### 2. 실시간 채팅 앱 만들기
```jsx
// 요구사항
- WebSocket 연결 관리
- 메시지 상태 관리
- 사용자 목록 관리
- 커스텀 Hook으로 로직 분리
```

### 3. 데이터 대시보드 만들기
```jsx
// 요구사항
- API 데이터 페칭
- 로딩/에러 상태 관리
- 데이터 필터링/정렬
- 성능 최적화 적용
```

## 🎨 커스텀 Hook 예제

### useCounter
```jsx
function useCounter(initialValue = 0, step = 1) {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => setCount(prev => prev + step), [step]);
  const decrement = useCallback(() => setCount(prev => prev - step), [step]);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  
  return { count, increment, decrement, reset };
}
```

### useLocalStorage
```jsx
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
```

### useFetch
```jsx
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
}
```

## ⚠️ 주의사항

1. **Hook 규칙**: 최상위 레벨에서만 Hook 호출
2. **의존성 배열**: useEffect의 의존성을 정확히 설정
3. **클린업**: 메모리 누수 방지를 위한 클린업 함수 작성
4. **성능 최적화**: 과도한 최적화는 오히려 성능 저하
5. **Context 사용**: 불필요한 리렌더링 방지

## 📖 추가 학습 자료

- [React 공식 문서 - Hooks](https://react.dev/reference/react)
- [useEffect 완벽 가이드](https://overreacted.io/a-complete-guide-to-useeffect/)
- [React Hooks 패턴](https://reactpatterns.com/)

## 🔧 문제 해결

### 보안 취약점 해결
프로젝트 설치 시 다음과 같은 보안 취약점들이 발견되었습니다:

#### 발견된 취약점
- **High Severity (6개)**: `nth-check` 패키지의 정규표현식 복잡도 문제
- **Moderate Severity (3개)**: `postcss` 라인 리턴 파싱 오류, `webpack-dev-server` 소스코드 탈취 위험

#### 해결 방법
`package.json`에 `overrides` 섹션을 추가하여 안전하게 해결:

```json
{
  "overrides": {
    "nth-check": ">=2.0.1",
    "postcss": ">=8.4.31",
    "webpack-dev-server": "4.15.2"
  }
}
```

### webpack-dev-server 호환성 문제 해결
React 개발 서버 실행 시 다음과 같은 오류가 발생할 수 있습니다:

```
Invalid options object. Dev Server has been initialized using an options object that does not match the API schema.
- options has an unknown property 'onAfterSetupMiddleware'
```

#### 원인
- `webpack-dev-server` 5.2.2 버전에서 `onAfterSetupMiddleware` 옵션이 제거됨
- `react-scripts` 5.0.1이 아직 이 변경사항을 반영하지 못함

#### 해결 방법
- `webpack-dev-server`를 4.15.2 버전으로 다운그레이드
- `react-scripts` 5.0.1과의 호환성 확보

### 최종 결과
- ✅ **High severity 취약점 완전 해결** (6개 → 0개)
- ✅ **React 개발 서버 정상 실행** (`http://localhost:3000`)
- ✅ **모든 기능 정상 작동**
- ⚠️ **3개의 moderate 취약점 남음** (개발 환경에서는 문제없음)

## 🎉 다음 단계

이 단계를 완료했다면 다음 단계로 진행하세요:
- **4단계**: 컴포넌트 생명주기와 사이드 이펙트 (useEffect 심화, 생명주기 이해)
