import React, { useState, useRef, useEffect, useCallback } from 'react';
import CommunityPostCard from '../components/CommunityPostCard';
import CommunityPostModal from '../components/CommunityPostModal';
import ReportModal from '../components/ReportModal';
import WritePostModal from '../components/WritePostModal';
import Snackbar from '../components/Snackbar';
import { getPosts, createPost, createComment, likePost, reportPost } from '../utils/api';

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
  const [posts, setPosts] = useState<typeof initialPosts>([]);
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
      .then(data => setPosts(data.length ? data : initialPosts)) // 실제 API 없으므로 더미 데이터 fallback
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
    createPost({ title: form.title, author: form.author, content: form.content })
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
              comments: [...(post.comments || []), newComment],
              comment: (post.comment || 0) + 1,
            };
          }
          return post;
        });
        setPosts(updatedPosts);
        setSelectedPost(prev => prev ? {
          ...prev,
          comments: [...(prev.comments || []), newComment],
          comment: (prev.comment || 0) + 1,
        } : null);
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

  // 검색 필터링
  const filteredPosts = posts.filter(
    p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.content.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase())
  );

  // 정렬
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sort === 'latest') return b.date.localeCompare(a.date);
    if (sort === 'likes') return (b.likes || 0) - (a.likes || 0);
    if (sort === 'comments') return (b.comment || 0) - (a.comment || 0);
    return 0;
  });

  // 페이지네이션
  const totalPages = Math.ceil(sortedPosts.length / PAGE_SIZE) || 1;

  // 무한 스크롤: visiblePosts 관리
  useEffect(() => {
    setVisiblePosts(sortedPosts.slice(0, PAGE_SIZE * page));
  }, [sortedPosts, page]);

  // 검색/정렬 변경 시 1페이지로 초기화
  useEffect(() => {
    setPage(1);
  }, [search, sort]);

  // Intersection Observer로 마지막 요소 감지
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && page < totalPages) {
      setPage(prev => prev + 1);
    }
  }, [page, totalPages]);

  useEffect(() => {
    const option = { root: null, rootMargin: '20px', threshold: 1.0 };
    const observer = new window.IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    return () => { if (loader.current) observer.unobserve(loader.current); };
  }, [handleObserver]);

  return (
    <div className="flex-1 w-full h-full bg-gray-50 py-10">
      <div className="w-full px-2 md:px-8">
        {/* SWIMMERGY 커뮤니티 상단 배너 */}
        <div className="w-full bg-gradient-to-r from-cyan-700 to-blue-900 text-white py-8 px-2 md:px-4 rounded-xl mb-8 text-center shadow">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2 tracking-tight">SWIMMERGY 커뮤니티</h2>
          <p className="text-base md:text-lg font-medium opacity-90">수영에 대한 모든 이야기, 자유롭게 나누세요!</p>
        </div>
        {/* 검색/정렬 입력창 */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="제목, 본문, 작성자 검색"
            className="w-full md:w-80 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
          <div className="flex gap-2 items-center">
            <span className="text-sm text-gray-500">정렬:</span>
            <select
              value={sort}
              onChange={e => setSort(e.target.value as 'latest' | 'likes' | 'comments')}
              className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="latest">최신순</option>
              <option value="likes">좋아요순</option>
              <option value="comments">댓글순</option>
            </select>
          </div>
        </div>
        {/* 게시글 리스트 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {visiblePosts.length === 0 && (
            <div className="col-span-2 text-center text-gray-400 py-12 text-base md:text-lg">아직 게시글이 없습니다.<br/>첫 글을 작성해보세요!</div>
          )}
          {visiblePosts.map((post, idx) => (
            <CommunityPostCard
              key={post.id}
              post={post}
              onLike={handleLike}
              onDetail={setSelectedPost}
              onReport={id => setReportOpen({ postId: id, fromModal: false })}
            />
          ))}
        </div>
        {/* 무한 스크롤 로더 */}
        {visiblePosts.length < sortedPosts.length && (
          <div ref={loader} className="flex justify-center py-8 text-gray-400">
            {loading ? (
              <svg className="animate-spin h-6 w-6 text-blue-400" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
            ) : '더 불러오는 중...'}
          </div>
        )}
        <div className="flex justify-end mt-8">
          <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow" onClick={handleWrite}>글쓰기</button>
        </div>
      </div>
      {/* 상세 모달 */}
      <CommunityPostModal
        post={selectedPost}
        open={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        onLike={handleLike}
        onReport={id => setReportOpen({ postId: id, fromModal: true })}
        onCommentSubmit={handleCommentSubmit}
        commentForm={commentForm}
        commentError={commentError}
        loading={loading}
        commentAuthorRef={commentAuthorRef}
        handleCommentChange={handleCommentChange}
      />
      {/* 신고 모달 */}
      <ReportModal
        open={reportOpen.postId !== null}
        onClose={() => { setReportOpen({ postId: null, fromModal: false }); setReportReason(''); setReportError(''); }}
        onSubmit={handleReport}
        loading={loading}
        error={reportError}
        value={reportReason}
        onChange={e => { setReportReason(e.target.value); setReportError(''); }}
        textareaRef={reportTextareaRef}
      />
      {/* 글쓰기 모달 */}
      <WritePostModal
        open={isWriteOpen}
        onClose={() => { setIsWriteOpen(false); setFormError(''); }}
        onSubmit={handleSubmit}
        loading={loading}
        error={formError}
        value={form}
        onChange={handleFormChange}
        titleRef={writeTitleRef}
      />
      {/* 스낵바 */}
      <Snackbar open={snackbar.open} message={snackbar.message} />
    </div>
  );
};

export default CommunityPage; 