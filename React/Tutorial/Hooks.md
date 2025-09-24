﻿# React Hooks 완전 가이드

## 📚 Hooks란?
Hooks는 React 16.8에서 도입된 기능으로, 함수형 컴포넌트에서 상태와 생명주기 기능을 사용할 수 있게 해주는 함수들입니다.

## 🎯 Hooks의 기본 규칙
1. **최상위에서만 호출**: 반복문, 조건문, 중첩 함수 내에서 호출하면 안 됩니다
2. **React 함수에서만 호출**: 일반 JavaScript 함수에서는 호출하면 안 됩니다

---

## 🔧 기본 Hooks

### 1. useState
**용도**: 컴포넌트의 상태를 관리합니다.

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}
```

**설명**: 
- `useState(초기값)` 형태로 사용
- 배열을 반환: `[현재상태, 상태변경함수]`
- 상태가 변경되면 컴포넌트가 리렌더링됩니다

### 2. useEffect
**용도**: 컴포넌트의 생명주기와 부수 효과를 관리합니다.

```jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // 컴포넌트가 마운트되거나 userId가 변경될 때 실행
    fetchUser(userId).then(setUser);
    
    // 정리 함수 (cleanup)
    return () => {
      console.log('컴포넌트가 언마운트되거나 userId가 변경됨');
    };
  }, [userId]); // 의존성 배열
  
  return <div>{user ? user.name : '로딩 중...'}</div>;
}
```

**설명**:
- `useEffect(함수, 의존성배열)` 형태
- 의존성 배열이 비어있으면 마운트/언마운트 시에만 실행
- 의존성 배열에 값이 있으면 해당 값이 변경될 때마다 실행
- 정리 함수를 반환하면 언마운트 시 실행됩니다

### 3. useContext
**용도**: Context를 구독하여 값을 읽어옵니다.

```jsx
import { createContext, useContext } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <button 
      style={{ background: theme === 'light' ? '#fff' : '#333' }}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      테마 변경
    </button>
  );
}
```

**설명**:
- `useContext(Context객체)` 형태
- 가장 가까운 Provider에서 값을 가져옵니다
- Context 값이 변경되면 컴포넌트가 리렌더링됩니다

---

## 🔄 추가 Hooks

### 4. useReducer
**용도**: 복잡한 상태 로직을 관리합니다.

```jsx
import { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div>
      <p>카운트: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>리셋</button>
    </div>
  );
}
```

**설명**:
- `useReducer(reducer함수, 초기상태)` 형태
- useState보다 복잡한 상태 로직에 적합
- Redux 패턴과 유사합니다

### 5. useCallback
**용도**: 함수를 메모이제이션하여 불필요한 리렌더링을 방지합니다.

```jsx
import { useState, useCallback } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  
  // filter가 변경될 때만 함수가 재생성됨
  const filteredTodos = useCallback(() => {
    return todos.filter(todo => {
      if (filter === 'completed') return todo.completed;
      if (filter === 'active') return !todo.completed;
      return true;
    });
  }, [todos, filter]);
  
  return (
    <div>
      <button onClick={() => setFilter('all')}>전체</button>
      <button onClick={() => setFilter('active')}>미완료</button>
      <button onClick={() => setFilter('completed')}>완료</button>
      {filteredTodos().map(todo => (
        <div key={todo.id}>{todo.text}</div>
      ))}
    </div>
  );
}
```

**설명**:
- `useCallback(함수, 의존성배열)` 형태
- 의존성이 변경될 때만 함수가 재생성됩니다
- 자식 컴포넌트에 props로 전달할 함수에 유용합니다

### 6. useMemo
**용도**: 계산된 값을 메모이제이션하여 성능을 최적화합니다.

```jsx
import { useState, useMemo } from 'react';

