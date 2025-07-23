'use client';

import { useState } from 'react';

export default function RecordSearch() {
  const [searchFilters, setSearchFilters] = useState({
    event: '',
    category: '',
    year: '',
    name: ''
  });

  const [searchResults, setSearchResults] = useState([
    {
      id: 1,
      event: "자유형 50m",
      record: "21.30",
      holder: "김수영",
      date: "2024-03-15",
      competition: "전국 수영 선수권 대회",
      category: "남자 일반부"
    },
    {
      id: 2,
      event: "배영 100m",
      record: "52.45",
      holder: "이물살",
      date: "2024-02-20",
      competition: "겨울 수영 대회",
      category: "여자 일반부"
    }
  ]);

  const handleSearch = () => {
    // 검색 로직 구현
    console.log('검색 필터:', searchFilters);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">기록 검색</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">종목</label>
          <div className="relative">
            <select
              value={searchFilters.event}
              onChange={(e) => setSearchFilters({...searchFilters, event: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
            >
              <option value="">전체 종목</option>
              <option value="자유형">자유형</option>
              <option value="배영">배영</option>
              <option value="평영">평영</option>
              <option value="접영">접영</option>
              <option value="개인혼영">개인혼영</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
          <div className="relative">
            <select
              value={searchFilters.category}
              onChange={(e) => setSearchFilters({...searchFilters, category: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
            >
              <option value="">전체 카테고리</option>
              <option value="남자 일반부">남자 일반부</option>
              <option value="여자 일반부">여자 일반부</option>
              <option value="남자 청소년부">남자 청소년부</option>
              <option value="여자 청소년부">여자 청소년부</option>
              <option value="마스터즈">마스터즈</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">연도</label>
          <div className="relative">
            <select
              value={searchFilters.year}
              onChange={(e) => setSearchFilters({...searchFilters, year: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
            >
              <option value="">전체 연도</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">선수명</label>
          <input
            type="text"
            value={searchFilters.name}
            onChange={(e) => setSearchFilters({...searchFilters, name: e.target.value})}
            placeholder="선수명 검색"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={handleSearch}
          className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-colors whitespace-nowrap cursor-pointer flex items-center space-x-2"
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <i className="ri-search-line"></i>
          </div>
          <span>검색</span>
        </button>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">검색 결과</h3>
        <div className="space-y-4">
          {searchResults.map((result) => (
            <div key={result.id} className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 rounded-full p-2">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <i className="ri-timer-line text-blue-600"></i>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{result.event}</h4>
                      <p className="text-sm text-gray-600">{result.category}</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{result.record}</div>
                  <div className="text-sm text-gray-500">기록</div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="w-4 h-4 flex items-center justify-center mr-1">
                        <i className="ri-user-line"></i>
                      </div>
                      <span>{result.holder}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 flex items-center justify-center mr-1">
                        <i className="ri-calendar-line"></i>
                      </div>
                      <span>{result.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 flex items-center justify-center mr-1">
                      <i className="ri-trophy-line"></i>
                    </div>
                    <span>{result.competition}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}