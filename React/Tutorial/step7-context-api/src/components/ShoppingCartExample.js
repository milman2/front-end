import React, { useState } from 'react';
import { useShoppingCart } from './ShoppingCartContext';
import './ShoppingCartExample.css';

// 샘플 상품 데이터
const SAMPLE_PRODUCTS = [
  { id: 1, name: 'React 책', price: 30000 },
  { id: 2, name: 'JavaScript 가이드', price: 25000 },
  { id: 3, name: 'CSS 마스터', price: 20000 },
  { id: 4, name: 'Node.js 완벽 가이드', price: 35000 },
];

function ShoppingCartExample() {
  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  } = useShoppingCart();

  const [selectedProduct, setSelectedProduct] = useState('');

  const handleAddToCart = () => {
    const product = SAMPLE_PRODUCTS.find(
      p => p.id === parseInt(selectedProduct)
    );
    if (product) {
      addItem(product);
    }
  };

  return (
    <div className='shopping-cart-example'>
      <h3>쇼핑 카트 Context 예제</h3>

      <div className='product-section'>
        <h4>상품 추가</h4>
        <div className='add-product'>
          <select
            value={selectedProduct}
            onChange={e => setSelectedProduct(e.target.value)}
          >
            <option value=''>상품을 선택하세요</option>
            {SAMPLE_PRODUCTS.map(product => (
              <option key={product.id} value={product.id}>
                {product.name} - {product.price.toLocaleString()}원
              </option>
            ))}
          </select>
          <button onClick={handleAddToCart} disabled={!selectedProduct}>
            장바구니에 추가
          </button>
        </div>
      </div>

      <div className='cart-section'>
        <h4>장바구니 ({getTotalItems()}개 상품)</h4>
        {items.length === 0 ? (
          <p>장바구니가 비어있습니다.</p>
        ) : (
          <div className='cart-items'>
            {items.map(item => (
              <div key={item.id} className='cart-item'>
                <span className='item-name'>{item.name}</span>
                <div className='quantity-controls'>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <span className='item-price'>
                  {(item.price * item.quantity).toLocaleString()}원
                </span>
                <button
                  onClick={() => removeItem(item.id)}
                  className='remove-btn'
                >
                  삭제
                </button>
              </div>
            ))}
            <div className='cart-total'>
              <strong>총 금액: {getTotalPrice().toLocaleString()}원</strong>
            </div>
            <button onClick={clearCart} className='clear-cart-btn'>
              장바구니 비우기
            </button>
          </div>
        )}
      </div>

      <div className='code-example'>
        <strong>쇼핑 카트 Context 사용법:</strong>
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
          {`// 쇼핑 카트 Context 사용
function ProductCard({ product }) {
  const { addItem } = useShoppingCart();
  
  return (
    <div>
      <h3>{product.name}</h3>
      <p>{product.price}원</p>
      <button onClick={() => addItem(product)}>
        장바구니에 추가
      </button>
    </div>
  );
}

function CartSummary() {
  const { items, getTotalPrice } = useShoppingCart();
  
  return (
    <div>
      <h3>장바구니 ({items.length}개)</h3>
      <p>총 금액: {getTotalPrice()}원</p>
    </div>
  );
}`}
        </pre>
      </div>
    </div>
  );
}

export default ShoppingCartExample;
