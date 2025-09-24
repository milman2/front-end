import React, { useState, useEffect } from 'react';

interface TableData {
  id: number;
  name: string;
  email: string;
  department: string;
  salary: number;
  joinDate: string;
}

const DataTable: React.FC = () => {
  const [data, setData] = useState<TableData[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<keyof TableData>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    // 데이터 로딩 시뮬레이션
    setTimeout(() => {
      const mockData: TableData[] = Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        name: `사용자 ${index + 1}`,
        email: `user${index + 1}@company.com`,
        department: ['개발팀', '디자인팀', '마케팅팀', '영업팀'][index % 4],
        salary: Math.floor(Math.random() * 5000000) + 3000000,
        joinDate: new Date(
          2020 + Math.floor(Math.random() * 4),
          Math.floor(Math.random() * 12),
          Math.floor(Math.random() * 28) + 1
        ).toLocaleDateString(),
      }));
      setData(mockData);
      setLoading(false);
    }, 1500);
  }, []);

  const handleSort = (field: keyof TableData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    }

    return 0;
  });

  if (loading) {
    return (
      <div className="data-table">
        <h3>데이터 테이블</h3>
        <p>데이터를 로딩 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="data-table">
      <h3>데이터 테이블</h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('id')}>
                ID {sortField === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('name')}>
                이름 {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('email')}>
                이메일 {sortField === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('department')}>
                부서 {sortField === 'department' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('salary')}>
                급여 {sortField === 'salary' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('joinDate')}>
                입사일 {sortField === 'joinDate' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.department}</td>
                <td>{row.salary.toLocaleString()}원</td>
                <td>{row.joinDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
