import React, { useState, useEffect } from 'react';
import { User, Post, ApiError } from '../types/api';
import { fetchApiService } from '../services/api';
import './FetchExample.css';

const FetchExample: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // 사용자 목록 가져오기
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchApiService.getUsers();
      setUsers(response.data);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  };

  // 특정 사용자의 게시글 가져오기
  const fetchUserPosts = async (userId: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchApiService.getUserPosts(userId);
      setPosts(response.data);
      setSelectedUserId(userId);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 사용자 목록 가져오기
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="fetch-example">
      <h2>Fetch API 예제</h2>
      <p>네이티브 Fetch API를 사용한 데이터 페칭 예제입니다.</p>

      <div className="controls">
        <button onClick={fetchUsers} disabled={loading}>
          사용자 목록 새로고침
        </button>
      </div>

      {loading && <div className="loading">로딩 중...</div>}

      {error && (
        <div className="error">
          <h3>오류 발생</h3>
          <p>{error.message}</p>
          {error.status && <p>상태 코드: {error.status}</p>}
        </div>
      )}

      <div className="content">
        <div className="users-section">
          <h3>사용자 목록</h3>
          {users.length > 0 ? (
            <div className="users-grid">
              {users.slice(0, 6).map(user => (
                <div
                  key={user.id}
                  className={`user-card ${selectedUserId === user.id ? 'selected' : ''}`}
                  onClick={() => fetchUserPosts(user.id)}
                >
                  <h4>{user.name}</h4>
                  <p>@{user.username}</p>
                  <p>{user.email}</p>
                  <p>{user.company.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>사용자 데이터를 불러오는 중...</p>
          )}
        </div>

        <div className="posts-section">
          <h3>
            {selectedUserId
              ? `사용자 ${selectedUserId}의 게시글`
              : '사용자를 선택하여 게시글을 확인하세요'}
          </h3>
          {posts.length > 0 ? (
            <div className="posts-list">
              {posts.slice(0, 5).map(post => (
                <div key={post.id} className="post-card">
                  <h4>{post.title}</h4>
                  <p>{post.body}</p>
                </div>
              ))}
            </div>
          ) : selectedUserId ? (
            <p>게시글을 불러오는 중...</p>
          ) : (
            <p>사용자를 클릭하여 게시글을 확인하세요.</p>
          )}
        </div>
      </div>

      <div className="code-example">
        <h3>코드 예제</h3>
        <pre>
          {`// Fetch API 사용 예제
const fetchUsers = async () => {
  setLoading(true);
  setError(null);
  
  try {
    const response = await fetchApiService.getUsers();
    setUsers(response.data);
  } catch (err) {
    setError(err as ApiError);
  } finally {
    setLoading(false);
  }
};

// 서비스 클래스 내부
async getUsers(): Promise<ApiResponse<User[]>> {
  return this.request<User[]>('/users');
}

private async request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = \`\${this.baseUrl}\${endpoint}\`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const data = await response.json();
    
    return {
      data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    throw {
      message: error instanceof Error ? error.message : '알 수 없는 오류',
      status: (error as any)?.status,
    } as ApiError;
  }
}`}
        </pre>
      </div>
    </div>
  );
};

export default FetchExample;
