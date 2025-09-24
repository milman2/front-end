# React 2단계: 기본 컴포넌트 작성

## 📚 학습 목표
React 컴포넌트의 기본 작성법을 익히고, Props, State, 이벤트 핸들링을 실습합니다.

## 🎯 이 프로젝트에서 배우는 것들

### 1. 함수형 컴포넌트 작성하기
- 함수형 컴포넌트의 문법과 특징
- 함수형 vs 클래스형 컴포넌트 비교
- 현대적인 React 개발 방식

### 2. 클래스형 컴포넌트 작성하기 (참고용)
- 클래스형 컴포넌트의 문법
- 기존 코드 이해를 위한 학습
- 함수형 컴포넌트와의 차이점

### 3. Props 전달하고 받기
- Props의 개념과 특징
- 부모에서 자식으로 데이터 전달
- 구조 분해 할당을 통한 Props 받기
- 기본값 설정하기

### 4. State 사용하기 (useState Hook)
- useState Hook의 사용법
- 상태 관리의 기본 원리
- 여러 상태 관리하기
- 함수형 업데이트

### 5. 이벤트 핸들링하기
- React 이벤트 시스템
- 다양한 이벤트 타입들
- 폼 이벤트 처리
- 키보드 이벤트 처리

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
step2-components/
├── public/
│   └── index.html              # HTML 템플릿
├── src/
│   ├── components/
│   │   ├── FunctionComponent.js    # 함수형 컴포넌트 예제
│   │   ├── ClassComponent.js       # 클래스형 컴포넌트 예제
│   │   ├── PropsExample.js         # Props 전달 예제
│   │   ├── StateExample.js         # State 관리 예제
│   │   └── EventHandling.js        # 이벤트 핸들링 예제
│   ├── App.js                  # 메인 앱 컴포넌트
│   ├── App.css                 # 스타일링
│   └── index.js                # 앱 진입점
├── package.json                # 프로젝트 설정
└── README.md                   # 이 파일
```

## 🔍 주요 학습 포인트

### 컴포넌트 작성법
1. **함수형 컴포넌트**: 현대적인 방식, Hooks 사용 가능
2. **클래스형 컴포넌트**: 기존 방식, 생명주기 메서드 사용
3. **컴포넌트 명명**: 대문자로 시작하는 PascalCase

### Props (Properties)
- **읽기 전용**: 자식 컴포넌트에서 수정 불가
- **데이터 전달**: 부모 → 자식 방향으로만 전달
- **구조 분해 할당**: `{ name, age }` 형태로 받기
- **기본값 설정**: `discount = 0` 형태로 설정

### State (상태)
- **useState Hook**: `const [state, setState] = useState(초기값)`
- **상태 업데이트**: `setState(새값)` 또는 `setState(prev => 새값)`
- **리렌더링**: 상태 변경 시 컴포넌트 자동 리렌더링
- **여러 상태**: 여러 개의 useState 사용 가능

### 이벤트 핸들링
- **camelCase**: `onClick`, `onChange`, `onSubmit` 등
- **함수 전달**: `onClick={handleClick}` 형태
- **이벤트 객체**: SyntheticEvent 객체 사용
- **기본 동작 방지**: `e.preventDefault()`

## 💡 실습 과제

### 1. 사용자 프로필 컴포넌트 만들기
```jsx
// 요구사항
- 이름, 나이, 이메일을 Props로 받기
- 편집 모드 토글 기능
- 저장/취소 버튼
```

### 2. 쇼핑 카트 컴포넌트 만들기
```jsx
// 요구사항
- 상품 목록을 State로 관리
- 수량 증가/감소 기능
- 총 가격 계산
- 상품 삭제 기능
```

### 3. 할 일 목록 컴포넌트 만들기
```jsx
// 요구사항
- 할 일 추가 기능
- 완료/미완료 토글
- 할 일 삭제 기능
- 필터링 기능 (전체/완료/미완료)
```

## 🎨 스타일링 팁

```css
/* 컴포넌트별 스타일 분리 */
.component-section {
  border: 2px solid #61dafb;
  border-radius: 10px;
  padding: 20px;
  background-color: #f8f9fa;
}

/* 인라인 스타일 사용 */
<div style={{ 
  background: '#e3f2fd', 
  padding: '15px',
  borderRadius: '5px'
}}>
```

## ⚠️ 주의사항

1. **Props는 읽기 전용**: 자식 컴포넌트에서 Props를 직접 수정하면 안 됩니다
2. **State 업데이트**: `setState`를 사용해서만 상태를 변경하세요
3. **이벤트 핸들러**: 함수를 전달할 때 `onClick={handleClick}` (호출하지 않음)
4. **키 속성**: 리스트 렌더링 시 `key` 속성 필수

## 📖 추가 학습 자료

- [React 공식 문서 - 컴포넌트와 Props](https://react.dev/learn/passing-props-to-a-component)
- [React 공식 문서 - State와 생명주기](https://react.dev/learn/state-a-components-memory)
- [React 공식 문서 - 이벤트 처리](https://react.dev/learn/responding-to-events)

## 🎉 다음 단계

이 단계를 완료했다면 다음 단계로 진행하세요:
- **3단계**: React Hooks 마스터하기 (useState, useEffect, useContext 등)
