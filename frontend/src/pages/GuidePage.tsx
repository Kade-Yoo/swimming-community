import React from 'react';

const guides = [
  { id: 1, title: '자유형 스트로크 완전 정복', category: '영법', content: '자유형 스트로크의 핵심은...' },
  { id: 2, title: '수영장 매너 10계명', category: '팁', content: '수영장에서는 이런 점을 지켜주세요...' },
  { id: 3, title: '초보자를 위한 호흡법', category: '훈련', content: '수영 호흡의 기본은...' },
];

const GuidePage: React.FC = () => {
  return (
    <div className="flex-1 w-full h-full bg-gray-50 py-10">
      <div className="w-full px-4 md:px-8">
        <h1 className="text-3xl font-bold mb-8 text-center">수영 가이드</h1>
        <div className="space-y-6">
          {guides.map(guide => (
            <div key={guide.id} className="bg-white rounded-xl shadow p-6 flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-block px-2 py-0.5 rounded bg-blue-100 text-xs font-semibold text-blue-700">{guide.category}</span>
                <span className="text-lg font-semibold text-gray-900">{guide.title}</span>
              </div>
              <div className="text-gray-700 text-sm">{guide.content}</div>
              <button className="self-end mt-2 px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow">상세보기</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuidePage; 