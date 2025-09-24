import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User, Post, ApiError } from '../types/api';
import { axiosApiService } from '../services/api';
import './ReactQueryExample.css';

const ReactQueryExample: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState<'users' | 'posts' | 'mutations'>('users');
  const queryClient = useQueryClient();

  // 사용자 목록 쿼리
  const {
    data: users,
    error: usersError,
    isLoading: usersLoading,
    isFetching: usersFetching,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ['users'],
    queryFn: () => axiosApiService.getUsers(),
    staleTime: 5 * 60 * 1000, // 5분
    cacheTime: 10 * 60 * 1000, // 10분
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  // 게시글 목록 쿼리
  const {
    data: posts,
    error: postsError,
    isLoading: postsLoading,
    isFetching: postsFetching,
    refetch: refetchPosts,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: () => axiosApiService.getPosts(),
    staleTime: 2 * 60 * 1000, // 2분
    cacheTime: 5 * 60 * 1000, // 5분
    refetchOnWindowFocus: false,
  });

  // 특정 사용자의 게시글 쿼리 (조건부)
  const {
    data: userPosts,
    error: userPostsError,
    isLoading: userPostsLoading,
    isFetching: userPostsFetching,
    refetch: refetchUserPosts,
  } = useQuery({
    queryKey: ['userPosts', selectedUserId],
    queryFn: () => axiosApiService.getUserPosts(selectedUserId!),
    enabled: !!selectedUserId, // selectedUserId가 있을 때만 실행
    staleTime: 1 * 60 * 1000, // 1분
  });

  // 게시글 생성 뮤테이션
  const createPostMutation = useMutation({
    mutationFn: (newPost: Omit<Post, 'id'>) => axiosApiService.createPost(newPost),
    onSuccess: (newPost) => {
      // 게시글 목록 쿼리 무효화하여 새로고침
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      alert(`게시글이 성공적으로 생성되었습니다! (ID: ${newPost.id})`);
    },
    onError: (error: ApiError) => {
      alert(`게시글 생성 실패: ${error.message}`);
    },
  });

  // 게시글 업데이트 뮤테이션
  const updatePostMutation = useMutation({
    mutationFn: ({ id, post }: { id: number; post: Partial<Post> }) =>
      axiosApiService.updatePost(id, post),
    onSuccess: (updatedPost) => {
      // 게시글 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      // 특정 게시글 쿼리도 무효화
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
      alert(`게시글이 성공적으로 업데이트되었습니다! (ID: ${updatedPost.id})`);
    },
    onError: (error: ApiError) => {
      alert(`게시글 업데이트 실패: ${error.message}`);
    },
  });

  // 게시글 삭제 뮤테이션
  const deletePostMutation = useMutation({
    mutationFn: (id: number) => axiosApiService.deletePost(id),
    onSuccess: (_, deletedId) => {
      // 게시글 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      // 특정 게시글 쿼리도 무효화
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
      alert(`게시글이 성공적으로 삭제되었습니다! (ID: ${deletedId})`);
    },
    onError: (error: ApiError) => {
      alert(`게시글 삭제 실패: ${error.message}`);
    },
  });

  // 에러 처리
  const error = usersError || postsError || userPostsError;
  const isLoading = usersLoading || postsLoading || userPostsLoading;
  const isFetching = usersFetching || postsFetching || userPostsFetching;

  // 사용자 선택 핸들러
  const handleUserSelect = (userId: number) => {
    setSelectedUserId(userId);
    setSelectedTab('posts');
  };

  // 뮤테이션 핸들러들
  const handleCreatePost = () => {
    createPostMutation.mutate({
      userId: 1,
      title: 'React Query로 생성된 게시글',
      body: 'TanStack Query를 사용하여 생성된 게시글입니다.',
    });
  };

  const handleUpdatePost = (postId: number) => {
    updatePostMutation.mutate({
      id: postId,
      post: {
        title: 'React Query로 업데이트된 게시글',
        body: 'TanStack Query를 사용하여 업데이트된 게시글입니다.',
      },
    });
  };

  const handleDeletePost = (postId: number) => {
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      deletePostMutation.mutate(postId);
    }
  };

  const renderUsers = () => {
    if (usersLoading) return <div className="loading">사용자 목록을 불러오는 중...</div>;
    if (usersError) return <div className="error">사용자 목록을 불러오는데 실패했습니다.</div>;
    if (!users) return <div className="loading">사용자 데이터가 없습니다.</div>;

    return (
      <div className="users-section">
        <div className="section-header">
          <h3>사용자 목록</h3>
          <div className="header-actions">
            <button onClick={() => refetchUsers()} disabled={usersLoading}>
              새로고침
            </button>
            {usersFetching && <span className="fetching-indicator">🔄</span>}
          </div>
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
        <div className="query-info">
          <p>⚡ React Query가 데이터를 캐싱하고 자동으로 관리합니다.</p>
          <p>🔄 staleTime: 5분, cacheTime: 10분으로 설정되어 있습니다.</p>
        </div>
      </div>
    );
  };

  const renderPosts = () => {
    const currentPosts = selectedUserId ? userPosts : posts;
    const currentLoading = selectedUserId ? userPostsLoading : postsLoading;
    const currentFetching = selectedUserId ? userPostsFetching : postsFetching;
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
          <div className="header-actions">
            <button 
              onClick={selectedUserId ? refetchUserPosts : refetchPosts} 
              disabled={currentLoading}
            >
              새로고침
            </button>
            {currentFetching && <span className="fetching-indicator">🔄</span>}
          </div>
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
        <div className="query-info">
          <p>🎯 조건부 쿼리로 필요한 데이터만 페칭합니다.</p>
          <p>💾 쿼리 결과를 자동으로 캐싱하고 관리합니다.</p>
        </div>
      </div>
    );
  };

  const renderMutations = () => {
    return (
      <div className="mutations-section">
        <h3>뮤테이션 예제</h3>
        <p>React Query의 useMutation을 사용한 CRUD 작업 예제입니다.</p>

        <div className="mutation-actions">
          <div className="mutation-card">
            <h4>게시글 생성 (POST)</h4>
            <button 
              onClick={handleCreatePost}
              disabled={createPostMutation.isPending}
            >
              {createPostMutation.isPending ? '생성 중...' : '새 게시글 생성'}
            </button>
            {createPostMutation.isError && (
              <p className="error-text">생성 실패: {(createPostMutation.error as ApiError)?.message}</p>
            )}
          </div>

          <div className="mutation-card">
            <h4>게시글 업데이트 (PUT)</h4>
            <p>게시글 목록에서 "수정" 버튼을 클릭하세요.</p>
            {updatePostMutation.isError && (
              <p className="error-text">업데이트 실패: {(updatePostMutation.error as ApiError)?.message}</p>
            )}
          </div>

          <div className="mutation-card">
            <h4>게시글 삭제 (DELETE)</h4>
            <p>게시글 목록에서 "삭제" 버튼을 클릭하세요.</p>
            {deletePostMutation.isError && (
              <p className="error-text">삭제 실패: {(deletePostMutation.error as ApiError)?.message}</p>
            )}
          </div>
        </div>

        <div className="query-info">
          <p>🔄 뮤테이션 성공 시 관련 쿼리가 자동으로 무효화됩니다.</p>
          <p>⚡ 낙관적 업데이트와 롤백을 지원합니다.</p>
        </div>
      </div>
    );
  };

  return (
    <div className="react-query-example">
      <h2>React Query (TanStack Query) 예제</h2>
      <p>TanStack Query를 사용한 고급 데이터 페칭, 캐싱, 동기화 예제입니다.</p>

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
        <button
          className={selectedTab === 'mutations' ? 'active' : ''}
          onClick={() => setSelectedTab('mutations')}
        >
          뮤테이션 예제
        </button>
      </div>

      {error && (
        <div className="error">
          <h3>오류 발생</h3>
          <p>{(error as ApiError).message}</p>
        </div>
      )}

      {isFetching && !isLoading && (
        <div className="fetching">백그라운드에서 데이터를 업데이트하고 있습니다...</div>
      )}

      <div className="content">
        {selectedTab === 'users' && renderUsers()}
        {selectedTab === 'posts' && renderPosts()}
        {selectedTab === 'mutations' && renderMutations()}
      </div>

      <div className="react-query-features">
        <h3>React Query 주요 기능</h3>
        <div className="features-grid">
          <div className="feature-card">
            <h4>🎯 스마트 캐싱</h4>
            <p>staleTime과 cacheTime을 통한 정교한 캐시 관리</p>
          </div>
          <div className="feature-card">
            <h4>🔄 자동 동기화</h4>
            <p>백그라운드에서 자동으로 데이터 동기화</p>
          </div>
          <div className="feature-card">
            <h4>⚡ 뮤테이션</h4>
            <p>서버 상태 변경을 위한 강력한 뮤테이션 시스템</p>
          </div>
          <div className="feature-card">
            <h4>🎨 낙관적 업데이트</h4>
            <p>사용자 경험을 향상시키는 낙관적 업데이트</p>
          </div>
        </div>
      </div>

      <div className="code-example">
        <h3>코드 예제</h3>
        <pre>
{`// React Query 사용 예제
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 쿼리 정의
const {
  data: users,
  error: usersError,
  isLoading: usersLoading,
  isFetching: usersFetching,
  refetch: refetchUsers,
} = useQuery({
  queryKey: ['users'],
  queryFn: () => axiosApiService.getUsers(),
  staleTime: 5 * 60 * 1000,        // 5분
  cacheTime: 10 * 60 * 1000,       // 10분
  refetchOnWindowFocus: true,       // 포커스 시 새로고침
  refetchOnReconnect: true,         // 재연결 시 새로고침
});

// 조건부 쿼리
const {
  data: userPosts,
  error: userPostsError,
  isLoading: userPostsLoading,
} = useQuery({
  queryKey: ['userPosts', selectedUserId],
  queryFn: () => axiosApiService.getUserPosts(selectedUserId!),
  enabled: !!selectedUserId,        // 조건부 실행
  staleTime: 1 * 60 * 1000,        // 1분
});

// 뮤테이션 정의
const createPostMutation = useMutation({
  mutationFn: (newPost: Omit<Post, 'id'>) => 
    axiosApiService.createPost(newPost),
  onSuccess: (newPost) => {
    // 쿼리 무효화로 자동 새로고침
    queryClient.invalidateQueries({ queryKey: ['posts'] });
    alert(\`게시글 생성 완료! (ID: \${newPost.id})\`);
  },
  onError: (error: ApiError) => {
    alert(\`생성 실패: \${error.message}\`);
  },
});

// 뮤테이션 실행
const handleCreatePost = () => {
  createPostMutation.mutate({
    userId: 1,
    title: '새 게시글',
    body: 'React Query로 생성된 게시글입니다.',
  });
};`}
        </pre>
      </div>
    </div>
  );
};

export default ReactQueryExample;
