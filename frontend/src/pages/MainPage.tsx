import React from 'react';

const latestPosts = [
  { category: '일반', title: '오늘 수영 연습 어땠나요?' },
  { category: '영법', title: '숏핀질 추천 형의 팁', comment: 8 },
  { category: '토론', title: '도핑 이기 묻치기 있을-지요?' },
  { category: '일반', title: '이엔 후임위 수영 대첩 내립니다' },
  { category: '일반', title: '자유형 스트로크가 전 안 되네요', comment: 1 },
  { category: '알림', title: '수영풀 추천 부탁드립니다', comment: 8 },
  { category: '장비', title: '장비 빨게는 이중체 아닌가요?' },
  { category: '양반', title: '숏 오픈워터 드적 연금갑니다', comment: 6 },
];

const popularPosts = [
  { title: '대회에서 저인 참고기록 달성!', comment: 5 },
  { title: '스타트가 너무 아찔해요--.', comment: 15 },
  { title: '수영적 실체를 얻어졌습니다', comment: 10 },
  { title: '땡의 뒷차기 오일탑 황워드집니다', comment: 6 },
  { title: '지름땡치 수영팀과 사장 몸안된 손', comment: 12 },
  { title: '땡영에서 번칠 맨 고개 찡영어요', comment: 4 },
  { title: '수영에 물아지구 착오', comment: 7 },
  { title: '천의 수두 항상 슬람플 공유.', comment: 9 },
  { title: '웃긴번에 제임 50m 기록 갱신!', comment: 5 },
];

const MainPage: React.FC = () => {
  return (
    <div className="flex-1 w-full h-full bg-gray-50">
      {/* 상단 배너 */}
      <div className="relative h-72 flex items-center justify-center bg-gradient-to-r from-cyan-700 to-blue-900 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80"
          alt="수영 배너"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">수영 커뮤니티</h1>
          <p className="text-lg md:text-2xl font-medium drop-shadow">수영 팬들을 위한 거뮤니티입니다.</p>
        </div>
      </div>

      {/* 최신글/인기글 2단 */}
      <div className="w-full px-4 md:px-8 mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 최신 글 */}
        <div>
          <h2 className="text-xl font-bold mb-4">최신 글</h2>
          <div className="bg-white rounded-lg shadow p-4 divide-y">
            {latestPosts.map((post, i) => (
              <div key={i} className="flex items-center py-2 gap-2">
                <span className="inline-block px-2 py-0.5 rounded bg-gray-200 text-xs font-semibold text-gray-700 mr-2">{post.category}</span>
                <span className="flex-1 text-gray-900">{post.title}</span>
                {post.comment && (
                  <span className="ml-2 text-xs text-red-500 font-bold">[{post.comment}]</span>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* 인기 글 */}
        <div>
          <h2 className="text-xl font-bold mb-4">인기 글</h2>
          <div className="bg-white rounded-lg shadow p-4 divide-y">
            {popularPosts.map((post, i) => (
              <div key={i} className="flex items-center py-2 gap-2">
                <span className="w-6 text-center text-gray-400 font-bold">{i + 1}</span>
                <span className="flex-1 text-gray-900">{post.title}</span>
                {post.comment && (
                  <span className="ml-2 text-xs text-red-500 font-bold">[{post.comment}]</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage; 