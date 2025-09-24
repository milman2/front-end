import React, { useState, useEffect } from 'react';

interface Report {
  id: number;
  name: string;
  type: string;
  status: 'completed' | 'processing' | 'failed';
  createdAt: string;
  size: string;
}

const Reports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    // 리포트 데이터 로딩 시뮬레이션
    setTimeout(() => {
      const mockReports: Report[] = [
        {
          id: 1,
          name: '월간 사용자 분석 리포트',
          type: 'user_analytics',
          status: 'completed',
          createdAt: '2024-01-15',
          size: '2.3 MB',
        },
        {
          id: 2,
          name: '매출 통계 리포트',
          type: 'sales',
          status: 'completed',
          createdAt: '2024-01-14',
          size: '1.8 MB',
        },
        {
          id: 3,
          name: '시스템 성능 리포트',
          type: 'performance',
          status: 'processing',
          createdAt: '2024-01-15',
          size: '-',
        },
        {
          id: 4,
          name: '보안 감사 리포트',
          type: 'security',
          status: 'failed',
          createdAt: '2024-01-13',
          size: '-',
        },
        {
          id: 5,
          name: '고객 만족도 조사',
          type: 'survey',
          status: 'completed',
          createdAt: '2024-01-12',
          size: '3.1 MB',
        },
      ];
      setReports(mockReports);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredReports = selectedType === 'all' 
    ? reports 
    : reports.filter(report => report.type === selectedType);

  const handleGenerateReport = () => {
    const newReport: Report = {
      id: reports.length + 1,
      name: '새 리포트',
      type: 'custom',
      status: 'processing',
      createdAt: new Date().toISOString().split('T')[0],
      size: '-',
    };
    setReports(prev => [newReport, ...prev]);
    
    // 처리 완료 시뮬레이션
    setTimeout(() => {
      setReports(prev => prev.map(report => 
        report.id === newReport.id 
          ? { ...report, status: 'completed', size: '1.5 MB' }
          : report
      ));
    }, 3000);
  };

  const handleDownload = (reportId: number) => {
    const report = reports.find(r => r.id === reportId);
    if (report && report.status === 'completed') {
      alert(`${report.name} 다운로드를 시작합니다.`);
    }
  };

  const handleDelete = (reportId: number) => {
    if (window.confirm('이 리포트를 삭제하시겠습니까?')) {
      setReports(prev => prev.filter(report => report.id !== reportId));
    }
  };

  if (loading) {
    return (
      <div className="reports">
        <h3>리포트</h3>
        <p>리포트 데이터를 로딩 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="reports">
      <h3>리포트</h3>
      
      <div className="reports-header">
        <div className="report-filters">
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            <option value="all">모든 리포트</option>
            <option value="user_analytics">사용자 분석</option>
            <option value="sales">매출</option>
            <option value="performance">성능</option>
            <option value="security">보안</option>
            <option value="survey">설문조사</option>
          </select>
        </div>
        
        <button className="generate-btn" onClick={handleGenerateReport}>
          새 리포트 생성
        </button>
      </div>

      <div className="reports-stats">
        <div className="stat">
          <span className="stat-value">{reports.length}</span>
          <span className="stat-label">총 리포트</span>
        </div>
        <div className="stat">
          <span className="stat-value">{reports.filter(r => r.status === 'completed').length}</span>
          <span className="stat-label">완료됨</span>
        </div>
        <div className="stat">
          <span className="stat-value">{reports.filter(r => r.status === 'processing').length}</span>
          <span className="stat-label">처리 중</span>
        </div>
        <div className="stat">
          <span className="stat-value">{reports.filter(r => r.status === 'failed').length}</span>
          <span className="stat-label">실패</span>
        </div>
      </div>

      <div className="reports-list">
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>유형</th>
              <th>상태</th>
              <th>생성일</th>
              <th>크기</th>
              <th>액션</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map(report => (
              <tr key={report.id}>
                <td>{report.name}</td>
                <td>
                  <span className={`type-badge type-${report.type}`}>
                    {report.type.replace('_', ' ')}
                  </span>
                </td>
                <td>
                  <span className={`status-badge status-${report.status}`}>
                    {report.status === 'completed' ? '완료' : 
                     report.status === 'processing' ? '처리 중' : '실패'}
                  </span>
                </td>
                <td>{report.createdAt}</td>
                <td>{report.size}</td>
                <td>
                  <div className="action-buttons">
                    {report.status === 'completed' && (
                      <button 
                        className="download-btn"
                        onClick={() => handleDownload(report.id)}
                      >
                        다운로드
                      </button>
                    )}
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(report.id)}
                    >
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="report-templates">
        <h4>리포트 템플릿</h4>
        <div className="template-grid">
          <div className="template-card">
            <h5>사용자 분석</h5>
            <p>사용자 행동 및 통계 분석</p>
            <button>템플릿 사용</button>
          </div>
          <div className="template-card">
            <h5>매출 리포트</h5>
            <p>매출 및 수익 분석</p>
            <button>템플릿 사용</button>
          </div>
          <div className="template-card">
            <h5>성능 모니터링</h5>
            <p>시스템 성능 및 메트릭</p>
            <button>템플릿 사용</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
