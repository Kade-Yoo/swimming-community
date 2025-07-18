// 커뮤니티 API 유틸 (Mock)

export interface Post {
  id: number;
  title: string;
  author: string;
  date: string;
  comment: number;
  likes: number;
  content: string;
  comments: Comment[];
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
}

// 게시글 목록 조회
export async function getPosts(): Promise<Post[]> {
  // 실제 구현 시 fetch('/api/posts') 등으로 대체
  return Promise.resolve([]); // 임시
}

// 게시글 등록
export async function createPost(data: Omit<Post, 'id' | 'date' | 'comment' | 'likes' | 'comments'>): Promise<Post> {
  // 실제 구현 시 fetch('/api/posts', { method: 'POST', body: ... })
  return Promise.resolve({
    id: Date.now(),
    date: new Date().toISOString().slice(0, 10),
    comment: 0,
    likes: 0,
    comments: [],
    ...data,
  });
}

// 게시글 상세 조회
export async function getPost(id: number): Promise<Post | null> {
  // 실제 구현 시 fetch(`/api/posts/${id}`)
  return Promise.resolve(null); // 임시
}

// 댓글 등록
export async function createComment(postId: number, data: Omit<Comment, 'id' | 'date'>): Promise<Comment> {
  // 실제 구현 시 fetch(`/api/posts/${postId}/comments`, ...)
  return Promise.resolve({
    id: Date.now(),
    date: new Date().toISOString().slice(0, 10),
    ...data,
  });
}

// 좋아요
export async function likePost(postId: number): Promise<void> {
  // 실제 구현 시 fetch(`/api/posts/${postId}/like`, { method: 'POST' })
  return Promise.resolve();
}

// 신고
export async function reportPost(postId: number, reason: string): Promise<void> {
  // 실제 구현 시 fetch(`/api/posts/${postId}/report`, { method: 'POST', body: ... })
  return Promise.resolve();
} 