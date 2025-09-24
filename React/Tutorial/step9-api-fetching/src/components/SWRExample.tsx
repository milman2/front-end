import React, { useState } from 'react';
import useSWR from 'swr';
import { User, Post, ApiError } from '../types/api';
import { axiosApiService } from '../services/api';
import './SWRExample.css';

// SWR fetcher 함수
const fetcher = (url: string) => {
  if (url.includes('/users')) {
    return axiosApiService.getUsers();
  }
  if (url.includes('/posts')) {
    return axiosApiService.getPosts();
  }
  if (url.includes('/posts?userId=')) {
    const userId = url.split('userId=')[1];
    return axiosApiService.getUserPosts(parseInt(userId));
  }
  return Promise.reject(new Error('Unknown endpoint'));
};

const SWRExample: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState<'users' | 'posts'>('users');

  // SWR을 사용한 데이터 페칭
  const {
    data: users,
    error: usersError,
    isLoading: usersLoading,
    mutate: mutateUsers,
  } = useSWR<User[]>('/users', fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshInterval: 30000, // 30초마다 자동 새로고침
  });

  const {
    data: posts,
    error: postsError,
    isLoading: postsLoading,
    mutate: mutatePosts,
  } = useSWR<Post[]>('/posts', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });

  const {
    data: userPosts,
    error: userPostsError,
    isLoading: userPostsLoading,
    mutate: mutateUserPosts,
  } = useSWR<Post[]>(
    selectedUserId ? `/posts?userId=${selectedUserId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  // 에러 처리
  const error = usersError || postsError || userPostsError;
  const isLoading = usersLoading || postsLoading || userPostsLoading;

  // 수동 새로고침 함수들
  const refreshUsers = () => {
    mutateUsers();
  };

  const refreshPosts = () => {
    mutatePosts();
  };

  const refreshUserPosts = () => {
    if (selectedUserId) {
      mutateUserPosts();
    }
  };

  // 사용자 선택 핸들러
  const handleUserSelect = (userId: number) => {
    setSelectedUserId(userId);
    setSelectedTab('posts');
  };

  const renderUsers = () => {
    if (usersLoading) return <div className="loading">사용자 목록을 불러오는 중...</div>;
    if (usersError) return <div className="error">사용자 목록을 불러오는데 실패했습니다.</div>;
    if (!users) return <div className="loading">사용자 데이터가 없습니다.</div>;

    return (
      <div className="users-section">
        <div className="section-header">
          <h3>사용자 목록</h3>
          <button onClick={refreshUsers} disabled={usersLoading}>
            새로고침
          </button>
        </div>
        <div className="users-grid">
          {users.slice(0, 6).map((user) => (
            <div
              key={user.id}
              className={`user-card ${selectedUserId === user.id ? 'selected' : ''}`}
              onClick={() => handleUserSelect(user.id)}
            >
              <h4>{user.name}</h4>
              <p>@{user.username}</p>
              <p>{user.email}</p>
              <p>{user.company.name}</p>
            </div>
          ))}
        </div>
        <div className="swr-info">
          <p>🔄 SWR이 자동으로 데이터를 캐싱하고 30초마다 새로고침합니다.</p>
          <p>💾 포커스 시 자동 새로고침이 활성화되어 있습니다.</p>
        </div>
      </div>
    );
  };

  const renderPosts = () => {
    const currentPosts = selectedUserId ? userPosts : posts;
    const currentLoading = selectedUserId ? userPostsLoading : postsLoading;
    const currentError = selectedUserId ? userPostsError : postsError;

    if (currentLoading) {
      return (
        <div className="loading">
          {selectedUserId ? '사용자 게시글을 불러오는 중...' : '게시글 목록을 불러오는 중...'}
        </div>
      );
    }

    if (currentError) {
      return (
        <div className="error">
          {selectedUserId ? '사용자 게시글을 불러오는데 실패했습니다.' : '게시글 목록을 불러오는데 실패했습니다.'}
        </div>
      );
    }

    if (!currentPosts) {
      return <div className="loading">게시글 데이터가 없습니다.</div>;
    }

    return (
      <div className="posts-section">
        <div className="section-header">
          <h3>
            {selectedUserId 
              ? `사용자 ${selectedUserId}의 게시글` 
              : '전체 게시글 목록'
            }
          </h3>
          <button 
            onClick={selectedUserId ? refreshUserPosts : refreshPosts} 
            disabled={currentLoading}
          >
            새로고침
          </button>
        </div>
        <div className="posts-list">
          {currentPosts.slice(0, 5).map((post) => (
            <div key={post.id} className="post-card">
              <h4>{post.title}</h4>
              <p>{post.body}</p>
              <div className="post-meta">
                <span>사용자 ID: {post.userId}</span>
                <span>게시글 ID: {post.id}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="swr-info">
          <p>⚡ SWR이 데이터를 캐싱하여 빠른 로딩을 제공합니다.</p>
          <p>🔄 백그라운드에서 자동으로 데이터를 업데이트합니다.</p>
        </div>
      </div>
    );
  };

  return (
    <div className="swr-example">
      <h2>SWR (Stale-While-Revalidate) 예제</h2>
      <p>SWR을 사용한 데이터 페칭, 캐싱, 자동 새로고침 예제입니다.</p>

      <div className="tabs">
        <button
          className={selectedTab === 'users' ? 'active' : ''}
          onClick={() => setSelectedTab('users')}
        >
          사용자 목록
        </button>
        <button
          className={selectedTab === 'posts' ? 'active' : ''}
          onClick={() => setSelectedTab('posts')}
        >
          게시글 목록
        </button>
      </div>

      {error && (
        <div className="error">
          <h3>오류 발생</h3>
          <p>{(error as ApiError).message}</p>
        </div>
      )}

      <div className="content">
        {selectedTab === 'users' ? renderUsers() : renderPosts()}
      </div>

      <div className="swr-features">
        <h3>SWR 주요 기능</h3>
        <div className="features-grid">
          <div className="feature-card">
            <h4>🔄 자동 새로고침</h4>
            <p>포커스 시, 네트워크 재연결 시, 주기적으로 자동 새로고침</p>
          </div>
          <div className="feature-card">
            <h4>💾 스마트 캐싱</h4>
            <p>데이터를 캐싱하여 빠른 로딩과 네트워크 요청 최적화</p>
          </div>
          <div className="feature-card">
            <h4>⚡ 백그라운드 업데이트</h4>
            <p>사용자 경험을 해치지 않으면서 백그라운드에서 데이터 업데이트</p>
          </div>
          <div className="feature-card">
            <h4>🎯 조건부 페칭</h4>
            <p>조건에 따라 데이터 페칭을 제어할 수 있음</p>
          </div>
        </div>
      </div>

      <div className="code-example">
        <h3>코드 예제</h3>
        <pre>
{`// SWR 사용 예제
import useSWR from 'swr';

// Fetcher 함수 정의
const fetcher = (url: string) => {
  if (url.includes('/users')) {
    return axiosApiService.getUsers();
  }
  if (url.includes('/posts')) {
    return axiosApiService.getPosts();
  }
  return Promise.reject(new Error('Unknown endpoint'));
};

// SWR 훅 사용
const {
  data: users,
  error: usersError,
  isLoading: usersLoading,
  mutate: mutateUsers,
} = useSWR<User[]>('/users', fetcher, {
  revalidateOnFocus: true,        // 포커스 시 새로고침
  revalidateOnReconnect: true,    // 네트워크 재연결 시 새로고침
  refreshInterval: 30000,         // 30초마다 자동 새로고침
});

// 조건부 페칭
const {
  data: userPosts,
  error: userPostsError,
  isLoading: userPostsLoading,
} = useSWR<Post[]>(
  selectedUserId ? \`/posts?userId=\${selectedUserId}\` : null, // null이면 페칭하지 않음
  fetcher,
  {
    revalidateOnFocus: false,
  }
);

// 수동 새로고침
const refreshUsers = () => {
  mutateUsers();
};`}
        </pre>
      </div>
    </div>
  );
};

export default SWRExample;
