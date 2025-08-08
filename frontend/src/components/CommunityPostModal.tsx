import React, { useState, useRef, useEffect } from 'react';

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
  category: string;
  views: number;
}

interface CommunityPostModalProps {
  post: Post | null;
  open: boolean;
  onClose: () => void;
  onLike: (id: number) => void;
  onReport: (id: number) => void;
  onCommentSubmit: (postId: number, comment: Omit<Comment, 'id' | 'date'>) => void;
  loading: boolean;
}

const CommunityPostModal: React.FC<CommunityPostModalProps> = ({
  post,
  open,
  onClose,
  onLike,
  onReport,
  onCommentSubmit,
  loading
}) => {
  const [commentForm, setCommentForm] = useState({ author: '', content: '' });
  const [commentError, setCommentError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const commentAuthorRef = useRef<HTMLInputElement>(null);
  const commentContentRef = useRef<HTMLTextAreaElement>(null);

  // 모달이 열릴 때 댓글 작성자 필드에 포커스
  useEffect(() => {
    if (open && commentAuthorRef.current) {
      setTimeout(() => commentAuthorRef.current?.focus(), 100);
    }
  }, [open]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };
    
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCommentForm(prev => ({ ...prev, [name]: value }));
    setCommentError('');
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentForm.author.trim() || !commentForm.content.trim()) {
      setCommentError('작성자와 댓글 내용을 모두 입력해주세요.');
      return;
    }

    if (!post) return;

    setSubmitting(true);
    setCommentError('');

    try {
      await onCommentSubmit(post.id, {
        author: commentForm.author.trim(),
        content: commentForm.content.trim()
      });
      
      // 폼 초기화
      setCommentForm({ author: '', content: '' });
      if (commentContentRef.current) {
        commentContentRef.current.focus();
      }
    } catch (error) {
      setCommentError('댓글 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!open || !post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-950/40 dark:bg-blue-950/50 backdrop-blur-md p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold truncate" title={post.title}>{post.title}</h3>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
          </div>
        </div>

        {/* 내용 */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm text-gray-500">{post.author} • {post.date}</span>
              <span className="text-sm text-gray-500">조회 {post.views}</span>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <button 
                className="text-pink-600 hover:text-pink-700 font-bold flex items-center gap-1 transition-colors" 
                onClick={() => onLike(post.id)}
                disabled={loading}
              >
                <i className="ri-heart-line text-xl"></i>
                <span>{post.likes || 0}</span>
              </button>
              <button 
                className="text-gray-400 hover:text-red-500 font-semibold transition-colors" 
                onClick={() => onReport(post.id)}
              >
                신고
              </button>
            </div>
            
            <div className="text-gray-800 whitespace-pre-line break-words text-base leading-relaxed">
              {post.content}
            </div>
          </div>

          {/* 댓글 섹션 */}
          <div className="border-t pt-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <i className="ri-message-3-line text-blue-600"></i>
              댓글 ({post.comments?.length || 0})
            </h4>
            
            {/* 댓글 목록 */}
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
              {(!post.comments || post.comments.length === 0) ? (
                <div className="text-center py-8 text-gray-500">
                  <i className="ri-message-3-line text-4xl mb-2 block"></i>
                  <p>아직 댓글이 없습니다.</p>
                  <p className="text-sm">첫 댓글을 남겨보세요!</p>
                </div>
              ) : (
                post.comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-800">{comment.author}</span>
                        <span className="text-xs text-gray-500">{comment.date}</span>
                      </div>
                    </div>
                    <div className="text-gray-700 whitespace-pre-line break-words">
                      {comment.content}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* 댓글 작성 폼 */}
            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    작성자
                  </label>
                  <input
                    ref={commentAuthorRef}
                    name="author"
                    type="text"
                    value={commentForm.author}
                    onChange={handleCommentChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="이름을 입력하세요"
                    maxLength={20}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    댓글
                  </label>
                  <textarea
                    ref={commentContentRef}
                    name="content"
                    value={commentForm.content}
                    onChange={handleCommentChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                    placeholder="댓글을 입력하세요"
                    maxLength={500}
                    required
                  />
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {commentForm.content.length}/500
                  </div>
                </div>
              </div>
              
              {commentError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <i className="ri-error-warning-line text-red-400"></i>
                    <span className="text-sm text-red-700">{commentError}</span>
                  </div>
                </div>
              )}
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  닫기
                </button>
                <button
                  type="submit"
                  disabled={submitting || !commentForm.author.trim() || !commentForm.content.trim()}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      등록 중...
                    </div>
                  ) : (
                    '댓글 등록'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPostModal; 