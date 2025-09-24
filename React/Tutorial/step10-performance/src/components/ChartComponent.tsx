import React, { useState, useEffect } from 'react';

interface ChartData {
  name: string;
  value: number;
  color: string;
}

const ChartComponent: React.FC = () => {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');

  useEffect(() => {
    // 차트 데이터 로딩 시뮬레이션
    setTimeout(() => {
      const mockData: ChartData[] = [
        { name: '개발팀', value: 45, color: '#FF6B6B' },
        { name: '디자인팀', value: 25, color: '#4ECDC4' },
        { name: '마케팅팀', value: 20, color: '#45B7D1' },
        { name: '영업팀', value: 30, color: '#96CEB4' },
        { name: '인사팀', value: 15, color: '#FFEAA7' },
      ];
      setData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const maxValue = Math.max(...data.map(d => d.value));

  if (loading) {
    return (
      <div className="chart-component">
        <h3>차트 컴포넌트</h3>
        <p>차트 데이터를 로딩 중입니다...</p>
      </div>
    );
  }

  const renderBarChart = () => (
    <div className="bar-chart">
      <h4>막대 차트</h4>
      <div className="chart-container">
        {data.map((item, index) => (
          <div key={item.name} className="bar-item">
            <div className="bar-label">{item.name}</div>
            <div className="bar-wrapper">
              <div
                className="bar"
                style={{
                  height: `${(item.value / maxValue) * 200}px`,
                  backgroundColor: item.color,
                }}
              />
              <div className="bar-value">{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPieChart = () => {
    let cumulativePercentage = 0;
    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
      <div className="pie-chart">
        <h4>원형 차트</h4>
        <div className="pie-container">
          <svg width="300" height="300" viewBox="0 0 300 300">
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const startAngle = (cumulativePercentage / 100) * 360;
              const endAngle = ((cumulativePercentage + percentage) / 100) * 360;
              
              const startAngleRad = (startAngle * Math.PI) / 180;
              const endAngleRad = (endAngle * Math.PI) / 180;
              
              const x1 = 150 + 100 * Math.cos(startAngleRad);
              const y1 = 150 + 100 * Math.sin(startAngleRad);
              const x2 = 150 + 100 * Math.cos(endAngleRad);
              const y2 = 150 + 100 * Math.sin(endAngleRad);
              
              const largeArcFlag = percentage > 50 ? 1 : 0;
              
              const pathData = [
                `M 150 150`,
                `L ${x1} ${y1}`,
                `A 100 100 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                'Z'
              ].join(' ');

              cumulativePercentage += percentage;

              return (
                <path
                  key={item.name}
                  d={pathData}
                  fill={item.color}
                  stroke="white"
                  strokeWidth="2"
                />
              );
            })}
          </svg>
          <div className="pie-legend">
            {data.map(item => (
              <div key={item.name} className="legend-item">
                <div
                  className="legend-color"
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="chart-component">
      <h3>차트 컴포넌트</h3>
      <div className="chart-controls">
        <button
          className={chartType === 'bar' ? 'active' : ''}
          onClick={() => setChartType('bar')}
        >
          막대 차트
        </button>
        <button
          className={chartType === 'pie' ? 'active' : ''}
          onClick={() => setChartType('pie')}
        >
          원형 차트
        </button>
      </div>
      
      {chartType === 'bar' ? renderBarChart() : renderPieChart()}
    </div>
  );
};

export default ChartComponent;
