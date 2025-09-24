import React, { useState, useEffect } from 'react';

const HeavyComponent: React.FC = () => {
  const [data, setData] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 무거운 계산 시뮬레이션
    const heavyCalculation = () => {
      const result: number[] = [];
      for (let i = 0; i < 100000; i++) {
        result.push(Math.random() * 1000);
      }
      return result;
    };

    setTimeout(() => {
      setData(heavyCalculation());
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="heavy-component">
        <h3>무거운 컴포넌트</h3>
        <p>복잡한 계산을 수행 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="heavy-component">
      <h3>무거운 컴포넌트</h3>
      <p>100,000개의 랜덤 데이터를 계산했습니다.</p>
      <p>평균값: {(data.reduce((sum, val) => sum + val, 0) / data.length).toFixed(2)}</p>
      <p>최대값: {Math.max(...data).toFixed(2)}</p>
      <p>최소값: {Math.min(...data).toFixed(2)}</p>
    </div>
  );
};

export default HeavyComponent;
