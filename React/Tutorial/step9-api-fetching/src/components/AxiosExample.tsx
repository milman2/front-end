import React, { useState, useEffect } from 'react';
import { User, Post, Todo, ApiError } from '../types/api';
import { axiosApiService } from '../services/api';
import './AxiosExample.css';

const AxiosExample: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [selectedTab, setSelectedTab] = useState<'users' | 'posts' | 'todos'>('users');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // 사용자 목록 가져오기
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const usersData = await axiosApiService.getUsers();
      setUsers(usersData);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  };

  // 게시글 목록 가져오기
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const postsData = await axiosApiService.getPosts();
      setPosts(postsData);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  };

  // 할 일 목록 가져오기
  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const todosData = await axiosApiService.getTodos();
      setTodos(todosData);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  };

  // 특정 사용자의 할 일 가져오기
  const fetchUserTodos = async (userId: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const userTodos = await axiosApiService.getUserTodos(userId);
      setTodos(userTodos);
      setSelectedUserId(userId);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  };

  // 새 게시글 생성 (POST 요청 예제)
  const createPost = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const newPost = await axiosApiService.createPost({
        userId: 1,
        title: '새로운 게시글',
        body: 'Axios를 사용하여 생성된 게시글입니다.',
      });
      
      setPosts(prev => [newPost, ...prev]);
      alert('게시글이 성공적으로 생성되었습니다!');
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  };

  // 게시글 업데이트 (PUT 요청 예제)
  const updatePost = async (postId: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedPost = await axiosApiService.updatePost(postId, {
        title: '업데이트된 게시글',
        body: 'Axios를 사용하여 업데이트된 게시글입니다.',
      });
      
      setPosts(prev => prev.map(post => 
        post.id === postId ? updatedPost : post
      ));
      alert('게시글이 성공적으로 업데이트되었습니다!');
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  };

  // 게시글 삭제 (DELETE 요청 예제)
  const deletePost = async (postId: number) => {
    if (!window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      await axiosApiService.deletePost(postId);
      setPosts(prev => prev.filter(post => post.id !== postId));
      alert('게시글이 성공적으로 삭제되었습니다!');
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

  const renderContent = () => {
    switch (selectedTab) {
      case 'users':
        return (
          <div className="users-section">
            <h3>사용자 목록</h3>
            {users.length > 0 ? (
              <div className="users-grid">
                {users.slice(0, 6).map((user) => (
                  <div
                    key={user.id}
                    className={`user-card ${selectedUserId === user.id ? 'selected' : ''}`}
                    onClick={() => fetchUserTodos(user.id)}
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
        );

      case 'posts':
        return (
          <div className="posts-section">
            <div className="posts-header">
              <h3>게시글 목록</h3>
              <button onClick={createPost} disabled={loading}>
                새 게시글 생성
              </button>
            </div>
            {posts.length > 0 ? (
              <div className="posts-list">
                {posts.slice(0, 5).map((post) => (
                  <div key={post.id} className="post-card">
                    <h4>{post.title}</h4>
                    <p>{post.body}</p>
                    <div className="post-actions">
                      <button onClick={() => updatePost(post.id)}>
                        수정
                      </button>
                      <button onClick={() => deletePost(post.id)}>
                        삭제
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>게시글을 불러오는 중...</p>
            )}
          </div>
        );

      case 'todos':
        return (
          <div className="todos-section">
            <h3>
              {selectedUserId 
                ? `사용자 ${selectedUserId}의 할 일` 
                : '전체 할 일 목록'
              }
            </h3>
            {todos.length > 0 ? (
              <div className="todos-list">
                {todos.slice(0, 10).map((todo) => (
                  <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      readOnly
                    />
                    <span>{todo.title}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>할 일을 불러오는 중...</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="axios-example">
      <h2>Axios API 예제</h2>
      <p>Axios 라이브러리를 사용한 데이터 페칭 및 CRUD 작업 예제입니다.</p>

      <div className="controls">
        <button onClick={fetchUsers} disabled={loading}>
          사용자 새로고침
        </button>
        <button onClick={fetchPosts} disabled={loading}>
          게시글 새로고침
        </button>
        <button onClick={fetchTodos} disabled={loading}>
          할 일 새로고침
        </button>
      </div>

      <div className="tabs">
        <button
          className={selectedTab === 'users' ? 'active' : ''}
          onClick={() => setSelectedTab('users')}
        >
          사용자
        </button>
        <button
          className={selectedTab === 'posts' ? 'active' : ''}
          onClick={() => setSelectedTab('posts')}
        >
          게시글
        </button>
        <button
          className={selectedTab === 'todos' ? 'active' : ''}
          onClick={() => setSelectedTab('todos')}
        >
          할 일
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
        {renderContent()}
      </div>

      <div className="code-example">
        <h3>코드 예제</h3>
        <pre>
{`// Axios 사용 예제
const fetchUsers = async () => {
  setLoading(true);
  setError(null);
  
  try {
    const usersData = await axiosApiService.getUsers();
    setUsers(usersData);
  } catch (err) {
    setError(err as ApiError);
  } finally {
    setLoading(false);
  }
};

// POST 요청 (게시글 생성)
const createPost = async () => {
  try {
    const newPost = await axiosApiService.createPost({
      userId: 1,
      title: '새로운 게시글',
      body: 'Axios를 사용하여 생성된 게시글입니다.',
    });
    setPosts(prev => [newPost, ...prev]);
  } catch (err) {
    setError(err as ApiError);
  }
};

// PUT 요청 (게시글 수정)
const updatePost = async (postId: number) => {
  try {
    const updatedPost = await axiosApiService.updatePost(postId, {
      title: '업데이트된 게시글',
      body: 'Axios를 사용하여 업데이트된 게시글입니다.',
    });
    setPosts(prev => prev.map(post => 
      post.id === postId ? updatedPost : post
    ));
  } catch (err) {
    setError(err as ApiError);
  }
};

// DELETE 요청 (게시글 삭제)
const deletePost = async (postId: number) => {
  try {
    await axiosApiService.deletePost(postId);
    setPosts(prev => prev.filter(post => post.id !== postId));
  } catch (err) {
    setError(err as ApiError);
  }
};`}
        </pre>
      </div>
    </div>
  );
};

export default AxiosExample;
