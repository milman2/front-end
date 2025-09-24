# React 7단계: Context API와 전역 상태 관리

React Context API를 사용한 전역 상태 관리와 모범 사례를 학습하는 프로젝트입니다.

## 🎯 학습 목표

1. **Context API 기본 개념 이해**
   - createContext, useContext, Provider 패턴
   - Context를 통한 전역 상태 관리

2. **실제 사용 사례 구현**
   - 테마 관리 (ThemeContext)
   - 사용자 인증 (UserContext)
   - 쇼핑 카트 (ShoppingCartContext)

3. **Context API 모범 사례**
   - Context 분리와 관심사 분리
   - Custom Hook 패턴
   - 성능 최적화 기법

4. **Context vs Redux 비교**
   - 언제 Context를 사용할지
   - 언제 Redux를 사용할지

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── ThemeContext.js          # 테마 Context
│   ├── UserContext.js           # 사용자 Context
│   ├── ShoppingCartContext.js   # 쇼핑 카트 Context
│   ├── ThemeExample.js          # 테마 예제 컴포넌트
│   ├── UserExample.js           # 사용자 예제 컴포넌트
│   ├── ShoppingCartExample.js   # 쇼핑 카트 예제 컴포넌트
│   ├── ContextPatterns.js       # Context 패턴과 모범 사례
│   └── *.css                    # 각 컴포넌트별 스타일
├── App.js                       # 메인 앱 컴포넌트
└── App.css                      # 메인 스타일
```

## 🚀 시작하기

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm start
```

### 3. 브라우저에서 확인
http://localhost:3000 에서 애플리케이션을 확인할 수 있습니다.

## 📚 주요 학습 내용

### 1. Context API 기본 사용법

#### Context 생성
```javascript
const ThemeContext = createContext();
```

#### Provider 컴포넌트
```javascript
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

#### Custom Hook
```javascript
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

### 2. 실제 사용 사례

#### 테마 관리
- 라이트/다크 모드 전환
- 전역 테마 상태 관리
- 테마에 따른 스타일 적용

#### 사용자 인증
- 로그인/로그아웃 상태 관리
- 사용자 정보 저장 및 업데이트
- 인증 상태에 따른 UI 렌더링

#### 쇼핑 카트
- 상품 추가/제거/수량 변경
- 총 금액 계산
- 장바구니 상태 관리

### 3. Context API 모범 사례

#### Context 분리
- 관심사별로 Context 분리
- 단일 책임 원칙 적용
- Provider 조합 패턴

#### 성능 최적화
- useMemo로 value 객체 메모이제이션
- React.memo로 불필요한 리렌더링 방지
- Context 값 변경 최소화

#### Custom Hook 패턴
- Context와 Hook을 함께 제공
- 에러 처리 포함
- 사용하기 쉬운 API 제공

## 🛠️ 사용 가능한 명령어

### 개발
```bash
npm start          # 개발 서버 실행
npm run build      # 프로덕션 빌드
npm test           # 테스트 실행
```

### 코드 품질
```bash
npm run format     # Prettier로 코드 포맷팅
npm run lint       # ESLint로 코드 검사
npm run lint:fix   # ESLint 자동 수정
```

## 📖 학습 포인트

### Context API 장점
- React 내장 기능으로 별도 라이브러리 불필요
- 간단한 전역 상태 관리에 적합
- Props drilling 문제 해결

### Context API 단점
- 복잡한 상태 로직에는 부적합
- 성능 최적화가 어려움
- 디버깅 도구 부족

### 언제 Context를 사용할까?
- 테마, 언어 설정 등 간단한 전역 상태
- 사용자 인증 정보
- 작은 규모의 애플리케이션
- Props drilling이 심한 경우

### 언제 Redux를 사용할까?
- 복잡한 상태 로직
- 시간 여행 디버깅 필요
- 미들웨어가 필요한 경우
- 대규모 애플리케이션

## 🔧 문제 해결

### 보안 취약점 해결
이 프로젝트는 다음과 같은 보안 취약점을 해결했습니다:

- **nth-check**: 정규식 복잡도 취약점
- **postcss**: 라인 반환 파싱 오류
- **webpack-dev-server**: 소스 코드 유출 취약점

`package.json`의 `overrides` 설정을 통해 해결되었습니다.

### 코드 품질 도구
- **Prettier**: 일관된 코드 포맷팅
- **ESLint**: 코드 품질 검사 및 버그 방지
- **React Hooks**: Hook 사용 규칙 검사

## 📝 다음 단계

Context API 학습 후 다음 단계로 진행할 수 있습니다:

1. **Redux 학습**: 복잡한 상태 관리
2. **React Router**: 클라이언트 사이드 라우팅
3. **API 통합**: 외부 데이터 연동
4. **테스팅**: 단위 테스트 및 통합 테스트

## 🤝 기여하기

이 프로젝트는 학습용이므로 자유롭게 수정하고 실험해보세요!

## 📄 라이선스

MIT License