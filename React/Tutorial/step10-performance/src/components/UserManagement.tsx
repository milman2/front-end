import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  useEffect(() => {
    // 사용자 데이터 로딩 시뮬레이션
    setTimeout(() => {
      const mockUsers: User[] = Array.from({ length: 20 }, (_, index) => ({
        id: index + 1,
        name: `사용자 ${index + 1}`,
        email: `user${index + 1}@example.com`,
        role: ['admin', 'user', 'moderator'][index % 3],
        status: Math.random() > 0.2 ? 'active' : 'inactive',
        lastLogin: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      }));
      setUsers(mockUsers);
      setLoading(false);
    }, 800);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleStatusToggle = (userId: number) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  if (loading) {
    return (
      <div className="user-management">
        <h3>사용자 관리</h3>
        <p>사용자 데이터를 로딩 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="user-management">
      <h3>사용자 관리</h3>
      
      <div className="user-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="사용자 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-box">
          <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
            <option value="all">모든 역할</option>
            <option value="admin">관리자</option>
            <option value="user">사용자</option>
            <option value="moderator">모더레이터</option>
          </select>
        </div>
      </div>

      <div className="user-stats">
        <div className="stat">
          <span className="stat-value">{users.length}</span>
          <span className="stat-label">총 사용자</span>
        </div>
        <div className="stat">
          <span className="stat-value">{users.filter(u => u.status === 'active').length}</span>
          <span className="stat-label">활성 사용자</span>
        </div>
        <div className="stat">
          <span className="stat-value">{users.filter(u => u.role === 'admin').length}</span>
          <span className="stat-label">관리자</span>
        </div>
      </div>

      <div className="user-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>이름</th>
              <th>이메일</th>
              <th>역할</th>
              <th>상태</th>
              <th>마지막 로그인</th>
              <th>액션</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge role-${user.role}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`status-badge status-${user.status}`}>
                    {user.status === 'active' ? '활성' : '비활성'}
                  </span>
                </td>
                <td>{user.lastLogin}</td>
                <td>
                  <button
                    className={`toggle-btn ${user.status === 'active' ? 'deactivate' : 'activate'}`}
                    onClick={() => handleStatusToggle(user.id)}
                  >
                    {user.status === 'active' ? '비활성화' : '활성화'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
