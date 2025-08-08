// 커뮤니티 API 유틸

export interface Post {
  id: number;
  title: string;
  author: string;
  date: string;
  comments: number;
  likes: number;
  content: string;
  category: string;
  views: number;
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  category: string;
  author: string;
}

export interface CreateCommentRequest {
  author: string;
  content: string;
}

// API 기본 설정
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// 공통 fetch 함수
async function apiRequest<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
}

// 게시글 목록 조회
export async function getPosts(page: number = 1, size: number = 20): Promise<Post[]> {
  try {
    return await apiRequest<Post[]>(`/posts?page=${page}&size=${size}`);
  } catch (error) {
    console.warn('API 호출 실패, 더미 데이터 사용:', error);
    // API 실패 시 더미 데이터 반환
    return generateDummyPosts();
  }
}

// 게시글 상세 조회
export async function getPost(id: number): Promise<Post | null> {
  try {
    return await apiRequest<Post>(`/posts/${id}`);
  } catch (error) {
    console.warn('게시글 상세 조회 실패:', error);
    return null;
  }
}

// 게시글 등록
export async function createPost(data: CreatePostRequest): Promise<Post> {
  try {
    return await apiRequest<Post>('/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('게시글 등록 실패:', error);
    throw error;
  }
}

// 댓글 등록
export async function createComment(postId: number, data: CreateCommentRequest): Promise<Comment> {
  try {
    return await apiRequest<Comment>(`/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('댓글 등록 실패:', error);
    throw error;
  }
}

// 좋아요
export async function likePost(postId: number): Promise<void> {
  try {
    await apiRequest(`/posts/${postId}/like`, {
      method: 'POST',
    });
  } catch (error) {
    console.error('좋아요 실패:', error);
    throw error;
  }
}

// 신고
export async function reportPost(postId: number, reason: string): Promise<void> {
  try {
    await apiRequest(`/posts/${postId}/report`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  } catch (error) {
    console.error('신고 실패:', error);
    throw error;
  }
}

// 게시글 수정
export async function updatePost(id: number, data: Partial<CreatePostRequest>): Promise<Post> {
  try {
    return await apiRequest<Post>(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('게시글 수정 실패:', error);
    throw error;
  }
}

// 게시글 삭제
export async function deletePost(id: number): Promise<void> {
  try {
    await apiRequest(`/posts/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('게시글 삭제 실패:', error);
    throw error;
  }
}

// 게시글 검색
export async function searchPosts(query: string, category?: string): Promise<Post[]> {
  try {
    const params = new URLSearchParams({ q: query });
    if (category) params.append('category', category);
    
    return await apiRequest<Post[]>(`/posts/search?${params.toString()}`);
  } catch (error) {
    console.warn('검색 실패, 로컬 필터링 사용:', error);
    throw error;
  }
}

// 더미 데이터 생성 함수
function generateDummyPosts(): Post[] {
  const categories = ['일반', '질문', '기술', '정보', '후기'];
  const titles = [
    '오늘 수영 연습 어땠나요?',
    '스타트 자세 어떻게 해요?',
    '평영 킥이 너무 어려워요',
    '접영 팔 동작 팁',
    '수영장 추천 좀 해주세요',
    '자유형 호흡 팁',
    '수영복 구매 후기',
    '대회 준비 방법',
    '수영 강사 추천',
    '수영장 시설 비교'
  ];
  
  return Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    title: titles[index % titles.length],
    author: `user${Math.floor(Math.random() * 20) + 1}`,
    date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    content: `이것은 ${index + 1}번째 게시글의 내용입니다. 수영에 대한 다양한 이야기를 나눠보세요.`,
    likes: Math.floor(Math.random() * 50),
    comments: Math.floor(Math.random() * 20),
    views: Math.floor(Math.random() * 200) + 50,
    category: categories[Math.floor(Math.random() * categories.length)]
  }));
}

// 사용자 인증 관련 API
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

// 로그인
export async function login(data: LoginRequest): Promise<AuthResponse> {
  try {
    return await apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('로그인 실패:', error);
    throw error;
  }
}

// 회원가입
export async function register(data: RegisterRequest): Promise<AuthResponse> {
  try {
    return await apiRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('회원가입 실패:', error);
    throw error;
  }
}

// 토큰을 헤더에 포함하는 함수
export function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// 인증이 필요한 API 요청을 위한 헬퍼 함수
export async function authenticatedApiRequest<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  return apiRequest<T>(endpoint, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  });
} 