import React from 'react';

const records = [
  { id: 1, event: '자유형 50m', time: '00:32.15', date: '2024-07-10', memo: '개인 최고 기록!' },
  { id: 2, event: '배영 100m', time: '01:25.30', date: '2024-06-28', memo: '턴 연습 필요' },
  { id: 3, event: '평영 50m', time: '00:45.80', date: '2024-06-15', memo: '' },
];

const RecordPage: React.FC = () => {
  return (
    <div className="flex-1 w-full h-full bg-gray-50 py-10">
      <div className="w-full px-4 md:px-8">
        <h1 className="text-3xl font-bold mb-8 text-center">기록 관리</h1>
        <div className="space-y-6">
          {records.map(rec => (
            <div key={rec.id} className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <div className="text-lg font-semibold text-gray-900 mb-1">{rec.event}</div>
                <div className="text-sm text-gray-500 mb-2">{rec.date}</div>
                <div className="text-blue-700 font-bold text-xl mb-1">{rec.time}</div>
                {rec.memo && <div className="text-xs text-gray-500">{rec.memo}</div>}
              </div>
              <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded shadow self-start md:self-auto">삭제</button>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-6">
          <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow">기록 추가</button>
        </div>
      </div>
    </div>
  );
};

export default RecordPage; 