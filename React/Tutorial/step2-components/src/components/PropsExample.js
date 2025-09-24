import React from "react";

// Props를 받는 컴포넌트 예제
function UserCard({ name, age, job, avatar }) {
  return (
    <div className="user-card">
      <h3>{name}</h3>
      <p>
        <strong>나이:</strong> {age}세
      </p>
      <p>
        <strong>직업:</strong> {job}
      </p>
      <p>
        <strong>아바타:</strong> {avatar}
      </p>
    </div>
  );
}

// 기본값이 있는 Props
function ProductCard({ name, price, discount = 0 }) {
  const finalPrice = price - discount;

  return (
    <div
      style={{
        background: "#e8f5e8",
        border: "1px solid #4caf50",
        borderRadius: "8px",
        padding: "15px",
        margin: "10px",
        display: "inline-block",
        minWidth: "200px",
      }}
    >
      <h3>{name}</h3>
      <p>
        <strong>원가:</strong> {price.toLocaleString()}원
      </p>
      {discount > 0 && (
        <p>
          <strong>할인:</strong> {discount.toLocaleString()}원
        </p>
      )}
      <p>
        <strong>최종가격:</strong> {finalPrice.toLocaleString()}원
      </p>
    </div>
  );
}

function PropsExample() {
  const users = [
    { name: "김개발", age: 28, job: "프론트엔드 개발자", avatar: "👨‍💻" },
    { name: "이리액트", age: 25, job: "React 개발자", avatar: "👩‍💻" },
    { name: "박자바", age: 30, job: "백엔드 개발자", avatar: "👨‍🔬" },
  ];

  const products = [
    { name: "노트북", price: 1500000, discount: 100000 },
    { name: "마우스", price: 50000 },
    { name: "키보드", price: 120000, discount: 20000 },
  ];

  return (
    <div className="component-section">
      <h2>3. Props 전달하고 받기</h2>
      <p>
        Props는 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 방법입니다.
        Props는 읽기 전용이며, 컴포넌트를 재사용 가능하게 만듭니다.
      </p>

      <div className="code-example">
        <strong>Props를 받는 컴포넌트:</strong>
        <br />
        <pre
          style={{
            background: "#f8f9fa",
            padding: "15px",
            borderRadius: "6px",
            overflow: "auto",
            fontSize: "14px",
            fontFamily: "monospace",
            border: "1px solid #e9ecef",
            margin: "10px 0",
          }}
        >
          {`function UserCard({ name, age, job, avatar }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>나이: {age}세</p>
      <p>직업: {job}</p>
      <p>아바타: {avatar}</p>
    </div>
  );
}

// 사용법
<UserCard 
  name="김개발" 
  age={28} 
  job="프론트엔드 개발자" 
  avatar="👨‍💻" 
/>`}
        </pre>
      </div>

      <h3>사용자 카드 예제:</h3>
      <div>
        {users.map((user, index) => (
          <UserCard
            key={index}
            name={user.name}
            age={user.age}
            job={user.job}
            avatar={user.avatar}
          />
        ))}
      </div>

      <h3>상품 카드 예제 (기본값 포함):</h3>
      <div>
        {products.map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            price={product.price}
            discount={product.discount}
          />
        ))}
      </div>

      <div className="highlight">
        <strong>Props의 특징:</strong>
        <ul style={{ textAlign: "left", display: "inline-block" }}>
          <li>읽기 전용 (Read-only)</li>
          <li>부모에서 자식으로만 전달</li>
          <li>컴포넌트 재사용성 향상</li>
          <li>기본값 설정 가능</li>
          <li>구조 분해 할당으로 받기</li>
        </ul>
      </div>
    </div>
  );
}

export default PropsExample;
