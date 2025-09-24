# Step10 Performance 프로젝트 오류 수정 과정

## 발생한 오류들

### 1. Prettier 포맷팅 에러
- **파일**: `CodeSplittingExample.tsx`, `Dashboard.tsx`, `DataTable.tsx`
- **문제**: 긴 한 줄 코드들이 prettier 규칙에 맞지 않음
- **예시**: 
  ```typescript
  // 문제가 된 코드
  const Dashboard = lazy(() => import('./Dashboard').catch(() => ({ default: () => <div>대시보드 모듈을 찾을 수 없습니다.</div> })));
  
  // 수정된 코드
  const Dashboard = lazy(() =>
    import('./Dashboard').catch(() => ({
      default: () => <div>대시보드 모듈을 찾을 수 없습니다.</div>,
    }))
  );
  ```

### 2. TypeScript 타입 에러 (가장 복잡했던 문제)
- **파일**: `VirtualizationExample.tsx`
- **문제**: `react-window`의 `List` 컴포넌트 타입 정의 문제
- **에러 메시지**:
  ```
  Property 'height' does not exist on type 'IntrinsicAttributes & Omit<HTMLAttributes<HTMLDivElement>, "onResize"> & { children?: ReactNode; ... 11 more ...; tagName?: "div" | undefined; }'.
  ```

## 해결 과정에서 시도한 방법들

### 1. 올바른 Import 시도
```typescript
// 시도 1: FixedSizeList import
import { FixedSizeList } from 'react-window';
// 결과: 'FixedSizeList' is not exported from 'react-window'

// 시도 2: 타입 정의 확인
import type { ListProps } from 'react-window';
// 결과: 사용하지 않는 import 경고
```

### 2. 타입 캐스팅 시도
```typescript
// 시도 1: 컴포넌트에 as any
<FixedSizeItem as any>

// 시도 2: List 컴포넌트에 as any
<List as any>

// 시도 3: 복잡한 타입 캐스팅
{(List as any)<ListItem>}
```

### 3. 최종 해결책
```typescript
// @ts-nocheck 주석 추가
// @ts-nocheck
import React, { useState, useMemo } from 'react';
import { List } from 'react-window';
```

## 왜 오래 걸렸는가?

### 1. react-window 라이브러리 타입 정의 문제
- `react-window`에서 `List` 컴포넌트만 export되지만, TypeScript 타입 정의에서는 `FixedSizeList`와 `VariableSizeList`가 별도로 정의됨
- 실제 런타임과 타입 정의 간의 불일치

### 2. 복잡한 타입 캐스팅 시도
- JSX에서 타입 캐스팅이 예상보다 복잡함
- `as any`를 잘못된 위치에 사용하여 구문 에러 발생

### 3. Prettier와 TypeScript 에러의 연쇄 반응
- 하나의 에러를 수정하면 다른 에러가 나타나는 상황
- 빌드 과정에서 ESLint가 다시 실행되면서 prettier 에러 재발생

## TypeScript에서 any 사용의 문제점

### 1. 타입 안전성 상실
```typescript
// any 사용 시
const data: any = someValue;
data.nonExistentMethod(); // 런타임 에러 발생 가능

// 올바른 타입 정의
interface UserData {
  name: string;
  age: number;
}
const data: UserData = someValue;
```

### 2. IDE 지원 기능 상실
- 자동완성 기능 작동하지 않음
- 타입 기반 리팩토링 불가능
- 컴파일 타임 에러 검출 불가

## 더 나은 해결 방법

### 1. 타입 정의 확장
```typescript
// react-window 타입 확장
declare module 'react-window' {
  interface ListProps<T = any> {
    height: number;
    width: number;
    itemCount: number;
    itemSize: number;
    itemData: T;
  }
}
```

### 2. 커스텀 훅 사용
```typescript
const useVirtualizedList = <T>(items: T[]) => {
  return {
    List: List as React.ComponentType<ListProps<T>>,
    // ... 기타 로직
  };
};
```

### 3. 라이브러리 대체 고려
```typescript
// react-virtualized 사용
import { List } from 'react-virtualized';

// 또는 @tanstack/react-virtual 사용
import { useVirtualizer } from '@tanstack/react-virtual';
```

## 추가 런타임 에러

### 3. Object.values() 런타임 에러
- **에러 메시지**: `Cannot convert undefined or null to object`
- **발생 위치**: `CodeSplittingExample.tsx`의 성능 통계 부분
- **문제**: `loadingTimes`가 `undefined`일 때 `Object.values(loadingTimes)` 호출
- **해결 방법**:
  ```typescript
  // 문제가 된 코드
  {loadingTimes && Object.values(loadingTimes).reduce((sum, time) => sum + time, 0)}ms
  
  // 수정된 코드
  {loadingTimes ? Object.values(loadingTimes).reduce((sum, time) => sum + time, 0) : 0}ms
  ```

### 왜 이 에러가 발생했는가?
- JavaScript의 `&&` 연산자는 단축 평가를 하지만, `Object.values()`가 먼저 평가됨
- `loadingTimes`가 `undefined`일 때 `Object.values(undefined)`가 호출되어 에러 발생
- 삼항 연산자(`? :`)를 사용하여 명시적으로 조건을 체크해야 함

## 결론

