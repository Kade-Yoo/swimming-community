import React from 'react';

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

interface CommunityPostCardProps {
  post: Post;
  onLike: (id: number) => void;
  onDetail: (post: Post) => void;
  onReport: (id: number) => void;
}

const CommunityPostCard: React.FC<CommunityPostCardProps> = ({ post, onLike, onDetail, onReport }) => {
  return (
    <div
      className="bg-white rounded-xl shadow p-5 md:p-6 flex flex-col gap-2 hover:shadow-2xl hover:-translate-y-1 transition-all border border-transparent hover:border-blue-400 cursor-pointer"
      style={{ minHeight: 120 }}
    >
      <div className="flex-1">
        <div className="text-lg md:text-xl font-semibold text-blue-700 mb-1 truncate" title={post.title}>{post.title}</div>
        <div className="text-xs md:text-sm text-gray-500">{post.author} · {post.date}</div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs md:text-sm text-blue-500 font-bold">댓글 {post.comment}</span>
        <div className="flex items-center gap-2">
          <button className="text-xs md:text-sm text-pink-600 hover:text-pink-700 font-bold flex items-center gap-1" onClick={() => onLike(post.id)} aria-label="좋아요" title="좋아요">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="w-4 h-4 inline"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.343l-6.828-6.829a4 4 0 010-5.656z"/></svg>
            {post.likes || 0}
          </button>
          <button className="text-xs md:text-sm text-blue-600 hover:underline font-semibold" onClick={() => onDetail(post)} aria-label="상세보기" title="상세보기">상세</button>
          <button className="text-xs md:text-sm text-gray-400 hover:text-red-500 font-semibold" onClick={() => onReport(post.id)} aria-label="신고" title="신고">신고</button>
        </div>
      </div>
    </div>
  );
};

export default CommunityPostCard; 