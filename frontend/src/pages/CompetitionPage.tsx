import React from 'react';

const competitions = [
  { id: 1, name: '2024 전국 아마추어 수영대회', date: '2024-08-15', location: '서울 올림픽 수영장', description: '전국 아마추어 수영인들의 축제!' },
  { id: 2, name: '여름 마스터즈 대회', date: '2024-07-30', location: '부산 해운대 수영장', description: '여름을 시원하게! 마스터즈 대회' },
];

const CompetitionPage: React.FC = () => {
  return (
    <div className="flex-1 w-full h-full bg-gray-50 py-10">
      <div className="w-full px-4 md:px-8">
        <h1 className="text-3xl font-bold mb-8 text-center">대회 정보</h1>
        <div className="space-y-6">
          {competitions.map(comp => (
            <div key={comp.id} className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <div className="text-xl font-semibold text-gray-900 mb-1">{comp.name}</div>
                <div className="text-sm text-gray-500 mb-2">{comp.date} · {comp.location}</div>
                <div className="text-gray-700">{comp.description}</div>
              </div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow self-start md:self-auto">상세보기</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompetitionPage; 