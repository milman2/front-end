# React 1단계: 기초 개념 학습

## 📚 학습 목표
React의 기본 개념들을 이해하고 JSX 문법을 익힙니다.

## 🎯 이 프로젝트에서 배우는 것들

### 1. React란 무엇인가?
- React의 정의와 목적
- React의 주요 특징
- Virtual DOM의 개념
- 컴포넌트 기반 아키텍처

### 2. JSX 문법 익히기
- JSX의 정의와 특징
- JavaScript 표현식 사용법
- JSX 작성 규칙
- HTML과 JSX의 차이점

### 3. 컴포넌트 개념 이해하기
- 컴포넌트의 정의와 장점
- 함수형 컴포넌트 작성법
- Props와 State의 차이점
- Virtual DOM의 작동 원리

## 🚀 프로젝트 실행 방법

```bash
# 의존성 설치
npm install
npm audit

# 개발 서버 실행
npm start
```

브라우저에서 `http://localhost:3000`으로 접속하면 학습 내용을 확인할 수 있습니다.

## 📁 프로젝트 구조

```
step1-basics/
├── public/
│   └── index.html          # HTML 템플릿
├── src/
│   ├── components/
│   │   ├── HelloWorld.js   # React 기본 개념
│   │   ├── JSXBasics.js    # JSX 문법 예제
│   │   └── ComponentBasics.js # 컴포넌트 개념
│   ├── App.js              # 메인 앱 컴포넌트
│   ├── App.css             # 스타일링
│   └── index.js            # 앱 진입점
├── package.json            # 프로젝트 설정
└── README.md              # 이 파일
```

## 🔍 주요 학습 포인트

### React의 핵심 개념
1. **컴포넌트**: UI를 독립적이고 재사용 가능한 조각으로 나눈 것
2. **JSX**: JavaScript 안에서 HTML과 유사한 문법을 사용할 수 있게 해주는 문법적 확장
3. **Virtual DOM**: 실제 DOM의 가벼운 복사본으로 효율적인 렌더링을 가능하게 함
4. **Props**: 부모 컴포넌트에서 자식 컴포넌트로 전달되는 읽기 전용 데이터
5. **State**: 컴포넌트 내부에서 관리하는 변경 가능한 데이터

### JSX 작성 규칙
- 모든 태그는 닫혀야 함 (`<br/>`, `<img/>` 등)
- `class` 대신 `className` 사용
- JavaScript 표현식은 `{}` 안에 작성
- 하나의 부모 요소로 감싸야 함

## 💡 실습 과제

1. **HelloWorld 컴포넌트 수정하기**
   - 자신의 이름으로 인사말 변경
   - 다양한 스타일 적용해보기

2. **JSXBasics 컴포넌트 확장하기**
   - 새로운 변수 추가하고 화면에 표시
   - 조건부 렌더링 예제 추가

3. **새로운 컴포넌트 만들기**
   - 자신만의 간단한 컴포넌트 생성
   - Props를 받아서 사용하는 컴포넌트 작성

## 📖 추가 학습 자료

- [React 공식 문서 - 시작하기](https://react.dev/learn)
- [JSX 소개](https://react.dev/learn/writing-markup-with-jsx)
- [컴포넌트와 Props](https://react.dev/learn/passing-props-to-a-component)

## ⚠️ 주의사항

- JSX는 JavaScript 파일에서 사용할 때 `.js` 확장자를 사용해도 됩니다
- React 18부터는 `ReactDOM.render` 대신 `ReactDOM.createRoot`를 사용합니다
- 모든 컴포넌트는 대문자로 시작해야 합니다

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
React 개발 서버 실행 시 다음과 같은 오류가 발생했습니다:

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
- ✅ **0개의 보안 취약점** (이전 9개에서 완전 해결)
- ✅ **React 개발 서버 정상 실행** (`http://localhost:3000`)
- ✅ **모든 기능 정상 작동**

## 🎉 다음 단계

이 단계를 완료했다면 다음 단계로 진행하세요:
- **2단계**: 기본 컴포넌트 작성 (Props, State, 이벤트 핸들링)
