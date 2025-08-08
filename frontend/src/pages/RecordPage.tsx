import React, { useState } from 'react';

interface Record {
  id: number;
  event: string;
  time: string;
  date: string;
  memo: string;
  category: string;
}

const initialRecords: Record[] = [
  { id: 1, event: '자유형 50m', time: '00:32.15', date: '2024-07-10', memo: '개인 최고 기록!', category: '자유형' },
  { id: 2, event: '배영 100m', time: '01:25.30', date: '2024-06-28', memo: '턴 연습 필요', category: '배영' },
  { id: 3, event: '평영 50m', time: '00:45.80', date: '2024-06-15', memo: '', category: '평영' },
  { id: 4, event: '접영 100m', time: '01:15.45', date: '2024-06-10', memo: '팔 동작 개선 필요', category: '접영' },
];

const RecordPage: React.FC = () => {
  const [records, setRecords] = useState<Record[]>(initialRecords);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [newRecord, setNewRecord] = useState({
    event: '',
    time: '',
    date: new Date().toISOString().split('T')[0],
    memo: '',
    category: '자유형'
  });

  const categories = ['전체', '자유형', '배영', '평영', '접영', '개인혼영'];

  const filteredRecords = selectedCategory === '전체' 
    ? records 
    : records.filter(record => record.category === selectedCategory);

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecord.event || !newRecord.time) return;

    const record: Record = {
      id: records.length + 1,
      ...newRecord
    };

    setRecords([record, ...records]);
    setNewRecord({
      event: '',
      time: '',
      date: new Date().toISOString().split('T')[0],
      memo: '',
      category: '자유형'
    });
    setShowAddForm(false);
  };

  const handleDeleteRecord = (id: number) => {
    setRecords(records.filter(record => record.id !== id));
  };

  const formatTime = (time: string) => {
    const parts = time.split(':');
    if (parts.length === 2) {
      return `00:${time}`;
    }
    return time;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">기록 관리</h1>
          <p className="text-xl text-gray-600">나의 수영 기록을 관리해보세요</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          {/* 필터 및 추가 버튼 */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'} px-4 py-2 rounded-full transition-colors whitespace-nowrap cursor-pointer`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all whitespace-nowrap cursor-pointer flex items-center gap-2"
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-add-line"></i>
              </div>
              기록 추가
            </button>
          </div>

          {/* 기록 목록 */}
          <div className="space-y-4">
            {filteredRecords.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <i className="ri-timer-line text-6xl"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">기록이 없습니다</h3>
                <p className="text-gray-500">첫 번째 기록을 추가해보세요!</p>
              </div>
            ) : (
              filteredRecords.map(record => (
                <div key={record.id} className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{record.event}</h3>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                          {record.category}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mb-2">{record.date}</div>
                      <div className="text-3xl font-bold text-blue-600 mb-2">{formatTime(record.time)}</div>
                      {record.memo && (
                        <div className="text-sm text-gray-600 bg-white rounded-lg p-2 border">
                          <i className="ri-chat-1-line mr-1"></i>
                          {record.memo}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleDeleteRecord(record.id)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow transition-colors"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 기록 추가 모달 */}
        {showAddForm && (
          <div className="fixed inset-0 bg-blue-950/40 dark:bg-blue-950/50 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">기록 추가</h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
              
              <form onSubmit={handleAddRecord} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">종목</label>
                  <select
                    value={newRecord.category}
                    onChange={(e) => setNewRecord({...newRecord, category: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="자유형">자유형</option>
                    <option value="배영">배영</option>
                    <option value="평영">평영</option>
                    <option value="접영">접영</option>
                    <option value="개인혼영">개인혼영</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">거리</label>
                  <input
                    type="text"
                    value={newRecord.event}
                    onChange={(e) => setNewRecord({...newRecord, event: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="예: 자유형 50m"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">기록</label>
                  <input
                    type="text"
                    value={newRecord.time}
                    onChange={(e) => setNewRecord({...newRecord, time: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="예: 00:32.15"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">날짜</label>
                  <input
                    type="date"
                    value={newRecord.date}
                    onChange={(e) => setNewRecord({...newRecord, date: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">메모</label>
                  <textarea
                    value={newRecord.memo}
                    onChange={(e) => setNewRecord({...newRecord, memo: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                    placeholder="기록에 대한 메모를 입력하세요"
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all"
                  >
                    추가
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordPage; 