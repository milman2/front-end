import React, { useState, useMemo, useCallback, memo } from 'react';
import './MemoizationExample.css';

// 메모이제이션 예제를 위한 데이터 타입
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  department: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

// 메모이제이션되지 않은 컴포넌트
const UserCard: React.FC<{ user: User; onClick: (id: number) => void }> = ({ user, onClick }) => {
  // eslint-disable-next-line no-console
  console.log(`UserCard 렌더링: ${user.name}`);

  return (
    <div className="user-card" onClick={() => onClick(user.id)}>
      <h4>{user.name}</h4>
      <p>{user.email}</p>
      <p>나이: {user.age}</p>
      <p>부서: {user.department}</p>
    </div>
  );
};

// React.memo로 메모이제이션된 컴포넌트
const MemoizedUserCard = memo<UserCardProps>(({ user, onClick }) => {
  // eslint-disable-next-line no-console
  console.log(`MemoizedUserCard 렌더링: ${user.name}`);

  return (
    <div className="user-card" onClick={() => onClick(user.id)}>
      <h4>{user.name}</h4>
      <p>{user.email}</p>
      <p>나이: {user.age}</p>
      <p>부서: {user.department}</p>
    </div>
  );
});

interface UserCardProps {
  user: User;
  onClick: (id: number) => void;
}

const MemoizationExample: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: '김철수', email: 'kim@example.com', age: 30, department: '개발팀' },
    { id: 2, name: '이영희', email: 'lee@example.com', age: 25, department: '디자인팀' },
    { id: 3, name: '박민수', email: 'park@example.com', age: 35, department: '마케팅팀' },
    { id: 4, name: '정수진', email: 'jung@example.com', age: 28, department: '개발팀' },
    { id: 5, name: '최동현', email: 'choi@example.com', age: 32, department: '디자인팀' },
  ]);

  const [products] = useState<Product[]>([
    { id: 1, name: '노트북', price: 1500000, category: '전자제품', inStock: true },
    { id: 2, name: '마우스', price: 50000, category: '전자제품', inStock: true },
    { id: 3, name: '키보드', price: 120000, category: '전자제품', inStock: false },
    { id: 4, name: '모니터', price: 300000, category: '전자제품', inStock: true },
    { id: 5, name: '헤드폰', price: 200000, category: '전자제품', inStock: true },
  ]);

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [counter, setCounter] = useState<number>(0);

  // useMemo를 사용한 필터링된 사용자 목록
  const filteredUsers = useMemo(() => {
    // eslint-disable-next-line no-console
    console.log('필터링된 사용자 목록 계산 중...');
    if (filter === 'all') return users;
    return users.filter((user) => user.department === filter);
  }, [users, filter]);

  // useMemo를 사용한 통계 계산
  const userStats = useMemo(() => {
    // eslint-disable-next-line no-console
    console.log('사용자 통계 계산 중...');
    const totalUsers = users.length;
    const avgAge = users.reduce((sum, user) => sum + user.age, 0) / totalUsers;
    const departments = Array.from(new Set(users.map((user) => user.department)));

    return {
      totalUsers,
      avgAge: Math.round(avgAge),
      departments: departments.length,
    };
  }, [users]);

  // useMemo를 사용한 재고 있는 제품 목록
  const inStockProducts = useMemo(() => {
    // eslint-disable-next-line no-console
    console.log('재고 있는 제품 목록 계산 중...');
    return products.filter((product) => product.inStock);
  }, [products]);

  // useCallback을 사용한 이벤트 핸들러
  const handleUserClick = useCallback((id: number) => {
    setSelectedUserId(id);
  }, []);

  const handleFilterChange = useCallback((newFilter: string) => {
    setFilter(newFilter);
  }, []);

  const handleAddUser = useCallback(() => {
    const newUser: User = {
      id: users.length + 1,
      name: `새 사용자 ${users.length + 1}`,
      email: `user${users.length + 1}@example.com`,
      age: Math.floor(Math.random() * 30) + 20,
      department: ['개발팀', '디자인팀', '마케팅팀'][Math.floor(Math.random() * 3)],
    };
    setUsers((prev) => [...prev, newUser]);
  }, [users.length]);

  const handleIncrementCounter = useCallback(() => {
    setCounter((prev) => prev + 1);
  }, []);

  return (
    <div className="memoization-example">
      <h2>메모이제이션 최적화 예제</h2>

      <div className="controls">
        <div className="control-group">
          <label>부서 필터:</label>
          <select value={filter} onChange={(e) => handleFilterChange(e.target.value)}>
            <option value="all">전체</option>
            <option value="개발팀">개발팀</option>
            <option value="디자인팀">디자인팀</option>
            <option value="마케팅팀">마케팅팀</option>
          </select>
        </div>

        <div className="control-group">
          <button onClick={handleAddUser}>사용자 추가</button>
          <button onClick={handleIncrementCounter}>카운터 증가: {counter}</button>
        </div>
      </div>

      <div className="stats">
        <h3>사용자 통계 (useMemo)</h3>
        <p>총 사용자 수: {userStats.totalUsers}</p>
        <p>평균 나이: {userStats.avgAge}세</p>
        <p>부서 수: {userStats.departments}개</p>
      </div>

      <div className="comparison">
        <div className="section">
          <h3>일반 컴포넌트 (리렌더링 발생)</h3>
          <div className="user-grid">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} onClick={handleUserClick} />
            ))}
          </div>
        </div>

        <div className="section">
          <h3>메모이제이션된 컴포넌트 (React.memo)</h3>
          <div className="user-grid">
            {filteredUsers.map((user) => (
              <MemoizedUserCard key={user.id} user={user} onClick={handleUserClick} />
            ))}
          </div>
        </div>
      </div>

      <div className="products-section">
        <h3>재고 있는 제품 (useMemo)</h3>
        <div className="product-list">
          {inStockProducts.map((product) => (
            <div key={product.id} className="product-card">
              <h4>{product.name}</h4>
              <p>가격: {product.price.toLocaleString()}원</p>
              <p>카테고리: {product.category}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedUserId && (
        <div className="selected-user">
          <h3>선택된 사용자 ID: {selectedUserId}</h3>
        </div>
      )}

      <div className="explanation">
        <h3>메모이제이션 최적화 설명</h3>
        <ul>
          <li>
            <strong>React.memo:</strong> 컴포넌트의 props가 변경되지 않으면 리렌더링을 방지
          </li>
          <li>
            <strong>useMemo:</strong> 의존성이 변경되지 않으면 계산 결과를 캐시
          </li>
          <li>
            <strong>useCallback:</strong> 의존성이 변경되지 않으면 함수를 캐시
          </li>
          <li>
            카운터를 증가시켜보면 일반 컴포넌트는 리렌더링되지만 메모이제이션된 컴포넌트는
            리렌더링되지 않음
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MemoizationExample;
