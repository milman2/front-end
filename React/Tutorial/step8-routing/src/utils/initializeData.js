// 초기 사용자 데이터
const SAMPLE_USERS = [
  { id: 123, name: '김개발', email: 'kim@example.com', role: 'developer' },
  { id: 456, name: '이디자인', email: 'lee@example.com', role: 'designer' },
  { id: 789, name: '박기획', email: 'park@example.com', role: 'planner' },
];

// Local Storage에 초기 데이터가 없으면 저장
export const initializeUsers = () => {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(SAMPLE_USERS));
  }
};

// Local Storage에서 사용자 데이터 가져오기
export const getStoredUsers = () => {
  const stored = localStorage.getItem('users');
  return stored ? JSON.parse(stored) : SAMPLE_USERS;
};

// 사용자 데이터 업데이트
export const updateUser = (userId, updatedUser) => {
  const users = getStoredUsers();
  const updatedUsers = users.map(user =>
    user.id === userId ? { ...user, ...updatedUser } : user
  );
  localStorage.setItem('users', JSON.stringify(updatedUsers));
  return updatedUsers.find(user => user.id === userId);
};