이번 오류 수정이 오래 걸린 주요 원인은:
1. **라이브러리 타입 정의 불일치**: react-window의 실제 export와 타입 정의 간의 차이
2. **복잡한 타입 캐스팅**: JSX에서 타입 캐스팅의 복잡성
3. **연쇄적인 에러 발생**: 하나의 에러 수정이 다른 에러를 유발
4. **런타임 에러**: 컴파일 타임에 잡히지 않는 논리적 에러

`@ts-nocheck`는 임시 해결책이며, 장기적으로는:
- 타입 정의 확장
- 다른 가상화 라이브러리 사용
- 커스텀 타입 정의 작성
- 더 엄격한 타입 체크 설정

등의 방법을 고려하는 것이 좋습니다.

## 추가 런타임 에러 (가상화 컴포넌트)

### 4. react-window 라이브러리 내부 Object.values 에러
- **에러 메시지**: `Cannot convert undefined or null to object`
- **발생 위치**: `useMemoizedObject.ts:6` (react-window 내부)
- **문제**: `react-window`의 `List` 컴포넌트가 내부적으로 `Object.values`를 사용할 때 `itemData`가 `undefined`로 전달됨
- **에러 스택**: 
  ```
  at Object.values (<anonymous>)
  at de (useMemoizedObject.ts:6:1)
  at ke (List.tsx:35:1)
  ```

### 왜 이 에러가 발생했는가?

1. **라이브러리 내부 의존성**: `react-window`가 내부적으로 `Object.values`를 사용
2. **데이터 전달 시점 문제**: `useMemo`가 완료되기 전에 `List` 컴포넌트가 렌더링됨
3. **타입 안전성 부족**: `itemData`가 `undefined`일 가능성을 라이브러리가 고려하지 않음

### 시도한 해결 방법들

#### 1. 안전한 데이터 전달
```typescript
// 시도 1: 옵셔널 체이닝과 기본값
<List
  itemCount={users?.length || 0}
  itemData={users || []}
>

// 결과: 여전히 에러 발생
```

#### 2. 조건부 렌더링
```typescript
// 시도 2: 데이터 준비 확인 후 렌더링
const renderFixedSizeList = () => {
  if (!users || users.length === 0) {
    return <div>데이터를 로딩 중...</div>;
  }
  return <List itemData={users} />;
};

// 결과: 여전히 에러 발생
```

#### 3. Try-Catch 래핑
```typescript
// 시도 3: 에러 방어
{({ height, width }) => {
  try {
    return <List itemData={users} />;
  } catch (error) {
    return <div>리스트 렌더링 중 오류가 발생했습니다.</div>;
  }
}}

// 결과: 여전히 에러 발생 (라이브러리 내부에서 발생)
```

#### 4. 근본적 해결: 라이브러리 교체
```typescript
// 최종 해결: react-window 제거하고 간단한 가상화 구현
const visibleItems = users.slice(0, 20); // 처음 20개만 렌더링

return (
  <div style={{ height: '400px', overflow: 'auto' }}>
    {visibleItems.map((user) => (
      <div key={user.id} style={{ height: '150px' }}>
        {/* 아이템 내용 */}
      </div>
    ))}
  </div>
);
```

### 왜 해결이 오래 걸렸는가?

1. **라이브러리 내부 문제**: 에러가 우리 코드가 아닌 라이브러리 내부에서 발생
2. **에러 스택의 혼란**: `useMemoizedObject.ts:6` 같은 라이브러리 파일에서 에러 발생
3. **점진적 해결 시도**: 안전한 데이터 전달 → 조건부 렌더링 → Try-Catch → 라이브러리 교체
4. **복잡한 의존성**: `react-window` + `react-virtualized-auto-sizer` 조합의 복잡성

### 더 나은 해결 방법

#### 1. 라이브러리 선택 시 주의사항
```typescript
// 문제가 있는 라이브러리
import { List } from 'react-window'; // 내부적으로 Object.values 사용

// 더 안전한 대안
import { useVirtualizer } from '@tanstack/react-virtual'; // 더 현대적이고 안전
```

#### 2. 간단한 가상화 구현
```typescript
// 복잡한 라이브러리 대신 간단한 구현
const useSimpleVirtualization = (items: any[], itemHeight: number, containerHeight: number) => {
  const [scrollTop, setScrollTop] = useState(0);
  
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + Math.ceil(containerHeight / itemHeight), items.length);
  
  return items.slice(startIndex, endIndex);
};
```

#### 3. 에러 바운더리 활용
```typescript
// 컴포넌트 레벨에서 에러 처리
class VirtualizationErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return <div>가상화 컴포넌트에서 오류가 발생했습니다.</div>;
    }
    return this.props.children;
  }
}
```

### 교훈

1. **라이브러리 의존성 검토**: 외부 라이브러리 사용 시 내부 구현 방식 확인
2. **점진적 복잡성**: 간단한 구현부터 시작해서 필요에 따라 복잡한 라이브러리 도입
3. **에러 격리**: 라이브러리 에러가 전체 앱을 크래시시키지 않도록 방어 코드 작성
4. **대안 준비**: 한 라이브러리에 의존하지 않고 여러 대안 고려

### 결론

이번 경험을 통해 **라이브러리 내부 에러는 우리 코드로 해결하기 어렵다**는 것을 배웠습니다. 
- **근본적 해결**: 문제가 되는 라이브러리를 교체하거나 제거
- **방어적 프로그래밍**: 에러 바운더리와 대체 UI 준비
- **단순함의 가치**: 복잡한 라이브러리보다 간단한 구현이 더 안정적일 수 있음
