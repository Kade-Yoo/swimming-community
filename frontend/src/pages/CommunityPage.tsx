import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import CommunityPostCard from '../components/CommunityPostCard';
import CommunityPostModal from '../components/CommunityPostModal';
import ReportModal from '../components/ReportModal';
import WritePostModal from '../components/WritePostModal';
import Snackbar from '../components/PostCard';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { getPosts, createPost, createComment, likePost, reportPost } from '../utils/api';

const communityPosts = [
  {
    id: 1,
    title: "오늘 수영 연습 어땠나요?",
    author: "user1",
    date: "2024-07-18",
    content: "오늘 자유형 연습을 했는데 호흡 타이밍이 많이 좋아진 것 같아요! 여러분은 어떤 연습을 하셨나요?",
    likes: 15,
    comments: 8,
    views: 156,
    category: "일반"
  },
  {
    id: 2,
    title: "스타트 자세 어떻게 해요?",
    author: "user2", 
    date: "2024-07-17",
    content: "수영 시작할 때 스타트 자세가 너무 어려워요. 다이빙할 때 물에 제대로 들어가는 방법을 알려주세요!",
    likes: 12,
    comments: 15,
    views: 203,
    category: "질문"
  },
  {
    id: 3,
    title: "수영장 실력을 언어적으로다",
    author: "user3",
    date: "2024-07-16", 
    content: "평영 킥이 너무 어려워요. 발목을 어떻게 써야 하는지 감이 안 잡혀요. 팁 좀 주세요!",
    likes: 8,
    comments: 12,
    views: 189,
    category: "기술"
  },
  {
    id: 4,
    title: "명의 뒤차기 요령을 찾습니다",
    author: "user4",
    date: "2024-07-15",
    content: "접영을 배우고 있는데 팔 동작이 너무 힘들어요. 어깨에 무리가 가지 않게 하는 방법이 있을까요?",
    likes: 6,
    comments: 9,
    views: 142,
    category: "기술"
  }
];

const initialPosts = [
  { id: 1, title: '오늘 수영 연습 어땠나요?', author: 'user1', date: '2024-07-18', comment: 3, content: '오늘 자유형 연습에서 기록이 많이 단축됐어요! 여러분은 어떠셨나요?', comments: [
    { id: 1, author: 'user2', content: '저도 오늘 기록 단축했어요!', date: '2024-07-18' },
    { id: 2, author: 'user3', content: '축하드려요!', date: '2024-07-18' },
    { id: 3, author: 'user4', content: '저는 아직 멀었네요 ㅠㅠ', date: '2024-07-18' },
  ], likes: 2 },
  { id: 2, title: '스타트가 너무 아찔해요--.', author: 'user2', date: '2024-07-17', comment: 5, content: '스타트 연습할 때 팁 있으신 분? 자꾸 미끄러져요.', comments: [
    { id: 1, author: 'user1', content: '발에 힘을 더 주세요!', date: '2024-07-17' },
    { id: 2, author: 'user3', content: '저도 같은 고민이 있어요.', date: '2024-07-17' },
  ], likes: 1 },
  { id: 3, title: '수영적 실체를 얻어졌습니다', author: 'user3', date: '2024-07-16', comment: 2, content: '수영하면서 느낀 점, 공유해봅니다.', comments: [], likes: 0 },
  { id: 4, title: '땡의 뒷차기 오일탑 황워드집니다', author: 'user4', date: '2024-07-15', comment: 0, content: '오늘 연습에서 있었던 에피소드입니다.', comments: [], likes: 0 },
];

const PAGE_SIZE = 6;

