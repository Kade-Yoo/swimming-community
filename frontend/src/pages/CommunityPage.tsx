import React from 'react';

const posts = [
  { id: 1, title: '오늘 수영 연습 어땠나요?', author: 'user1', date: '2024-07-18', comment: 3 },
  { id: 2, title: '스타트가 너무 아찔해요--.', author: 'user2', date: '2024-07-17', comment: 5 },
  { id: 3, title: '수영적 실체를 얻어졌습니다', author: 'user3', date: '2024-07-16', comment: 2 },
  { id: 4, title: '땡의 뒷차기 오일탑 황워드집니다', author: 'user4', date: '2024-07-15', comment: 0 },
];

const CommunityPage: React.FC = () => {
  return (
    <div className="flex-1 w-full h-full bg-gray-50 py-10">
      <div className="w-full px-4 md:px-8">
        <h1 className="text-3xl font-bold mb-8 text-center">커뮤니티</h1>
        <div className="bg-white rounded-xl shadow divide-y">
          {posts.map(post => (
            <div key={post.id} className="flex items-center px-6 py-4 gap-4 hover:bg-gray-50 transition">
              <div className="flex-1">
                <div className="text-lg font-semibold text-gray-900">{post.title}</div>
                <div className="text-xs text-gray-500 mt-1">{post.author} · {post.date}</div>
              </div>
              {post.comment > 0 && (
                <span className="ml-2 text-xs text-red-500 font-bold">[{post.comment}]</span>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-6">
          <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow">글쓰기</button>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage; 