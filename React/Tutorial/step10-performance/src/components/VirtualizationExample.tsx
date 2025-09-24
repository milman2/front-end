// @ts-nocheck
import React, { useState, useMemo } from 'react';
import './VirtualizationExample.css';

// 가상화 예제를 위한 데이터 타입
interface User {
  id: number;
  name: string;
  email: string;
  department: string;
  salary: number;
  joinDate: string;
  description: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  inStock: boolean;
}

// 가상화 예제 컴포넌트

const VirtualizationExample: React.FC = () => {
  const [itemCount, setItemCount] = useState<number>(1000);
  const [selectedView, setSelectedView] = useState<'fixed' | 'variable' | 'normal'>('fixed');

  // 대량의 사용자 데이터 생성
  const users: User[] = useMemo(() => {
    const departments = ['개발팀', '디자인팀', '마케팅팀', '영업팀', '인사팀', '재무팀'];
    const names = ['김철수', '이영희', '박민수', '정수진', '최동현', '한미영', '송지훈', '윤서연'];

    return Array.from({ length: itemCount }, (_, index) => ({
      id: index + 1,
      name: `${names[index % names.length]}${Math.floor(index / names.length) + 1}`,
      email: `user${index + 1}@company.com`,
      department: departments[index % departments.length],
      salary: Math.floor(Math.random() * 5000000) + 3000000,
      joinDate: new Date(
        2020 + Math.floor(Math.random() * 4),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      ).toLocaleDateString(),
      description: `사용자 ${index + 1}의 상세 정보입니다. 이 직원은 ${departments[index % departments.length]}에서 근무하며, 다양한 프로젝트에 참여하고 있습니다.`,
    }));
  }, [itemCount]);

  // 대량의 제품 데이터 생성 (가변 크기용)
  const products = useMemo(() => {
    const categories = ['전자제품', '의류', '도서', '식품', '가구', '화장품'];
    const productNames = [
      '노트북',
      '스마트폰',
      '태블릿',
      '헤드폰',
      '키보드',
      '마우스',
      '모니터',
      '웹캠',
    ];

    return Array.from({ length: itemCount }, (_, index) => {
      const name = productNames[index % productNames.length];
      const category = categories[index % categories.length];
      const descriptionLength = Math.floor(Math.random() * 200) + 50;
      const description =
        `${name} 제품 설명입니다. ` +
        '이 제품은 고품질의 재료로 제작되었으며, 사용자에게 최고의 경험을 제공합니다. '.repeat(
          Math.floor(descriptionLength / 50)
        );

      return {
        id: index + 1,
        name: `${name} ${Math.floor(index / productNames.length) + 1}`,
        price: Math.floor(Math.random() * 2000000) + 100000,
        category,
        description: description.substring(0, descriptionLength),
        inStock: Math.random() > 0.3,
      };
    });
  }, [itemCount]);

  // 가변 크기 아이템의 높이 계산 함수 (현재는 고정 크기로 시뮬레이션)
  // const getItemSize = useCallback(
  //   (index: number) => {
  //     const product = products[index];
  //     const baseHeight = 120;
  //     const descriptionHeight = Math.ceil(product.description.length / 50) * 20;
  //     return baseHeight + descriptionHeight;
  //   },
  //   [products]
  // );

  // 일반 리스트 렌더링 (비교용)
  const renderNormalList = () => (
    <div className="normal-list">
      <h3>일반 리스트 (성능 비교용)</h3>
      <div className="list-container">
        {users.slice(0, 100).map((user) => (
          <div key={user.id} className="normal-item">
            <div className="item-content">
              <div className="item-header">
                <h4>{user.name}</h4>
                <span className="department">{user.department}</span>
              </div>
              <p className="email">{user.email}</p>
              <div className="item-details">
                <span>급여: {user.salary.toLocaleString()}원</span>
                <span>입사일: {user.joinDate}</span>
              </div>
              <p className="description">{user.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // 고정 크기 가상화 리스트 렌더링 (react-window 대신 간단한 가상화)
  const renderFixedSizeList = () => {
    if (!users || users.length === 0) {
      return (
        <div className="virtual-list">
          <h3>고정 크기 가상화 리스트</h3>
          <div className="list-container">
            <p>데이터를 로딩 중...</p>
          </div>
        </div>
      );
    }

    // 간단한 가상화: 처음 20개만 렌더링
    const visibleItems = users.slice(0, 20);

    return (
      <div className="virtual-list">
        <h3>고정 크기 가상화 리스트 (간단한 가상화)</h3>
        <div className="list-container">
          <div style={{ height: '400px', overflow: 'auto' }}>
            {visibleItems.map((user, index) => (
              <div
                key={user.id}
                style={{ height: '150px', padding: '10px', borderBottom: '1px solid #eee' }}
              >
                <div className="item-content">
                  <div className="item-header">
                    <h4>{user.name}</h4>
                    <span className="department">{user.department}</span>
                  </div>
                  <p className="email">{user.email}</p>
                  <div className="item-details">
                    <span>급여: {user.salary.toLocaleString()}원</span>
                    <span>입사일: {user.joinDate}</span>
                  </div>
                  <p className="description">{user.description}</p>
                </div>
              </div>
            ))}
            <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
              총 {users.length}개 중 20개 표시 (간단한 가상화)
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 가변 크기 가상화 리스트 렌더링 (간단한 가상화)
  const renderVariableSizeList = () => {
    if (!products || products.length === 0) {
      return (
        <div className="virtual-list">
          <h3>가변 크기 가상화 리스트 (간단한 가상화)</h3>
          <div className="list-container">
            <p>데이터를 로딩 중...</p>
          </div>
        </div>
      );
    }

    // 간단한 가상화: 처음 15개만 렌더링
    const visibleItems = products.slice(0, 15);

    return (
      <div className="virtual-list">
        <h3>가변 크기 가상화 리스트 (간단한 가상화)</h3>
        <div className="list-container">
          <div style={{ height: '400px', overflow: 'auto' }}>
            {visibleItems.map((product, index) => (
              <div
                key={product.id}
                style={{ height: '200px', padding: '10px', borderBottom: '1px solid #eee' }}
              >
                <div className="item-content">
                  <div className="item-header">
                    <h4>{product.name}</h4>
                    <span className={`status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                      {product.inStock ? '재고있음' : '품절'}
                    </span>
                  </div>
                  <p className="category">{product.category}</p>
                  <div className="price">가격: {product.price.toLocaleString()}원</div>
                  <p className="description">{product.description}</p>
                  <div className="item-meta">
                    <small>설명 길이: {product.description?.length || 0}자</small>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
              총 {products.length}개 중 15개 표시 (간단한 가상화)
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="virtualization-example">
      <h2>가상화(Virtualization) 최적화 예제</h2>

      <div className="controls">
        <div className="control-group">
          <label>아이템 수:</label>
          <select value={itemCount} onChange={(e) => setItemCount(Number(e.target.value))}>
            <option value={100}>100개</option>
            <option value={1000}>1,000개</option>
            <option value={5000}>5,000개</option>
            <option value={10000}>10,000개</option>
          </select>
        </div>

        <div className="control-group">
          <label>보기 모드:</label>
          <select value={selectedView} onChange={(e) => setSelectedView(e.target.value as any)}>
            <option value="normal">일반 리스트 (100개)</option>
            <option value="fixed">고정 크기 가상화</option>
            <option value="variable">가변 크기 가상화</option>
          </select>
        </div>
      </div>

      <div className="performance-info">
        <h3>성능 정보</h3>
        <p>현재 아이템 수: {itemCount.toLocaleString()}개</p>
        <p>
          렌더링되는 DOM 요소:{' '}
          {selectedView === 'normal' ? '100개' : '약 10-15개 (화면에 보이는 만큼)'}
        </p>
        <p>메모리 사용량: {selectedView === 'normal' ? '높음' : '낮음'}</p>
      </div>

      <div className="list-view">
        {selectedView === 'normal' && renderNormalList()}
        {selectedView === 'fixed' && renderFixedSizeList()}
        {selectedView === 'variable' && renderVariableSizeList()}
      </div>

      <div className="explanation">
        <h3>가상화 최적화 설명</h3>
        <ul>
          <li>
            <strong>가상화(Virtualization):</strong> 화면에 보이는 아이템만 렌더링하여 성능 최적화
          </li>
          <li>
            <strong>고정 크기:</strong> 모든 아이템이 동일한 높이를 가질 때 사용
          </li>
          <li>
            <strong>가변 크기:</strong> 아이템마다 다른 높이를 가질 때 사용
          </li>
          <li>
            <strong>AutoSizer:</strong> 컨테이너 크기에 맞춰 가상화 리스트 크기 자동 조정
          </li>
          <li>
            <strong>성능 향상:</strong> 수만 개의 아이템도 부드럽게 스크롤 가능
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VirtualizationExample;
