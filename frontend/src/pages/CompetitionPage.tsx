import React from 'react';
import { useState } from 'react';
import CompetitionCard from '../components/CompetitionCard';
import RecordSearch from '../components/RecordSearch';
import RecordCard from '../components/RecordCard';

const CompetitionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('info');

  const competitions = [
    {
      id: 1,
      title: "전국 수영 선수권 대회 2024",
      date: "2024년 4월 15일 - 18일",
      location: "서울 올림픽 수영장",
      category: "전국대회",
      status: "참가접수중",
      image: "https://readdy.ai/api/search-image?query=Olympic%20swimming%20pool%20competition%20arena%20with%20multiple%20lanes%2C%20professional%20swimming%20championship%20event%2C%20large%20audience%20stands%2C%20modern%20aquatic%20facility%20with%20clear%20blue%20water%2C%20competitive%20swimming%20atmosphere%2C%20professional%20sports%20venue%20lighting&width=400&height=200&seq=comp2024-1&orientation=landscape",
      participants: 350,
      events: ["자유형", "배영", "평영", "접영", "개인혼영"]
    },
    {
      id: 2,
      title: "청소년 수영 페스티벌",
      date: "2024년 5월 20일 - 22일",
      location: "부산 아쿠아리움",
      category: "청소년부",
      status: "예정",
      image: "https://readdy.ai/api/search-image?query=Youth%20swimming%20competition%20in%20modern%20aquatic%20center%2C%20young%20swimmers%20preparing%20for%20race%2C%20bright%20colorful%20pool%20environment%2C%20energetic%20atmosphere%2C%20clean%20facility%20with%20blue%20water%2C%20youth%20sports%20event%20setting&width=400&height=200&seq=youth2024-1&orientation=landscape",
      participants: 180,
      events: ["자유형", "배영", "평영"]
    },
    {
      id: 3,
      title: "마스터즈 수영 대회",
      date: "2024년 6월 10일 - 12일",
      location: "대구 시립 수영장",
      category: "마스터즈",
      status: "준비중",
      image: "https://readdy.ai/api/search-image?query=Masters%20swimming%20competition%20with%20mature%20athletes%2C%20professional%20indoor%20pool%20facility%2C%20calm%20competitive%20environment%2C%20well-maintained%20aquatic%20center%2C%20clear%20blue%20water%2C%20adult%20swimming%20championship%20atmosphere&width=400&height=200&seq=masters2024-1&orientation=landscape",
      participants: 120,
      events: ["자유형", "배영", "평영", "접영"]
    }
  ];

  const records = [
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
    },
    {
      id: 3,
      event: "평영 200m",
      record: "2:05.67",
      holder: "박영법",
      date: "2024-01-10",
      competition: "신년 수영 대회",
      category: "남자 일반부"
    },
    {
      id: 4,
      event: "접영 100m",
      record: "56.78",
      holder: "정나비",
      date: "2024-03-01",
      competition: "봄 수영 페스티벌",
      category: "여자 일반부"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">수영 대회</h1>
          <p className="text-xl text-gray-600">다양한 수영 대회에 참가하고 기록을 확인하세요</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-white p-1 rounded-full shadow-lg">
            <button
              onClick={() => setActiveTab('info')}
              className={`px-6 py-3 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'info'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              대회 정보
            </button>
            <button
              onClick={() => setActiveTab('records')}
              className={`px-6 py-3 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'records'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              대회 기록
            </button>
            <button
              onClick={() => setActiveTab('search')}
              className={`px-6 py-3 rounded-full transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'search'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              기록 검색
            </button>
          </div>
        </div>

        {activeTab === 'info' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competitions.map((competition) => (
              <CompetitionCard key={competition.id} competition={competition} />
            ))}
          </div>
        )}

        {activeTab === 'records' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">최신 기록</h2>
              <div className="space-y-4">
                {records.map((record) => (
                  <RecordCard key={record.id} record={record} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'search' && (
          <div className="max-w-4xl mx-auto">
            <RecordSearch />
          </div>
        )}
      </div>
    </div>
  );
};

export default CompetitionPage; 