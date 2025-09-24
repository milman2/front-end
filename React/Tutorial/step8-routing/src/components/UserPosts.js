import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './UserPosts.css';
import { getStoredUsers } from '../utils/initializeData';

// 샘플 게시글 데이터
const SAMPLE_POSTS = [
  {
    id: 1,
    userId: 123,
    title: 'React Hook 완벽 가이드',
    content: 'React Hook의 모든 것을 알아보는 포괄적인 가이드입니다.',
    date: '2024-01-15',
    likes: 42,
    category: 'React',
  },
  {
    id: 2,
    userId: 123,
    title: 'JavaScript ES6+ 문법 정리',
    content: '모던 JavaScript의 핵심 문법들을 정리했습니다.',
    date: '2024-01-10',
    likes: 28,
    category: 'JavaScript',
  },
  {
    id: 3,
    userId: 456,
    title: 'UI/UX 디자인 원칙',
    content: '사용자 경험을 향상시키는 디자인 원칙들을 소개합니다.',
    date: '2024-01-12',
    likes: 35,
    category: 'Design',
  },
  {
    id: 4,
    userId: 789,
    title: '프로젝트 관리 방법론',
    content: '효율적인 프로젝트 관리를 위한 다양한 방법론을 다룹니다.',
    date: '2024-01-08',
    likes: 19,
    category: 'Management',
  },
];

function UserPosts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const user = getStoredUsers().find(u => u.id === parseInt(id));

  useEffect(() => {
    // 실제로는 API 호출
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const userPosts = SAMPLE_POSTS.filter(
          post => post.userId === parseInt(id)
        );
        setPosts(userPosts);
      } catch (error) {
        // 에러 처리 (실제로는 사용자에게 알림)
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [id]);

  if (!user) {
    return (
      <div className='user-posts'>
        <div className='error'>
          <h2>사용자를 찾을 수 없습니다</h2>
          <p>요청하신 사용자가 존재하지 않습니다.</p>
          <button onClick={() => navigate('/')} className='back-button'>
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const filteredPosts =
    filter === 'all'
      ? posts
      : posts.filter(
          post => post.category.toLowerCase() === filter.toLowerCase()
        );

  const handlePostClick = postId => {
    navigate(`/user/${id}/post/${postId}`);
  };

  const getCategoryColor = category => {
    const colors = {
      React: '#61dafb',
      JavaScript: '#f7df1e',
      Design: '#e91e63',
      Management: '#4caf50',
    };
    return colors[category] || '#6c757d';
  };

  if (isLoading) {
    return (
      <div className='user-posts'>
        <div className='loading'>
          <h2>{user.name}님의 게시글</h2>
          <p>게시글을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='user-posts'>
      <h2>{user.name}님의 게시글</h2>
      <p>총 {posts.length}개의 게시글이 있습니다.</p>

      <div className='filters'>
        <h3>카테고리 필터</h3>
        <div className='filter-buttons'>
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            전체
          </button>
          <button
            className={filter === 'react' ? 'active' : ''}
            onClick={() => setFilter('react')}
          >
            React
          </button>
          <button
            className={filter === 'javascript' ? 'active' : ''}
            onClick={() => setFilter('javascript')}
          >
            JavaScript
          </button>
          <button
            className={filter === 'design' ? 'active' : ''}
            onClick={() => setFilter('design')}
          >
            Design
          </button>
          <button
            className={filter === 'management' ? 'active' : ''}
            onClick={() => setFilter('management')}
          >
            Management
          </button>
        </div>
      </div>

      <div className='posts-list'>
        {filteredPosts.length === 0 ? (
          <div className='no-posts'>
            <p>해당 카테고리의 게시글이 없습니다.</p>
          </div>
        ) : (
          filteredPosts.map(post => (
            <div
              key={post.id}
              className='post-card'
              onClick={() => handlePostClick(post.id)}
            >
              <div className='post-header'>
                <h4>{post.title}</h4>
                <span
                  className='category-badge'
                  style={{ backgroundColor: getCategoryColor(post.category) }}
                >
                  {post.category}
                </span>
              </div>
              <p className='post-content'>{post.content}</p>
              <div className='post-meta'>
                <span className='post-date'>{post.date}</span>
                <span className='post-likes'>❤️ {post.likes}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className='navigation'>
        <button onClick={() => navigate(`/user/${id}`)} className='back-button'>
          프로필로 돌아가기
        </button>
        <button onClick={() => navigate(-1)} className='back-button'>
          이전 페이지로
        </button>
        <Link to='/' className='home-link'>
          홈으로
        </Link>
      </div>

      <div className='code-example'>
        <strong>중첩 라우팅과 데이터 페칭:</strong>
        <br />
        <pre
          style={{
            background: '#f8f9fa',
            padding: '15px',
            borderRadius: '6px',
            overflow: 'auto',
            fontSize: '14px',
            fontFamily: 'monospace',
            border: '1px solid #e9ecef',
            margin: '10px 0',
          }}
        >
          {`// App.js에서 중첩 라우팅 설정
<Route path="/user/:id" element={<UserProfile />}>
  <Route path="posts" element={<UserPosts />} />
  <Route path="post/:postId" element={<PostDetail />} />
</Route>

// UserPosts.js에서 데이터 페칭
function UserPosts() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(\`/api/users/\${id}/posts\`);
        const data = await response.json();
        setPosts(data);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPosts();
  }, [id]);
  
  return <div>...</div>;
}`}
        </pre>
      </div>
    </div>
  );
}

export default UserPosts;
