import React from 'react';
import type { RefObject } from 'react';

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
  comment: number;
  likes: number;
  content: string;
  comments: Comment[];
}

interface CommunityPostModalProps {
  post: Post | null;
  open: boolean;
  onClose: () => void;
  onLike: (id: number) => void;
  onReport: (id: number) => void;
  onCommentSubmit: (e: React.FormEvent) => void;
  commentForm: { author: string; content: string };
  commentError: string;
  loading: boolean;
  commentAuthorRef: RefObject<HTMLInputElement | null>;
  handleCommentChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const CommunityPostModal: React.FC<CommunityPostModalProps> = ({
  post,
  open,
  onClose,
  onLike,
  onReport,
  onCommentSubmit,
  commentForm,
  commentError,
  loading,
  commentAuthorRef,
  handleCommentChange,
}) => {
  if (!open || !post) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md relative animate-fadeIn">
        <h3 className="text-2xl font-bold text-blue-700 mb-2 truncate" title={post.title}>{post.title}</h3>
        <div className="text-xs text-gray-500 mb-4">{post.author} · {post.date} · 댓글 {post.comment}</div>
        <div className="flex items-center gap-3 mb-4">
          <button className="text-pink-600 hover:text-pink-700 font-bold flex items-center gap-1" onClick={() => onLike(post.id)} aria-label="좋아요" title="좋아요">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5 inline"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.343l-6.828-6.829a4 4 0 010-5.656z"/></svg>
            {post.likes || 0}
          </button>
          <button className="text-xs md:text-sm text-gray-400 hover:text-red-500 font-semibold ml-2" onClick={() => onReport(post.id)} aria-label="신고" title="신고">신고</button>
        </div>
        <div className="text-gray-800 mb-6 whitespace-pre-line break-words text-sm md:text-base">{post.content}</div>
        {/* 댓글 리스트 */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-blue-600 mb-2">댓글</h4>
          <div className="space-y-3 max-h-40 overflow-y-auto">
            {(post.comments || []).length === 0 && (
              <div className="text-gray-400 text-sm">아직 댓글이 없습니다.<br/>첫 댓글을 남겨보세요!</div>
            )}
            {(post.comments || []).map((c) => (
              <div key={c.id} className="bg-gray-50 rounded p-2">
                <div className="text-xs text-gray-600 mb-1">{c.author} · {c.date}</div>
                <div className="text-gray-800 text-sm whitespace-pre-line break-words">{c.content}</div>
              </div>
            ))}
          </div>
        </div>
        {/* 댓글 작성 폼 */}
        <form className="mb-2" onSubmit={onCommentSubmit}>
          <div className="flex gap-2 mb-2">
            <input name="author" value={commentForm.author} onChange={handleCommentChange} ref={commentAuthorRef} className="flex-1 border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="작성자" required maxLength={20} />
          </div>
          <div className="flex gap-2 mb-2">
            <textarea name="content" value={commentForm.content} onChange={handleCommentChange} className="flex-1 border rounded px-2 py-1 text-sm h-16 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="댓글을 입력하세요" required maxLength={300} />
          </div>
          {commentError && <div className="text-xs text-red-500 mb-2">{commentError}</div>}
          <button type="submit" className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded text-sm" disabled={loading || !commentForm.author.trim() || !commentForm.content.trim()}>댓글 등록</button>
        </form>
        <button className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 text-xl font-bold" onClick={onClose} aria-label="닫기">×</button>
        <button className="w-full mt-2 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default CommunityPostModal; 