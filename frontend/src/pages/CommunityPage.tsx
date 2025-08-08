import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import CommunityPostCard from '../components/CommunityPostCard';
import CommunityPostModal from '../components/CommunityPostModal';
import Snackbar from '../components/Snackbar';
import PostForm from '../components/PostForm';
import AdvancedSearch from '../components/AdvancedSearch';
import type { SearchFilter } from '../components/AdvancedSearch';
import type { Post as ApiPost } from '../utils/api';
import { getPosts } from '../utils/api';

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
}

interface Post {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
  likes: number;
  comment: number;
  views: number;
  category: string;
  comments: Comment[];
  
}

// API Post를 컴포넌트 Post로 변환하는 함수
const convertApiPostToComponentPost = (apiPost: ApiPost): Post => ({
  ...apiPost,
  comment: apiPost.comments,
  comments: []
});

// 더 많은 더미 데이터 생성
const generateMorePosts = (startId: number, count: number): Post[] => {
  const categories = ['일반', '질문', '기술', '정보', '후기'];
  const titles = [
    '수영장 추천 좀 해주세요',
    '자유형 호흡 팁',
    '수영복 구매 후기',
    '대회 준비 방법',
    '수영 강사 추천',
    '수영장 시설 비교',
    '개인 기록 갱신',
    '수영 동호회 모집',
    '수영장 이용 팁',
    '수영 장비 리뷰'
  ];
  
  return Array.from({ length: count }, (_, index) => ({
    id: startId + index,
    title: titles[Math.floor(Math.random() * titles.length)],
    author: `user${Math.floor(Math.random() * 20) + 1}`,
    date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    content: `이것은 ${startId + index}번째 게시글의 내용입니다. 수영에 대한 다양한 이야기를 나눠보세요.`,
    likes: Math.floor(Math.random() * 50),
    comment: Math.floor(Math.random() * 20),
    views: Math.floor(Math.random() * 200) + 50,
    category: categories[Math.floor(Math.random() * categories.length)],
    comments: []
  }));
};

const communityPosts: Post[] = [
  {
    id: 1,
    title: "오늘 수영 연습 어땠나요?",
    author: "user1",
    date: "2024-07-18",
    content: "오늘 자유형 연습을 했는데 호흡 타이밍이 많이 좋아진 것 같아요! 여러분은 어떤 연습을 하셨나요?",
    likes: 15,
    comment: 8,
    views: 156,
    category: "일반",
    comments: [
      { id: 1, author: "user2", content: "저도 오늘 자유형 연습했어요! 호흡이 정말 중요하죠.", date: "2024-07-18" },
      { id: 2, author: "user3", content: "평영 연습했는데 킥이 어려워요 ㅠㅠ", date: "2024-07-18" }
    ]
  },
  {
    id: 2,
    title: "스타트 자세 어떻게 해요?",
    author: "user2", 
    date: "2024-07-17",
    content: "수영 시작할 때 스타트 자세가 너무 어려워요. 다이빙할 때 물에 제대로 들어가는 방법을 알려주세요!",
    likes: 12,
    comment: 15,
    views: 203,
    category: "질문",
    comments: [
      { id: 3, author: "user1", content: "발에 힘을 더 주시면 됩니다!", date: "2024-07-17" },
      { id: 4, author: "user4", content: "저도 같은 고민이 있어요. 팁 감사합니다!", date: "2024-07-17" }
    ]
  },
  {
    id: 3,
    title: "평영 킥이 너무 어려워요",
    author: "user3",
    date: "2024-07-16", 
    content: "평영 킥이 너무 어려워요. 발목을 어떻게 써야 하는지 감이 안 잡혀요. 팁 좀 주세요!",
    likes: 8,
    comment: 12,
    views: 189,
    category: "기술",
    comments: [
      { id: 5, author: "user1", content: "발목을 자연스럽게 펴서 킥하세요!", date: "2024-07-16" }
    ]
  },
  {
    id: 4,
    title: "접영 팔 동작 팁",
    author: "user4",
    date: "2024-07-15",
    content: "접영을 배우고 있는데 팔 동작이 너무 힘들어요. 어깨에 무리가 가지 않게 하는 방법이 있을까요?",
    likes: 6,
    comment: 9,
    views: 142,
    category: "기술",
    comments: []
  }
];

