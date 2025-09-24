import React, { useState, useEffect } from 'react';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    revenue: 0,
    orders: 0,
  });

  useEffect(() => {
    // 대시보드 데이터 로딩 시뮬레이션
    setTimeout(() => {
      setStats({
        totalUsers: 1250,
        activeUsers: 890,
        revenue: 1250000,
        orders: 234,
      });
    }, 500);
  }, []);

  return (
    <div className="dashboard">
      <h3>대시보드</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalUsers.toLocaleString()}</div>
            <div className="stat-label">총 사용자</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🟢</div>
          <div className="stat-content">
            <div className="stat-value">{stats.activeUsers.toLocaleString()}</div>
            <div className="stat-label">활성 사용자</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <div className="stat-value">₩{stats.revenue.toLocaleString()}</div>
            <div className="stat-label">수익</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <div className="stat-value">{stats.orders.toLocaleString()}</div>
            <div className="stat-label">주문 수</div>
          </div>
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="chart-placeholder">
          <h4>사용자 증가 추이</h4>
          <div className="mock-chart">
            <div className="chart-bar" style={{ height: '60%' }}></div>
            <div className="chart-bar" style={{ height: '80%' }}></div>
            <div className="chart-bar" style={{ height: '45%' }}></div>
            <div className="chart-bar" style={{ height: '90%' }}></div>
            <div className="chart-bar" style={{ height: '70%' }}></div>
            <div className="chart-bar" style={{ height: '85%' }}></div>
          </div>
        </div>
        
        <div className="recent-activities">
          <h4>최근 활동</h4>
          <ul>
            <li>새 사용자 가입: 김철수</li>
            <li>주문 완료: #12345</li>
            <li>시스템 업데이트 완료</li>
            <li>새 사용자 가입: 이영희</li>
            <li>주문 취소: #12344</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
