import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './PostDetail.css';

// 샘플 게시글 데이터
const SAMPLE_POSTS = [
  {
    id: 1,
    userId: 123,
    title: 'React Hook 완벽 가이드',
    content:
      'React Hook의 모든 것을 알아보는 포괄적인 가이드입니다. useState, useEffect, useContext 등 다양한 Hook의 사용법과 실제 프로젝트에서의 활용 방법을 자세히 설명합니다.',
    date: '2024-01-15',
    likes: 42,
    category: 'React',
    author: '김개발',
    views: 156,
    comments: [
      {
        id: 1,
        author: '이디자인',
        content: '정말 유용한 정보네요!',
        date: '2024-01-16',
      },
      {
        id: 2,
        author: '박기획',
        content: 'Hook 사용법이 명확해졌습니다.',
        date: '2024-01-17',
      },
    ],
  },
  {
    id: 2,
    userId: 123,
    title: 'JavaScript ES6+ 문법 정리',
    content:
      '모던 JavaScript의 핵심 문법들을 정리했습니다. Arrow Function, Destructuring, Template Literals, Spread Operator 등 ES6+의 주요 기능들을 예제와 함께 설명합니다.',
    date: '2024-01-10',
    likes: 28,
    category: 'JavaScript',
    author: '김개발',
    views: 89,
    comments: [
      {
        id: 1,
        author: '이디자인',
        content: 'ES6 문법이 이제 이해됩니다!',
        date: '2024-01-11',
      },
    ],
  },
  {
    id: 3,
    userId: 456,
    title: 'UI/UX 디자인 원칙',
    content:
      '사용자 경험을 향상시키는 디자인 원칙들을 소개합니다. 접근성, 일관성, 피드백, 사용성 등 UX 디자인의 핵심 요소들을 실제 사례와 함께 설명합니다.',
    date: '2024-01-12',
    likes: 35,
    category: 'Design',
    author: '이디자인',
    views: 124,
    comments: [
      {
        id: 1,
        author: '김개발',
        content: '디자인 원칙이 명확해졌어요!',
        date: '2024-01-13',
      },
      {
        id: 2,
        author: '박기획',
        content: '실무에 바로 적용할 수 있겠네요.',
        date: '2024-01-14',
      },
    ],
  },
  {
    id: 4,
    userId: 789,
    title: '프로젝트 관리 방법론',
    content:
      '효율적인 프로젝트 관리를 위한 다양한 방법론을 다룹니다. Agile, Scrum, Kanban 등 현대적인 프로젝트 관리 방법론의 특징과 적용 방법을 설명합니다.',
    date: '2024-01-08',
    likes: 19,
    category: 'Management',
    author: '박기획',
    views: 67,
    comments: [],
  },
];

function PostDetail() {
  const { id, postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        // 실제로는 API 호출
        await new Promise(resolve => setTimeout(resolve, 1000));
        const foundPost = SAMPLE_POSTS.find(p => p.id === parseInt(postId));
        setPost(foundPost);
        setComments(foundPost?.comments || []);
      } catch (error) {
        console.error('게시글을 불러오는데 실패했습니다:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleLike = () => {
    if (post) {
      setPost(prev => ({ ...prev, likes: prev.likes + 1 }));
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: '익명',
        content: newComment,
        date: new Date().toLocaleDateString(),
      };
      setComments(prev => [...prev, comment]);
      setNewComment('');
    }
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
      <div className='post-detail'>
        <div className='loading'>
          <h2>게시글을 불러오는 중...</h2>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className='post-detail'>
        <div className='error'>
          <h2>게시글을 찾을 수 없습니다</h2>
          <p>요청하신 게시글이 존재하지 않습니다.</p>
          <button
            onClick={() => navigate(`/user/${id}/posts`)}
            className='back-button'
          >
            게시글 목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='post-detail'>
      <div className='post-header'>
        <div className='post-meta'>
          <span
            className='category-badge'
            style={{ backgroundColor: getCategoryColor(post.category) }}
          >
            {post.category}
          </span>
          <span className='post-date'>{post.date}</span>
          <span className='post-views'>👁️ {post.views}</span>
        </div>
        <h1>{post.title}</h1>
        <div className='post-author'>
          <span className='author-name'>{post.author}</span>
        </div>
      </div>

      <div className='post-content'>
        <p>{post.content}</p>
      </div>

      <div className='post-actions'>
        <button onClick={handleLike} className='like-button'>
          ❤️ {post.likes}
        </button>
        <button
          onClick={() => navigate(`/user/${id}/posts`)}
          className='back-button'
        >
          목록으로
        </button>
        <button onClick={() => navigate(-1)} className='back-button'>
          이전 페이지로
        </button>
      </div>

      <div className='comments-section'>
        <h3>댓글 ({comments.length})</h3>

        <div className='add-comment'>
          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder='댓글을 작성해주세요...'
            rows={3}
          />
          <button onClick={handleAddComment} className='comment-button'>
            댓글 작성
          </button>
        </div>

        <div className='comments-list'>
          {comments.length === 0 ? (
            <p className='no-comments'>아직 댓글이 없습니다.</p>
          ) : (
            comments.map(comment => (
              <div key={comment.id} className='comment'>
                <div className='comment-header'>
                  <span className='comment-author'>{comment.author}</span>
                  <span className='comment-date'>{comment.date}</span>
                </div>
                <p className='comment-content'>{comment.content}</p>
              </div>
            ))
          )}
        </div>
      </div>

      <div className='navigation'>
        <Link to='/' className='home-link'>
          홈으로
        </Link>
      </div>

      <div className='code-example'>
        <strong>중첩 라우팅과 게시글 상세 보기:</strong>
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

// PostDetail.js에서 게시글 상세 정보 표시
function PostDetail() {
  const { id, postId } = useParams();
  const [post, setPost] = useState(null);
  
  useEffect(() => {
    const fetchPost = async () => {
      const foundPost = posts.find(p => p.id === parseInt(postId));
      setPost(foundPost);
    };
    fetchPost();
  }, [postId]);
  
  return <div>{post?.title}</div>;
}`}
        </pre>
      </div>
    </div>
  );
}

export default PostDetail;