const CommunityPage: React.FC = () => {
  const [allPosts, setAllPosts] = useState<Post[]>(communityPosts);
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  // 제거: 미사용 상태값
  const [showPostForm, setShowPostForm] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [selectedCategory] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'likes' | 'comments' | 'views'>('latest');
  const [snackbar, setSnackbar] = useState<{ open: boolean, message: string }>({ open: false, message: '' });
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchFilter, setSearchFilter] = useState<SearchFilter>({
    keyword: '',
    category: 'all',
    dateRange: 'all',
    author: '',
    tags: [],
    sortBy: 'relevance',
    sortOrder: 'desc'
  });
  
  const loaderRef = useRef<HTMLDivElement>(null);
  const POSTS_PER_PAGE = 10;

  // 스낵바 표시 함수
  const showSnackbar = (message: string) => {
    setSnackbar({ open: true, message });
    setTimeout(() => setSnackbar({ open: false, message: '' }), 2000);
  };

  // 게시글 목록 불러오기
  useEffect(() => {
    setLoading(true);
    getPosts()
      .then(data => {
        if (data && data.length > 0) {
          const convertedPosts = data.map(convertApiPostToComponentPost);
          setAllPosts(convertedPosts);
        } else {
          // 더 많은 더미 데이터 추가
          const morePosts = generateMorePosts(5, 50);
          setAllPosts([...communityPosts, ...morePosts]);
        }
      })
      .catch(() => {
        // API 실패 시 더미 데이터 사용
        const morePosts = generateMorePosts(5, 50);
        setAllPosts([...communityPosts, ...morePosts]);
      })
      .finally(() => setLoading(false));
  }, []);

  // 고급 검색 처리
  const handleAdvancedSearch = useCallback((filter: SearchFilter) => {
    setSearchFilter(filter);
    setSearchTerm(filter.keyword);
    setCurrentPage(1);
    
    // 필터링된 게시글 생성
    let filtered = [...allPosts];
    
    // 키워드 검색
    if (filter.keyword) {
      const keyword = filter.keyword.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(keyword) ||
        post.content.toLowerCase().includes(keyword) ||
        post.author.toLowerCase().includes(keyword)
      );
    }
    
    // 카테고리 필터
    if (filter.category !== 'all') {
      filtered = filtered.filter(post => post.category === filter.category);
    }
    
    // 작성자 필터
    if (filter.author) {
      filtered = filtered.filter(post => 
        post.author.toLowerCase().includes(filter.author.toLowerCase())
      );
    }
    
    // 태그 필터
    if (filter.tags.length > 0) {
      filtered = filtered.filter(post => 
        filter.tags.some(tag => 
          post.title.toLowerCase().includes(tag.toLowerCase()) ||
          post.content.toLowerCase().includes(tag.toLowerCase())
        )
      );
    }
    
    // 날짜 범위 필터
    if (filter.dateRange !== 'all') {
      const now = new Date();
      let cutoffDate: Date;
      
      switch (filter.dateRange) {
        case 'today':
          cutoffDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case 'week':
          cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          cutoffDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
          break;
        case 'year':
          cutoffDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
          break;
        default:
          cutoffDate = new Date(0);
      }
      
      filtered = filtered.filter(post => new Date(post.date) >= cutoffDate);
    }
    
    // 정렬
    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0;
      
      switch (filter.sortBy) {
        case 'date':
          comparison = new Date(b.date).getTime() - new Date(a.date).getTime();
          break;
        case 'likes':
          comparison = b.likes - a.likes;
          break;
        case 'comments':
          comparison = b.comment - a.comment;
          break;
        case 'views':
          comparison = b.views - a.views;
          break;
        case 'relevance':
        default:
          // 키워드 매칭 점수 기반 정렬
          const aScore = getRelevanceScore(a, filter.keyword);
          const bScore = getRelevanceScore(b, filter.keyword);
          comparison = bScore - aScore;
          break;
      }
      
      return filter.sortOrder === 'asc' ? -comparison : comparison;
    });
    
    setDisplayedPosts(sorted.slice(0, POSTS_PER_PAGE));
    setHasMore(sorted.length > POSTS_PER_PAGE);
  }, [allPosts]);

  // 관련도 점수 계산
  const getRelevanceScore = (post: Post, keyword: string): number => {
    if (!keyword) return 0;
    
    const k = keyword.toLowerCase();
    let score = 0;
    
    // 제목에 키워드가 있으면 높은 점수
    if (post.title.toLowerCase().includes(k)) score += 10;
    
    // 내용에 키워드가 있으면 점수
    if (post.content.toLowerCase().includes(k)) score += 5;
    
    // 작성자에 키워드가 있으면 점수
    if (post.author.toLowerCase().includes(k)) score += 3;
    
    return score;
  };

  // 검색 및 카테고리 필터링 (메모이즈)
  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      const matchesCategory = selectedCategory === '전체' || post.category === selectedCategory;
      const matchesSearch = searchTerm === '' ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [allPosts, selectedCategory, searchTerm]);

  // 정렬 (메모이즈)
  const sortedPosts = useMemo(() => {
    const list = [...filteredPosts];
    return list.sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'likes':
          return (b.likes || 0) - (a.likes || 0);
        case 'comments':
          return (b.comments?.length || 0) - (a.comments?.length || 0);
        case 'views':
          return (b.views || 0) - (a.views || 0);
        default:
          return 0;
      }
    });
  }, [filteredPosts, sortBy]);

  // 페이지별 게시글 표시
  useEffect(() => {
    const startIndex = 0;
    const endIndex = currentPage * POSTS_PER_PAGE;
    setDisplayedPosts(sortedPosts.slice(startIndex, endIndex));
    setHasMore(endIndex < sortedPosts.length);
  }, [sortedPosts, currentPage]);

  // 무한 스크롤 감지
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !loadingMore) {
      setLoadingMore(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setLoadingMore(false);
      }, 500);
    }
  }, [hasMore, loadingMore]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0.1
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [handleObserver]);

  // 검색이나 필터 변경 시 페이지 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy]);

  // 새 게시글 추가
  const handleAddPost = (newPost: any) => {
    const post: Post = {
      id: allPosts.length + 1,
      ...newPost,
      author: 'user' + (allPosts.length + 1),
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      comment: 0,
      views: 0,
      comments: []
    };
    setAllPosts([post, ...allPosts]);
    setShowPostForm(false);
    showSnackbar('글이 등록되었습니다!');
  };

  // 좋아요 핸들러
  const handleLike = (id: number) => {
    setAllPosts(allPosts.map(p => p.id === id ? { ...p, likes: (p.likes || 0) + 1 } : p));
    if (selectedPost && selectedPost.id === id) {
      setSelectedPost({ ...selectedPost, likes: (selectedPost.likes || 0) + 1 });
    }
  };

  // 신고 핸들러
  const handleReport = (_id: number) => {
    showSnackbar('신고가 접수되었습니다.');
  };

  // 댓글 추가 핸들러
  const handleCommentSubmit = async (postId: number, commentData: Omit<Comment, 'id' | 'date'>) => {
    try {
      // 실제 API 호출 (현재는 모의)
      const newComment: Comment = {
        id: Date.now(),
        ...commentData,
        date: new Date().toISOString().split('T')[0]
      };

      // 게시글 목록 업데이트
      setAllPosts(allPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...(post.comments || []), newComment],
            comment: (post.comment || 0) + 1
          };
        }
        return post;
      }));

      // 선택된 게시글도 업데이트
      if (selectedPost && selectedPost.id === postId) {
        setSelectedPost({
          ...selectedPost,
          comments: [...(selectedPost.comments || []), newComment],
          comment: (selectedPost.comment || 0) + 1
        });
      }

      showSnackbar('댓글이 등록되었습니다!');
    } catch (error) {
      throw new Error('댓글 등록에 실패했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            수영 커뮤니티
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            수영에 대한 이야기를 나누고 정보를 공유해보세요
          </p>
        </div>

        {/* 검색 및 필터 영역 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* 기본 검색 */}
            <div className="flex-1">
              <div className="relative">
                <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="게시글 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* 정렬 */}
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="latest">최신순</option>
                <option value="likes">좋아요순</option>
                <option value="comments">댓글순</option>
                <option value="views">조회순</option>
              </select>
              
              {/* 고급 검색 버튼 */}
              <button
                onClick={() => setShowAdvancedSearch(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <i className="ri-filter-3-line"></i>
                고급 검색
              </button>
            </div>
          </div>

          {/* 활성 필터 표시 */}
          {(searchFilter.keyword || searchFilter.category !== 'all' || searchFilter.dateRange !== 'all' || searchFilter.author || searchFilter.tags.length > 0) && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <i className="ri-filter-3-line text-blue-600 dark:text-blue-400"></i>
                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">활성 필터:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {searchFilter.keyword && (
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs rounded">
                    검색어: {searchFilter.keyword}
                  </span>
                )}
                {searchFilter.category !== 'all' && (
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs rounded">
                    카테고리: {searchFilter.category}
                  </span>
                )}
                {searchFilter.author && (
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs rounded">
                    작성자: {searchFilter.author}
                  </span>
                )}
                {searchFilter.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs rounded">
                    태그: {tag}
                  </span>
                ))}
                <button
                  onClick={() => {
                    setSearchFilter({
                      keyword: '',
                      category: 'all',
                      dateRange: 'all',
                      author: '',
                      tags: [],
                      sortBy: 'relevance',
                      sortOrder: 'desc'
                    });
                    setSearchTerm('');
                  }}
                  className="px-2 py-1 bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200 text-xs rounded hover:bg-red-200 dark:hover:bg-red-700"
                >
                  필터 초기화
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 게시글 작성 버튼 */}
        <div className="mb-6">
          <button
            onClick={() => setShowPostForm(true)}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 flex items-center gap-2 shadow-lg"
          >
            <i className="ri-add-line"></i>
            게시글 작성
          </button>
        </div>

        {/* 게시글 목록 */}
        <div className="space-y-4">
          {displayedPosts.map((post) => (
            <CommunityPostCard
              key={post.id}
              post={post}
              onLike={handleLike}
              onDetail={setSelectedPost}
              onReport={handleReport}

            />
          ))}
        </div>

        {/* 무한 스크롤 로더 */}
        {hasMore && (
          <div ref={loaderRef} className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* 더 이상 게시글이 없을 때 */}
        {!hasMore && displayedPosts.length > 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <i className="ri-inbox-line text-4xl mb-2"></i>
            <p>모든 게시글을 불러왔습니다.</p>
          </div>
        )}

        {/* 게시글이 없을 때 */}
        {displayedPosts.length === 0 && !loading && (
          <div className="text-center py-12">
            <i className="ri-file-list-3-line text-6xl text-gray-300 dark:text-gray-600 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              게시글이 없습니다
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              첫 번째 게시글을 작성해보세요!
            </p>
          </div>
        )}
      </div>

      {/* 모달들 */}
      {selectedPost && (
        <CommunityPostModal
          post={selectedPost}
          open={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          onLike={handleLike}
          onReport={handleReport}
          onCommentSubmit={handleCommentSubmit}
          loading={loading}
        />
      )}

      {showPostForm && (
        <PostForm
          onClose={() => setShowPostForm(false)}
          onSubmit={handleAddPost}
        />
      )}

      {showAdvancedSearch && (
        <AdvancedSearch
          isOpen={showAdvancedSearch}
          onClose={() => setShowAdvancedSearch(false)}
          onSearch={handleAdvancedSearch}
          initialFilter={searchFilter}
        />
      )}

      {/* 스낵바 */}
      {snackbar && (
        <Snackbar
          open={true}
          message={snackbar.message}
        />
      )}
    </div>
  );
};

export default CommunityPage; 