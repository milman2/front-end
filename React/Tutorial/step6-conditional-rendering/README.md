# React 6단계: 조건부 렌더링과 리스트

## 📚 학습 목표
React에서 조건부 렌더링과 리스트 렌더링을 효과적으로 사용하는 방법을 완전히 익힙니다.

## 🎯 이 프로젝트에서 배우는 것들

### 1. 조건부 렌더링 (Conditional Rendering)
- 조건부 렌더링의 다양한 패턴
- 삼항 연산자와 논리 연산자 활용
- 조건부 컴포넌트 렌더링
- 동적 스타일링과 클래스 적용

### 2. 리스트 렌더링 (List Rendering)
- 배열 데이터 렌더링
- key 속성의 중요성과 올바른 사용법
- 동적 리스트 관리 (추가, 삭제, 수정)
- 리스트 필터링과 정렬

### 3. 고급 렌더링 패턴
- 컴포넌트 조합 패턴
- 렌더링 최적화 기법
- 조건부 Hook 사용
- 에러 바운더리와 폴백 UI

### 4. 실전 예제
- 할 일 목록 (Todo List)
- 사용자 프로필 카드
- 동적 폼 필드
- 검색 결과 표시

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
step6-conditional-rendering/
├── public/
│   └── index.html                    # HTML 템플릿
├── src/
│   ├── components/
│   │   ├── ConditionalRendering.js   # 조건부 렌더링
│   │   ├── ListRendering.js          # 리스트 렌더링
│   │   ├── AdvancedPatterns.js       # 고급 패턴
│   │   └── TodoList.js              # 실전 예제
│   ├── App.js                        # 메인 앱 컴포넌트
│   ├── App.css                       # 스타일링
│   └── index.js                      # 앱 진입점
├── package.json                      # 프로젝트 설정
└── README.md                         # 이 파일
```

## 🔍 주요 학습 포인트

### 조건부 렌더링
- **삼항 연산자**: `condition ? <ComponentA /> : <ComponentB />`
- **논리 연산자**: `condition && <Component />`
- **조건부 스타일**: 동적 className과 style 적용
- **조건부 Hook**: 조건에 따른 Hook 사용

### 리스트 렌더링
- **key 속성**: 고유하고 안정적인 key 사용
- **배열 메서드**: map, filter, reduce 활용
- **동적 리스트**: 상태 기반 리스트 관리
- **성능 최적화**: React.memo와 useMemo 활용

### 고급 패턴
- **컴포넌트 조합**: children prop과 render prop
- **조건부 Hook**: 조건에 따른 Hook 호출
- **에러 처리**: try-catch와 에러 바운더리
- **폴백 UI**: 로딩 상태와 에러 상태 처리

## 💡 실습 과제

### 1. 할 일 목록 만들기
```jsx
// 요구사항
- 할 일 추가/삭제/완료 토글
- 완료된 할 일 필터링
- 우선순위별 정렬
- 로컬 스토리지 저장
```

### 2. 사용자 프로필 시스템
```jsx
// 요구사항
- 로그인 상태에 따른 UI 변경
- 프로필 정보 조건부 표시
- 권한별 메뉴 표시
- 아바타 이미지 처리
```

### 3. 동적 폼 빌더
```jsx
// 요구사항
- 조건에 따른 필드 표시/숨김
- 동적 필드 추가/제거
- 필드 유효성 검사
- 폼 데이터 실시간 미리보기
```

## 🎨 조건부 렌더링 패턴

### 기본 조건부 렌더링
```jsx
function UserProfile({ user, isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>안녕하세요, {user.name}님!</h2>
          <p>이메일: {user.email}</p>
        </div>
      ) : (
        <div>
          <h2>로그인이 필요합니다.</h2>
          <button>로그인</button>
        </div>
      )}
    </div>
  );
}
```

### 논리 연산자 활용
```jsx
function Notification({ message, type }) {
  return (
    <div>
      {message && (
        <div className={`notification ${type}`}>
          {message}
        </div>
      )}
    </div>
  );
}
```

### 조건부 스타일링
```jsx
function Button({ variant, disabled, children }) {
  const buttonClass = [
    'button',
    variant && `button--${variant}`,
    disabled && 'button--disabled'
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={buttonClass}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
```

## 📋 리스트 렌더링 패턴

### 기본 리스트 렌더링
```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <span className={todo.completed ? 'completed' : ''}>
            {todo.text}
          </span>
          <button onClick={() => toggleTodo(todo.id)}>
            {todo.completed ? '완료 취소' : '완료'}
          </button>
        </li>
      ))}
    </ul>
  );
}
```

### 필터링과 정렬
```jsx
function FilteredTodoList({ todos, filter, sortBy }) {
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'completed':
        return todo.completed;
      case 'active':
        return !todo.completed;
      default:
        return true;
    }
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        return b.priority - a.priority;
      case 'date':
        return new Date(b.createdAt) - new Date(a.createdAt);
      default:
        return 0;
    }
  });

  return (
    <ul>
      {sortedTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
```

### 동적 리스트 관리
```jsx
function DynamicList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem.trim()) {
      setItems(prev => [...prev, {
        id: Date.now(),
        text: newItem,
        completed: false
      }]);
      setNewItem('');
    }
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div>
      <input
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="새 항목 추가"
      />
      <button onClick={addItem}>추가</button>
      
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.text}
            <button onClick={() => removeItem(item.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## ⚠️ 주의사항

1. **key 속성**: 리스트의 각 항목에 고유하고 안정적인 key 사용
2. **조건부 Hook**: Hook은 항상 같은 순서로 호출되어야 함
3. **성능**: 큰 리스트의 경우 가상화나 페이지네이션 고려
4. **접근성**: 조건부 렌더링 시 스크린 리더 고려
5. **일관성**: 프로젝트 전체에서 일관된 조건부 렌더링 패턴 사용

## 📖 추가 학습 자료

- [React 공식 문서 - 조건부 렌더링](https://react.dev/learn/conditional-rendering)
- [React 공식 문서 - 리스트와 Key](https://react.dev/learn/rendering-lists)
- [React Key 속성 가이드](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key)

## 🔧 문제 해결

### 보안 취약점 해결
이 프로젝트에서 발견된 보안 취약점들을 해결했습니다:

#### 발견된 취약점
- **nth-check**: 정규식 복잡도 취약점 (High)
- **postcss**: 라인 반환 파싱 오류 (Moderate)  
- **webpack-dev-server**: 소스 코드 유출 취약점 (Moderate)

#### 해결 방법
`package.json`에 `overrides` 설정을 추가하여 안전한 버전으로 강제 업데이트:

```json
{
  "overrides": {
    "nth-check": ">=2.0.1",
    "postcss": ">=8.4.31",
    "webpack-dev-server": "4.15.2"
  }
}
```

### 코드 품질 도구 설정
- **Prettier**: 코드 포맷팅 자동화
- **ESLint**: 코드 품질 검사 및 버그 방지
- **설정 파일**: `.prettierrc`, `.eslintrc.js` 포함

#### 사용 가능한 명령어
```bash
# 코드 포맷팅
npm run format

# ESLint 검사
npm run lint

# 자동 수정
npm run lint:fix
```

## 🎉 다음 단계

이 단계를 완료했다면 다음 단계로 진행하세요:
- **7단계**: 상태 관리와 Context API (전역 상태 관리, Context API, Redux 기초)