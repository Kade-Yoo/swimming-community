import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
// import Header from '../components/Header';

const MyPage: React.FC = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  // page.tsx 주요 state 및 데이터
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '김수영',
    email: 'swimming@aquaconnect.com',
    phone: '010-1234-5678',
    specialty: '자유형',
    level: '중급',
    location: '서울시 강남구',
    experience: '5년'
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const myRecords = [
    { event: '자유형 50m', time: '24.35', date: '2024-01-15', rank: '2위' },
    { event: '자유형 100m', time: '52.18', date: '2024-01-10', rank: '1위' },
    { event: '배영 100m', time: '1:08.45', date: '2023-12-20', rank: '3위' },
    { event: '접영 50m', time: '26.78', date: '2023-12-15', rank: '1위' }
  ];

  const myPosts = [
    { id: 1, title: '자유형 텀블턴 연습 방법', category: '기술', likes: 45, comments: 12, date: '2024-01-18' },
    { id: 2, title: '수영장 추천 - 잠실 스포츠센터', category: '정보', likes: 32, comments: 8, date: '2024-01-15' },
    { id: 3, title: '수영복 추천 좀 해주세요', category: '장비', likes: 28, comments: 15, date: '2024-01-12' }
  ];

  const competitions = [
    { name: '2024 전국 수영대회', date: '2024-02-15', status: '참가 예정' },
    { name: '서울시 수영대회', date: '2024-01-20', status: '참가 완료' },
    { name: '마스터즈 수영대회', date: '2023-12-10', status: '참가 완료' }
  ];

  const achievements = [
    { title: '첫 대회 참가', icon: 'ri-trophy-line', date: '2023-11-15' },
    { title: '자유형 마스터', icon: 'ri-medal-line', date: '2023-12-20' },
    { title: '커뮤니티 활동가', icon: 'ri-community-line', date: '2024-01-10' },
    { title: '기록 달성', icon: 'ri-time-line', date: '2024-01-15' }
  ];

  const tabs = [
    { id: 'profile', label: '프로필', icon: 'ri-user-line' },
    { id: 'records', label: '내 기록', icon: 'ri-timer-line' },
    { id: 'posts', label: '내 게시글', icon: 'ri-article-line' },
    { id: 'competitions', label: '대회 참가', icon: 'ri-trophy-line' },
    { id: 'achievements', label: '업적', icon: 'ri-medal-line' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex-1 w-full h-full min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full px-4 md:px-8">
        <h2 className="text-2xl font-bold text-center mb-6">마이페이지</h2>
        {/* page.tsx 주요 UI 통합 */}
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
          {/* <Header /> */}
          <div className="container mx-auto px-6 py-8">
            {/* 프로필 헤더 */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <i className="ri-user-line text-3xl text-white"></i>
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{profileData.name}</h1>
                  <p className="text-gray-600 mb-1">{profileData.specialty} • {profileData.level}</p>
                  <p className="text-gray-500">{profileData.location}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600 mb-1">42</div>
                  <div className="text-sm text-gray-500">총 참가 대회</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-cyan-600 mb-1">128</div>
                  <div className="text-sm text-gray-500">작성한 글</div>
                </div>
              </div>
            </div>
            {/* 탭 네비게이션 */}
            <div className="bg-white rounded-2xl shadow-lg mb-8">
              <div className="flex border-b border-gray-200 px-2 pt-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex-1 px-6 py-4 text-center font-medium transition-colors cursor-pointer whitespace-nowrap bg-transparent ${
                      activeTab === tab.id
                        ? 'text-blue-600'
                        : 'text-gray-500 hover:text-blue-600'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <i className={`${tab.icon} text-lg`}></i>
                      <span>{tab.label}</span>
                    </div>
                    {activeTab === tab.id && (
                      <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-500"></span>
                    )}
                  </button>
                ))}
              </div>
              <div className="p-8">
                {/* 프로필 탭 */}
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold text-gray-800">개인 정보</h2>
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        {isEditing ? '저장' : '수정'}
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={profileData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="px-4 py-2 bg-gray-50 rounded-lg">{profileData.name}</div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={profileData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="px-4 py-2 bg-gray-50 rounded-lg">{profileData.email}</div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">전화번호</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="px-4 py-2 bg-gray-50 rounded-lg">{profileData.phone}</div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">전문 종목</label>
                        {isEditing ? (
                          <select
                            value={profileData.specialty}
                            onChange={(e) => handleInputChange('specialty', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                          >
                            <option value="자유형">자유형</option>
                            <option value="배영">배영</option>
                            <option value="평영">평영</option>
                            <option value="접영">접영</option>
                            <option value="개인혼영">개인혼영</option>
                          </select>
                        ) : (
                          <div className="px-4 py-2 bg-gray-50 rounded-lg">{profileData.specialty}</div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">수영 레벨</label>
                        {isEditing ? (
                          <select
                            value={profileData.level}
                            onChange={(e) => handleInputChange('level', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                          >
                            <option value="초급">초급</option>
                            <option value="중급">중급</option>
                            <option value="고급">고급</option>
                            <option value="전문가">전문가</option>
                          </select>
                        ) : (
                          <div className="px-4 py-2 bg-gray-50 rounded-lg">{profileData.level}</div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">지역</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={profileData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <div className="px-4 py-2 bg-gray-50 rounded-lg">{profileData.location}</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {/* 내 기록 탭 */}
                {activeTab === 'records' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold text-gray-800">내 기록</h2>
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                        기록 추가
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {myRecords.map((record, index) => (
                        <div key={index} className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">{record.event}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              record.rank === '1위' ? 'bg-yellow-100 text-yellow-800' :
                              record.rank === '2위' ? 'bg-gray-100 text-gray-800' :
                              'bg-orange-100 text-orange-800'
                            }`}>
                              {record.rank}
                            </span>
                          </div>
                          <div className="text-3xl font-bold text-blue-600 mb-2">{record.time}</div>
                          <div className="text-sm text-gray-500">{record.date}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* 내 게시글 탭 */}
                {activeTab === 'posts' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold text-gray-800">내 게시글</h2>
                      <Link to="/community" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                        글 쓰기
                      </Link>
                    </div>
                    <div className="space-y-4">
                      {myPosts.map((post) => (
                        <div key={post.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-800 mb-2">{post.title}</h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{post.category}</span>
                                <span>{post.date}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <i className="ri-heart-line text-red-500"></i>
                                <span>{post.likes}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <i className="ri-message-line text-blue-500"></i>
                                <span>{post.comments}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 text-sm cursor-pointer">수정</button>
                            <button className="text-red-600 hover:text-red-800 text-sm cursor-pointer">삭제</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* 대회 참가 탭 */}
                {activeTab === 'competitions' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold text-gray-800">대회 참가 내역</h2>
                      <Link to="/competitions" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">
                        대회 찾기
                      </Link>
                    </div>
                    <div className="space-y-4">
                      {competitions.map((competition, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-xl p-6">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800 mb-2">{competition.name}</h3>
                              <p className="text-gray-600">{competition.date}</p>
                            </div>
                            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                              competition.status === '참가 예정' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {competition.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* 업적 탭 */}
                {activeTab === 'achievements' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800">업적</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {achievements.map((achievement, index) => (
                        <div key={index} className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                              <i className={`${achievement.icon} text-white text-xl`}></i>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800">{achievement.title}</h3>
                              <p className="text-sm text-gray-600">{achievement.date}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <button onClick={handleLogout} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition mt-4">로그아웃</button>
      </div>
    </div>
  );
};

export default MyPage; 