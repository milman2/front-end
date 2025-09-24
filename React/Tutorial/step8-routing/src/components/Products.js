import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import './Products.css';

// 샘플 상품 데이터
const SAMPLE_PRODUCTS = [
  { id: 1, name: 'React 책', price: 30000, category: 'book' },
  { id: 2, name: 'JavaScript 가이드', price: 25000, category: 'book' },
  { id: 3, name: 'CSS 마스터', price: 20000, category: 'book' },
  { id: 4, name: 'Node.js 완벽 가이드', price: 35000, category: 'book' },
  { id: 5, name: '웹 개발 노트북', price: 1500000, category: 'laptop' },
  { id: 6, name: '프로그래밍 마우스', price: 50000, category: 'accessory' },
];

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filter, setFilter] = useState(searchParams.get('category') || 'all');

  const filteredProducts =
    filter === 'all'
      ? SAMPLE_PRODUCTS
      : SAMPLE_PRODUCTS.filter(product => product.category === filter);

  const handleFilterChange = newFilter => {
    setFilter(newFilter);
    if (newFilter === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: newFilter });
    }
  };

  const handleProductClick = productId => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className='products'>
      <h2>상품 목록</h2>
      <p>
        React Router의 useSearchParams와 useNavigate Hook을 사용한 예제입니다.
      </p>

      <div className='filters'>
        <h3>카테고리 필터</h3>
        <div className='filter-buttons'>
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => handleFilterChange('all')}
          >
            전체
          </button>
          <button
            className={filter === 'book' ? 'active' : ''}
            onClick={() => handleFilterChange('book')}
          >
            책
          </button>
          <button
            className={filter === 'laptop' ? 'active' : ''}
            onClick={() => handleFilterChange('laptop')}
          >
            노트북
          </button>
          <button
            className={filter === 'accessory' ? 'active' : ''}
            onClick={() => handleFilterChange('accessory')}
          >
            액세서리
          </button>
        </div>
        <p className='current-filter'>현재 필터: {filter}</p>
      </div>

      <div className='product-list'>
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className='product-card'
            onClick={() => handleProductClick(product.id)}
          >
            <h4>{product.name}</h4>
            <p className='price'>{product.price.toLocaleString()}원</p>
            <p className='category'>카테고리: {product.category}</p>
          </div>
        ))}
      </div>

      <div className='navigation'>
        <Link to='/' className='back-link'>
          ← 홈으로 돌아가기
        </Link>
      </div>

      <div className='code-example'>
        <strong>useSearchParams와 useNavigate 사용법:</strong>
        <br />
        <pre
          style={{
            background: '#f8f9fa',
            padding: '15px',
            borderRadius: '6px',
            overflow: 'auto',
            fontSize: '14px',
            fontFamily: 'monospace',
            border: '1px solid #e9ecef',
            margin: '10px 0',
          }}
        >
          {`import { useSearchParams, useNavigate } from 'react-router-dom';

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // URL 쿼리 파라미터 읽기
  const category = searchParams.get('category');
  
  // URL 쿼리 파라미터 설정
  const handleFilter = (newCategory) => {
    setSearchParams({ category: newCategory });
  };
  
  // 프로그래밍 방식 네비게이션
  const handleProductClick = (productId) => {
    navigate(\`/product/\${productId}\`);
  };
  
  return <div>...</div>;
}`}
        </pre>
      </div>
    </div>
  );
}

export default Products;
