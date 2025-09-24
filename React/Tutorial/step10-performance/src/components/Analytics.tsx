import React, { useState, useEffect } from 'react';

interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: number;
  topPages: Array<{ page: string; views: number }>;
  trafficSources: Array<{ source: string; percentage: number }>;
}

const Analytics: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    // 분석 데이터 로딩 시뮬레이션
    setTimeout(() => {
      setData({
        pageViews: 125000,
        uniqueVisitors: 45000,
        bounceRate: 35.2,
        avgSessionDuration: 3.5,
        topPages: [
          { page: '/home', views: 25000 },
          { page: '/products', views: 18000 },
          { page: '/about', views: 12000 },
          { page: '/contact', views: 8000 },
          { page: '/blog', views: 6000 },
        ],
        trafficSources: [
          { source: 'Organic Search', percentage: 45 },
          { source: 'Direct', percentage: 25 },
          { source: 'Social Media', percentage: 15 },
          { source: 'Referral', percentage: 10 },
          { source: 'Email', percentage: 5 },
        ],
      });
      setLoading(false);
    }, 1200);
  }, [timeRange]);

  if (loading) {
    return (
      <div className="analytics">
        <h3>분석</h3>
        <p>분석 데이터를 로딩 중입니다...</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="analytics">
      <h3>분석</h3>

      <div className="time-range-selector">
        <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
          <option value="1d">지난 1일</option>
          <option value="7d">지난 7일</option>
          <option value="30d">지난 30일</option>
          <option value="90d">지난 90일</option>
        </select>
      </div>

      <div className="analytics-overview">
        <div className="metric-card">
          <div className="metric-icon">👁️</div>
          <div className="metric-content">
            <div className="metric-value">{data.pageViews.toLocaleString()}</div>
            <div className="metric-label">페이지 뷰</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">👤</div>
          <div className="metric-content">
            <div className="metric-value">{data.uniqueVisitors.toLocaleString()}</div>
            <div className="metric-label">고유 방문자</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">📊</div>
          <div className="metric-content">
            <div className="metric-value">{data.bounceRate}%</div>
            <div className="metric-label">이탈률</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">⏱️</div>
          <div className="metric-content">
            <div className="metric-value">{data.avgSessionDuration}분</div>
            <div className="metric-label">평균 세션 시간</div>
          </div>
        </div>
      </div>

      <div className="analytics-charts">
        <div className="chart-section">
          <h4>인기 페이지</h4>
          <div className="bar-chart">
            {data.topPages.map((page, index) => (
              <div key={page.page} className="bar-item">
                <div className="bar-label">{page.page}</div>
                <div className="bar-container">
                  <div
                    className="bar"
                    style={{
                      width: `${(page.views / data.topPages[0].views) * 100}%`,
                    }}
                  ></div>
                  <span className="bar-value">{page.views.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-section">
          <h4>트래픽 소스</h4>
          <div className="pie-chart">
            <div className="pie-container">
              {data.trafficSources.map((source, index) => {
                const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
                return (
                  <div key={source.source} className="pie-item">
                    <div className="pie-color" style={{ backgroundColor: colors[index] }}></div>
                    <span className="pie-label">{source.source}</span>
                    <span className="pie-percentage">{source.percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