function ExpensiveComponent({ items }) {
  const [filter, setFilter] = useState('');
  
  // items나 filter가 변경될 때만 계산됨
  const filteredItems = useMemo(() => {
    console.log('필터링 계산 중...');
    return items.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]);
  
  return (
    <div>
      <input 
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="검색..."
      />
      {filteredItems.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

**설명**:
- `useMemo(계산함수, 의존성배열)` 형태
- 의존성이 변경될 때만 계산을 다시 수행합니다
- 비용이 큰 계산에 유용합니다

### 7. useRef
**용도**: DOM 요소에 직접 접근하거나 변경 가능한 값을 저장합니다.

```jsx
import { useRef, useEffect } from 'react';

function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const countRef = useRef(0);
  
  const onButtonClick = () => {
    inputEl.current.focus();
  };
  
  useEffect(() => {
    countRef.current += 1;
    console.log(`렌더링 횟수: ${countRef.current}`);
  });
  
  return (
    <div>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>입력창에 포커스</button>
    </div>
  );
}
```

**설명**:
- `useRef(초기값)` 형태
- `.current` 속성으로 값에 접근
- 값이 변경되어도 리렌더링을 발생시키지 않습니다

### 8. useImperativeHandle
**용도**: 부모 컴포넌트에서 자식 컴포넌트의 인스턴스에 접근할 수 있게 합니다.

```jsx
import { forwardRef, useImperativeHandle, useRef } from 'react';

const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    clear: () => {
      inputRef.current.value = '';
    }
  }));
  
  return <input ref={inputRef} {...props} />;
});

function Parent() {
  const fancyInputRef = useRef();
  
  return (
    <div>
      <FancyInput ref={fancyInputRef} />
      <button onClick={() => fancyInputRef.current.focus()}>포커스</button>
      <button onClick={() => fancyInputRef.current.clear()}>지우기</button>
    </div>
  );
}
```

**설명**:
- `useImperativeHandle(ref, 함수, 의존성배열)` 형태
- forwardRef와 함께 사용됩니다
- 부모에서 자식의 특정 메서드만 노출할 수 있습니다

### 9. useLayoutEffect
**용도**: DOM 변경 후 동기적으로 실행되는 useEffect입니다.

```jsx
import { useState, useLayoutEffect, useRef } from 'react';

function MeasureElement() {
  const [width, setWidth] = useState(0);
  const elementRef = useRef();
  
  useLayoutEffect(() => {
    if (elementRef.current) {
      setWidth(elementRef.current.offsetWidth);
    }
  });
  
  return (
    <div ref={elementRef}>
      <p>요소의 너비: {width}px</p>
    </div>
  );
}
```

**설명**:
- `useLayoutEffect(함수, 의존성배열)` 형태
- useEffect와 동일하지만 DOM 변경 후 동기적으로 실행
- DOM 측정이나 애니메이션에 유용합니다

### 10. useDebugValue
**용도**: 커스텀 Hook의 디버깅을 위한 라벨을 제공합니다.

```jsx
import { useState, useEffect, useDebugValue } from 'react';

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  useDebugValue(isOnline ? '온라인' : '오프라인');
  
  return isOnline;
}
```

**설명**:
- `useDebugValue(값, 포맷함수)` 형태
- React DevTools에서 커스텀 Hook의 값을 표시합니다
- 개발 환경에서만 작동합니다

---

## 🎨 커스텀 Hooks

### 커스텀 Hook 만들기
자신만의 Hook을 만들어 로직을 재사용할 수 있습니다.

```jsx
// useCounter.js
import { useState, useCallback } from 'react';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  
  return { count, increment, decrement, reset };
}

// 사용 예제
function Counter() {
  const { count, increment, decrement, reset } = useCounter(0);
  
  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>리셋</button>
    </div>
  );
}
```

---

## 📋 Hooks 사용 가이드라인

### ✅ 좋은 사용법
- Hooks는 항상 최상위에서 호출
- 조건부로 Hooks를 호출하지 않기
- 커스텀 Hook으로 로직 재사용하기
- useCallback, useMemo로 성능 최적화하기

### ❌ 피해야 할 사용법
- 반복문이나 조건문 안에서 Hooks 호출
- 일반 JavaScript 함수에서 Hooks 호출
- 과도한 useMemo, useCallback 사용
- useEffect에서 무한 루프 만들기

---

## 🚀 실습 과제

1. **useState**: 카운터, 할 일 목록 만들기
2. **useEffect**: API 호출, 타이머, 이벤트 리스너
3. **useContext**: 테마, 사용자 정보 전역 관리
4. **useReducer**: 복잡한 폼 상태 관리
5. **useCallback/useMemo**: 성능 최적화된 컴포넌트
6. **useRef**: DOM 조작, 이전 값 저장
7. **커스텀 Hook**: 재사용 가능한 로직 만들기

---

## 📖 추가 학습 자료

- [React 공식 문서 - Hooks](https://react.dev/reference/react)
- [Hooks 규칙](https://react.dev/learn/rules-of-hooks)
- [커스텀 Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
