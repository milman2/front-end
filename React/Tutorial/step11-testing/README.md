# React Testing Tutorial - Step 11

React Testing Library를 사용한 포괄적인 테스트 가이드입니다.

## 📋 목차

1. [프로젝트 설정](#프로젝트-설정)
2. [테스트 유형](#테스트-유형)
3. [컴포넌트 테스트](#컴포넌트-테스트)
4. [훅 테스트](#훅-테스트)
5. [유틸리티 함수 테스트](#유틸리티-함수-테스트)
6. [통합 테스트](#통합-테스트)
7. [모킹 테스트](#모킹-테스트)
8. [테스트 실행](#테스트-실행)
9. [모범 사례](#모범-사례)

## 🚀 프로젝트 설정

### 설치된 패키지

```json
{
  "dependencies": {
    "@testing-library/jest-dom": "^6.4.2",
    "@testing-library/react": "^14.2.1",
    "@testing-library/user-event": "^14.5.2",
    "jest-environment-jsdom": "^29.7.0"
  }
}
```

### 설정 파일

- `setupTests.ts`: Jest DOM 매처와 글로벌 모킹 설정
- `.eslintrc.js`: ESLint 설정 (테스트 환경 포함)
- `package.json`: 테스트 스크립트 설정

## 🧪 테스트 유형

### 1. 단위 테스트 (Unit Tests)
- 개별 컴포넌트의 기능 테스트
- 훅의 동작 테스트
- 유틸리티 함수의 로직 테스트

### 2. 통합 테스트 (Integration Tests)
- 여러 컴포넌트 간의 상호작용 테스트
- 사용자 워크플로우 테스트
- 데이터 흐름 테스트

### 3. 모킹 테스트 (Mocking Tests)
- API 호출 모킹
- 타이머 모킹
- Local Storage 모킹
- 커스텀 이벤트 모킹

## 🎯 컴포넌트 테스트

### Button 컴포넌트 테스트

```typescript
// Button.test.tsx
describe('Button Component', () => {
  it('renders button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Counter 컴포넌트 테스트

```typescript
// Counter.test.tsx
describe('Counter Component', () => {
  it('increments count when increment button is clicked', () => {
    render(<Counter initialValue={0} />);
    const incrementButton = screen.getByTestId('increment-button');
    const display = screen.getByTestId('counter-display');

    fireEvent.click(incrementButton);
    expect(display).toHaveTextContent('1');
  });
});
```

### TodoList 컴포넌트 테스트

```typescript
// TodoList.test.tsx
describe('TodoList Component', () => {
  it('adds new todo when add button is clicked', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-todo-button');

    await user.type(input, 'New todo item');
    await user.click(addButton);

    expect(screen.getByText('New todo item')).toBeInTheDocument();
  });
});
```

## 🎣 훅 테스트

### useCounter 훅 테스트

```typescript
// useCounter.test.ts
describe('useCounter Hook', () => {
  it('increments count by default step', () => {
    const { result } = renderHook(() => useCounter({ initialValue: 0 }));
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
});
```

## 🔧 유틸리티 함수 테스트

### Helper 함수 테스트

```typescript
// helpers.test.ts
describe('Helper Functions', () => {
  describe('validateEmail', () => {
    it('validates correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
    });

    it('rejects invalid email addresses', () => {
      expect(validateEmail('invalid-email')).toBe(false);
    });
  });
});
```

## 🔗 통합 테스트

### 다중 컴포넌트 상호작용

```typescript
// Integration.test.tsx
describe('Integration Tests', () => {
  it('works with multiple counters', async () => {
    render(
      <div>
        <Counter initialValue={0} data-testid="counter1" />
        <Counter initialValue={10} data-testid="counter2" />
      </div>
    );

    // 두 카운터가 독립적으로 작동하는지 테스트
  });
});
```

## 🎭 모킹 테스트

### API 서비스 모킹

```typescript
// Mocking.test.tsx
const ApiService = {
  fetchUser: jest.fn(),
  saveUser: jest.fn(),
  deleteUser: jest.fn(),
};

describe('API Service Mocking', () => {
  it('successfully loads user data', async () => {
    const mockUser = { id: 1, name: 'John Doe' };
    ApiService.fetchUser.mockResolvedValue(mockUser);

    render(<UserProfile userId={1} />);
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });
});
```

### 타이머 모킹

```typescript
describe('Timer Mocking', () => {
  it('handles debounced input', async () => {
    jest.useFakeTimers();
    
    // debounced input 테스트
    
    jest.advanceTimersByTime(300);
    jest.useRealTimers();
  });
});
```

## 🏃‍♂️ 테스트 실행

### 기본 명령어

```bash
# 모든 테스트 실행
npm test

# 커버리지와 함께 테스트 실행
npm run test:coverage

# CI 환경에서 테스트 실행
npm run test:ci

# 특정 파일 테스트
npm test Button.test.tsx

# 감시 모드로 테스트 실행
npm test -- --watch
```

### 테스트 스크립트

```json
{
  "scripts": {
    "test": "react-scripts test",
    "test:coverage": "react-scripts test --coverage --watchAll=false",
    "test:ci": "react-scripts test --coverage --watchAll=false --ci"
  }
}
```

## 📊 테스트 커버리지

테스트 커버리지는 다음 영역을 포함합니다:

- **Statements**: 코드 문장 커버리지
- **Branches**: 조건문 분기 커버리지
- **Functions**: 함수 커버리지
- **Lines**: 라인 커버리지

## 🎯 모범 사례

### 1. 테스트 작성 원칙

- **사용자 관점에서 테스트**: 실제 사용자가 하는 행동을 시뮬레이션
- **접근성 고려**: `getByRole`, `getByLabelText` 등 접근성 친화적 쿼리 사용
- **테스트 격리**: 각 테스트는 독립적으로 실행되어야 함

### 2. 좋은 테스트의 특징

```typescript
// ✅ 좋은 테스트
it('should display error message when email is invalid', async () => {
  const user = userEvent.setup();
  render(<LoginForm />);
  
  const emailInput = screen.getByLabelText(/email/i);
  await user.type(emailInput, 'invalid-email');
  
  const submitButton = screen.getByRole('button', { name: /login/i });
  await user.click(submitButton);
  
  expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
});

// ❌ 나쁜 테스트
it('should work', () => {
  render(<LoginForm />);
  // 구현 세부사항에 의존하는 테스트
});
```

### 3. 테스트 데이터 관리

```typescript
// 테스트 데이터를 별도 파일로 관리
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

// 각 테스트에서 재사용
beforeEach(() => {
  ApiService.fetchUsers.mockResolvedValue(mockUsers);
});
```

### 4. 비동기 테스트

```typescript
// async/await 사용
it('loads data asynchronously', async () => {
  render(<DataComponent />);
  
  await waitFor(() => {
    expect(screen.getByText('Data loaded')).toBeInTheDocument();
  });
});

// 사용자 이벤트와 함께
it('handles user interaction', async () => {
  const user = userEvent.setup();
  render(<InteractiveComponent />);
  
  await user.click(screen.getByRole('button'));
  await user.type(screen.getByRole('textbox'), 'Hello');
});
```

## 🔍 디버깅 팁

### 1. 테스트 디버깅

```typescript
// 컴포넌트 상태 확인
screen.debug(); // 현재 DOM 상태 출력

// 특정 요소만 디버깅
screen.debug(screen.getByRole('button'));

// 쿼리 결과 확인
const button = screen.queryByRole('button');
console.log(button); // null이면 요소를 찾을 수 없음
```

### 2. 테스트 실패 해결

```typescript
// 요소를 찾을 수 없는 경우
expect(screen.getByText('Expected text')).toBeInTheDocument();

// 비동기 작업 대기
await waitFor(() => {
  expect(screen.getByText('Async content')).toBeInTheDocument();
});

// 사용자 이벤트 대기
await user.click(button);
await waitFor(() => {
  expect(result).toBeInTheDocument();
});
```

## 📚 추가 학습 자료

- [React Testing Library 공식 문서](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest 공식 문서](https://jestjs.io/docs/getting-started)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## 🎉 결론

이 튜토리얼을 통해 다음을 학습했습니다:

- ✅ React Testing Library 기본 사용법
- ✅ 다양한 테스트 유형 작성
- ✅ 모킹과 비동기 테스트
- ✅ 통합 테스트 작성
- ✅ 테스트 커버리지 측정
- ✅ 테스트 모범 사례

이제 안정적이고 유지보수가 쉬운 React 애플리케이션을 구축할 수 있습니다!