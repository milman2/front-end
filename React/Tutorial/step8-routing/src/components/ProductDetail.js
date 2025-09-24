import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './ProductDetail.css';

// 샘플 상품 데이터
const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: 'React 책',
    price: 30000,
    category: 'book',
    description: 'React를 배우는 최고의 책입니다.',
  },
  {
    id: 2,
    name: 'JavaScript 가이드',
    price: 25000,
    category: 'book',
    description: 'JavaScript의 모든 것을 다루는 가이드입니다.',
  },
  {
    id: 3,
    name: 'CSS 마스터',
    price: 20000,
    category: 'book',
    description: 'CSS를 마스터하는 방법을 알려드립니다.',
  },
  {
    id: 4,
    name: 'Node.js 완벽 가이드',
    price: 35000,
    category: 'book',
    description: 'Node.js 백엔드 개발을 위한 완벽한 가이드입니다.',
  },
  {
    id: 5,
    name: '웹 개발 노트북',
    price: 1500000,
    category: 'laptop',
    description: '웹 개발에 최적화된 고성능 노트북입니다.',
  },
  {
    id: 6,
    name: '프로그래밍 마우스',
    price: 50000,
    category: 'accessory',
    description: '개발자들을 위한 편안한 마우스입니다.',
  },
];

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = SAMPLE_PRODUCTS.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className='product-detail'>
        <div className='error'>
          <h2>상품을 찾을 수 없습니다</h2>
          <p>요청하신 상품이 존재하지 않습니다.</p>
          <button onClick={() => navigate('/products')} className='back-button'>
            상품 목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='product-detail'>
      <h2>상품 상세 정보</h2>

      <div className='product-info'>
        <h3>{product.name}</h3>
        <p className='price'>{product.price.toLocaleString()}원</p>
        <p className='category'>카테고리: {product.category}</p>
        <p className='description'>{product.description}</p>
      </div>

      <div className='actions'>
        <button onClick={() => navigate('/products')} className='back-button'>
          상품 목록으로 돌아가기
        </button>
        <button onClick={() => navigate(-1)} className='back-button'>
          이전 페이지로
        </button>
        <Link to='/' className='home-link'>
          홈으로
        </Link>
      </div>

      <div className='code-example'>
        <strong>useParams와 useNavigate 사용법:</strong>
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
          {`import { useParams, useNavigate } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams(); // URL 파라미터 추출
  const navigate = useNavigate();
  
  // URL 파라미터로 상품 찾기
  const product = products.find(p => p.id === parseInt(id));
  
  // 프로그래밍 방식 네비게이션
  const handleBack = () => {
    navigate('/products'); // 특정 경로로 이동
  };
  
  const handlePrevious = () => {
    navigate(-1); // 브라우저 히스토리에서 이전 페이지로
  };
  
  return <div>...</div>;
}`}
        </pre>
      </div>
    </div>
  );
}

export default ProductDetail;
