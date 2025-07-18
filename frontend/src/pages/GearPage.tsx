import React from 'react';

const gears = [
  { id: 1, name: '아레나 수경', brand: 'Arena', category: '수경', description: '김서림 방지, 시야 넓음', review: 8 },
  { id: 2, name: '스피도 수영복', brand: 'Speedo', category: '수영복', description: '탄탄한 착용감', review: 5 },
  { id: 3, name: '미즈노 수모', brand: 'Mizuno', category: '수모', description: '편안한 착용감', review: 2 },
];

const GearPage: React.FC = () => {
  return (
    <div className="flex-1 w-full h-full bg-gray-50 py-10">
      <div className="w-full px-4 md:px-8">
        <h1 className="text-3xl font-bold mb-8 text-center">수영복/장비</h1>
        <div className="space-y-6">
          {gears.map(gear => (
            <div key={gear.id} className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <div className="text-xl font-semibold text-gray-900 mb-1">{gear.name}</div>
                <div className="text-sm text-gray-500 mb-2">{gear.brand} · {gear.category}</div>
                <div className="text-gray-700 mb-1">{gear.description}</div>
                <div className="text-xs text-blue-600 font-bold">리뷰 {gear.review}개</div>
              </div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow self-start md:self-auto">리뷰 작성</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GearPage; 