const CommunityPage: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<typeof posts[0] | null>(null);
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const [form, setForm] = useState({ title: '', author: '', content: '' });
  const [commentForm, setCommentForm] = useState({ author: '', content: '' });
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'latest' | 'likes' | 'comments'>('latest');
  const [reportOpen, setReportOpen] = useState<{ postId: number | null, fromModal: boolean }>({ postId: null, fromModal: false });
  const [reportReason, setReportReason] = useState('');
  const [page, setPage] = useState(1);
  const [visiblePosts, setVisiblePosts] = useState<typeof posts>([]);
  const loader = useRef<HTMLDivElement | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean, message: string }>({ open: false, message: '' });
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [commentError, setCommentError] = useState('');
  const [reportError, setReportError] = useState('');
  const writeTitleRef = useRef<HTMLInputElement | null>(null);
  const commentAuthorRef = useRef<HTMLInputElement | null>(null);
  const reportTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [showPostForm, setShowPostForm] = useState(false);
  const [posts, setPosts] = useState(communityPosts);

  // 모달 바깥 클릭/ESC 닫기, 스크롤 잠금
  const modalBgRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedPost) setSelectedPost(null);
        if (isWriteOpen) setIsWriteOpen(false);
        if (reportOpen.postId !== null) { setReportOpen({ postId: null, fromModal: false }); setReportReason(''); }
      }
    };
    if (selectedPost || isWriteOpen || reportOpen.postId !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPost, isWriteOpen, reportOpen]);

  // 글쓰기 모달 오픈 시 제목 자동 포커스
  useEffect(() => {
    if (isWriteOpen && writeTitleRef.current) {
      writeTitleRef.current.focus();
    }
  }, [isWriteOpen]);

  // 댓글 모달 오픈 시 작성자 자동 포커스
  useEffect(() => {
    if (selectedPost && commentAuthorRef.current) {
      commentAuthorRef.current.focus();
    }
  }, [selectedPost]);

  // 신고 모달 오픈 시 textarea 자동 포커스
  useEffect(() => {
    if (reportOpen.postId !== null && reportTextareaRef.current) {
      reportTextareaRef.current.focus();
    }
  }, [reportOpen]);

  // 게시글 목록 불러오기 (API 구조)
  useEffect(() => {
    setLoading(true);
    getPosts()
      .then(data => setPosts(data.length ? data : communityPosts)) // 실제 API 없으므로 더미 데이터 fallback
      .finally(() => setLoading(false));
  }, []);

  const handleModalBgClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, closeFn: () => void) => {
    if (e.target === e.currentTarget) closeFn();
  };

  const handleWrite = () => {
    setForm({ title: '', author: '', content: '' });
    setIsWriteOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setFormError('');
  };

  // 스낵바 표시 함수
  const showSnackbar = (message: string) => {
    setSnackbar({ open: true, message });
    setTimeout(() => setSnackbar({ open: false, message: '' }), 2000);
  };

  // 글쓰기 등록
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.author.trim() || !form.content.trim()) {
      setFormError('모든 항목을 입력해 주세요.');
      return;
    }
    setFormError('');
    setLoading(true);
    createPost({ title: form.title, author: form.author, content: form.content , category: '', views: 0})
      .then(newPost => {
        setPosts([newPost, ...posts]);
        setIsWriteOpen(false);
        showSnackbar('글이 등록되었습니다!');
      })
      .finally(() => setLoading(false));
  };

  // 댓글 입력 핸들러
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCommentForm(prev => ({ ...prev, [name]: value }));
    setCommentError('');
  };

  // 댓글 등록
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPost || !commentForm.author.trim() || !commentForm.content.trim()) {
      setCommentError('작성자와 댓글을 모두 입력해 주세요.');
      return;
    }
    setCommentError('');
    setLoading(true);
    createComment(selectedPost.id, { author: commentForm.author, content: commentForm.content })
      .then(newComment => {
        const updatedPosts = posts.map(post => {
          if (post.id === selectedPost.id) {
            return {
              ...post,
              comments: [, newComment],
            };
          }
          return post;
        });
        setPosts([]);
        setSelectedPost(null);
        setCommentForm({ author: '', content: '' });
        showSnackbar('댓글이 등록되었습니다!');
      })
      .finally(() => setLoading(false));
  };

  // 좋아요 핸들러
  const handleLike = (id: number) => {
    setLoading(true);
    likePost(id)
      .then(() => {
        setPosts(posts.map(p => p.id === id ? { ...p, likes: (p.likes || 0) + 1 } : p));
        if (selectedPost && selectedPost.id === id) {
          setSelectedPost({ ...selectedPost, likes: (selectedPost.likes || 0) + 1 });
        }
      })
      .finally(() => setLoading(false));
  };

  // 신고 제출
  const handleReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportReason.trim()) {
      setReportError('신고 사유를 입력해 주세요.');
      return;
    }
    setReportError('');
    setLoading(true);
    if (reportOpen.postId === null) return;
    reportPost(reportOpen.postId, reportReason)
      .then(() => {
        setReportOpen({ postId: null, fromModal: false });
        setReportReason('');
        showSnackbar('신고가 접수되었습니다. 감사합니다.');
      })
      .finally(() => setLoading(false));
  };

  // 검색 필터링 (useMemo로 최적화)
  const filteredPosts = useMemo(() => posts.filter(
    p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.content.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase())
  ), [posts, search]);


  // 검색/정렬 변경 시 1페이지로 초기화
  useEffect(() => {
    setPage(1);
  }, [search, sort]);

  const categories = ['전체', '일반', '질문', '기술', '정보', '후기'];
  const handleAddPost = (newPost: any) => {
    const post = {
      id: posts.length + 1,
      ...newPost,
      author: 'user' + (posts.length + 1),
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      comments: 0,
      views: 0
    };
    setPosts([post, ...posts]);
    setShowPostForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <main className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">커뮤니티</h1>
            <p className="text-xl text-gray-600">수영에 대한 모든 이야기를 나눠보세요</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'} px-4 py-2 rounded-full transition-colors whitespace-nowrap cursor-pointer`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setShowPostForm(true)}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all whitespace-nowrap cursor-pointer flex items-center gap-2"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-add-line"></i>
                </div>
                글쓰기
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {showPostForm && (
        <PostForm 
          onClose={() => setShowPostForm(false)}
          onSubmit={handleAddPost}
        />
      )}
    </div>
  );
};

export default CommunityPage; 