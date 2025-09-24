# React 4단계: 컴포넌트 생명주기와 사이드 이펙트

## 📚 학습 목표
React 컴포넌트의 생명주기를 완전히 이해하고, 사이드 이펙트를 효과적으로 관리하는 방법을 학습합니다.

## 🎯 이 프로젝트에서 배우는 것들

### 1. 컴포넌트 마운트/언마운트 이해하기
- 컴포넌트 생명주기 단계
- useEffect를 통한 생명주기 관리
- 의존성 배열의 역할
- 동적 컴포넌트 생성/제거

### 2. useEffect 의존성 배열 이해하기
- 다양한 의존성 배열 패턴
- 사이드 이펙트의 종류
- 이벤트 리스너 관리
- 문서 타이틀 변경
- 로컬 스토리지 동기화

### 3. API 호출 패턴 익히기
- 기본 API 호출 패턴
- 로딩 상태와 에러 처리
- AbortController를 사용한 요청 취소
- 여러 API 호출 관리
- 재시도 로직과 에러 처리

### 4. 클린업 함수 작성하기
- 타이머 클린업
- 이벤트 리스너 클린업
- 구독 클린업
- API 요청 클린업
- 메모리 누수 방지

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
step4-lifecycle/
├── public/
│   └── index.html                    # HTML 템플릿
├── src/
│   ├── components/
│   │   ├── ComponentLifecycle.js     # 컴포넌트 생명주기
│   │   ├── SideEffects.js           # 사이드 이펙트 관리
│   │   ├── APICallPatterns.js       # API 호출 패턴
│   │   └── CleanupExamples.js       # 클린업 함수 예제
│   ├── App.js                        # 메인 앱 컴포넌트
│   ├── App.css                       # 스타일링
│   └── index.js                      # 앱 진입점
├── package.json                      # 프로젝트 설정
└── README.md                         # 이 파일
```

## 🔍 주요 학습 포인트

### 컴포넌트 생명주기
1. **마운트**: 컴포넌트가 DOM에 추가됨
2. **업데이트**: Props나 State가 변경됨
3. **언마운트**: 컴포넌트가 DOM에서 제거됨
4. **클린업**: 메모리 누수 방지를 위한 정리 작업

### useEffect 의존성 배열
- **`[]` (빈 배열)**: 마운트/언마운트 시에만 실행
- **`[value]` (의존성 있음)**: 특정 값 변경 시 실행
- **없음**: 매 렌더링마다 실행 (주의해서 사용)

### 사이드 이펙트 종류
- **타이머**: setInterval, setTimeout
- **이벤트 리스너**: addEventListener
- **구독**: WebSocket, API 구독
- **DOM 조작**: document.title, localStorage
- **API 호출**: fetch, axios

### API 호출 패턴
- **로딩 상태**: 사용자에게 진행 상황 표시
- **에러 처리**: 적절한 에러 메시지 제공
- **요청 취소**: AbortController로 불필요한 요청 취소
- **재시도 로직**: 네트워크 오류 시 자동 재시도
- **상태 관리**: 여러 API 호출 상태 분리

### 클린업 함수
- **타이머 정리**: clearInterval, clearTimeout
- **이벤트 리스너 정리**: removeEventListener
- **구독 정리**: unsubscribe
- **API 요청 취소**: AbortController.abort()
- **메모리 누수 방지**: 모든 사이드 이펙트 정리

## 💡 실습 과제

### 1. 실시간 채팅 앱 만들기
```jsx
// 요구사항
- WebSocket 연결 관리
- 메시지 상태 관리
- 연결/해제 상태 표시
- 클린업 함수로 메모리 누수 방지
```

### 2. 데이터 대시보드 만들기
```jsx
// 요구사항
- 여러 API 동시 호출
- 로딩/에러 상태 관리
- 요청 취소 기능
- 자동 새로고침 기능
```

### 3. 실시간 모니터링 앱 만들기
```jsx
// 요구사항
- 주기적 데이터 업데이트
- 윈도우 이벤트 처리
- 성능 모니터링
- 메모리 사용량 추적
```

## 🎨 사이드 이펙트 패턴

### 기본 패턴
```jsx
useEffect(() => {
  // 사이드 이펙트 설정
  
  return () => {
    // 클린업 작업
  };
}, [의존성배열]);
```

### 타이머 패턴
```jsx
useEffect(() => {
  const timer = setInterval(() => {
    // 작업
  }, 1000);
  
  return () => clearInterval(timer);
}, []);
```

### 이벤트 리스너 패턴
```jsx
useEffect(() => {
  const handleResize = () => {
    // 윈도우 크기 변경 처리
  };
  
  window.addEventListener('resize', handleResize);
  
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

### API 호출 패턴
```jsx
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
```

## ⚠️ 주의사항

1. **클린업 함수**: 모든 사이드 이펙트에 대해 클린업 함수 작성
2. **의존성 배열**: 정확한 의존성 설정으로 불필요한 실행 방지
3. **메모리 누수**: 이벤트 리스너, 타이머, 구독 등 반드시 정리
4. **API 요청**: AbortController로 불필요한 요청 취소
5. **성능**: 과도한 사이드 이펙트는 성능 저하 원인

## 📖 추가 학습 자료

- [React 공식 문서 - useEffect](https://react.dev/reference/react/useEffect)
- [useEffect 완벽 가이드](https://overreacted.io/a-complete-guide-to-useeffect/)
- [React 생명주기](https://react.dev/learn/lifecycle-of-reactive-effects)

## 🎉 다음 단계

이 단계를 완료했다면 다음 단계로 진행하세요:
- **5단계**: 폼 처리와 사용자 입력 (제어/비제어 컴포넌트, 유효성 검사)
