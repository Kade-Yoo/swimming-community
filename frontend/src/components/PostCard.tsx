
'use client';

interface Post {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
  likes: number;
  comments: number;
  views: number;
  category: string;
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full font-medium">
              {post.category}
            </span>
            <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
              {post.title}
            </h3>
          </div>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {post.content}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{post.author}</span>
            <span>{post.date}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between border-t pt-4">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors cursor-pointer">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-heart-line"></i>
            </div>
            <span className="text-sm">{post.likes}</span>
          </button>
          <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors cursor-pointer">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-chat-3-line"></i>
            </div>
            <span className="text-sm">{post.comments}</span>
          </button>
          <div className="flex items-center gap-1 text-gray-500">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-eye-line"></i>
            </div>
            <span className="text-sm">{post.views}</span>
          </div>
        </div>
        
        <button className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
          <div className="w-4 h-4 flex items-center justify-center">
            <i className="ri-share-line"></i>
          </div>
        </button>
      </div>
    </div>
  );
}
