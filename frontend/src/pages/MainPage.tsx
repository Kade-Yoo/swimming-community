import React from 'react';
import { Link } from 'react-router-dom';
import SlideBox from '../components/SlideBox';
import ReviewPhotos from '../components/ReviewPhotos';
import PopularPosts from '../components/PopularPosts';

const MainPage: React.FC = () => {
  const quickActions = [
    { title: '커뮤니티', description: '수영 팬들과 소통해보세요', icon: 'ri-community-line', link: '/community', color: 'from-blue-500 to-cyan-500' },
    { title: '기록 관리', description: '나의 수영 기록을 관리하세요', icon: 'ri-timer-line', link: '/records', color: 'from-green-500 to-emerald-500' },
    { title: '가이드', description: '수영 기술을 배워보세요', icon: 'ri-book-open-line', link: '/guide', color: 'from-purple-500 to-pink-500' },
    { title: '장비 정보', description: '수영 장비 정보를 확인하세요', icon: 'ri-shopping-bag-line', link: '/gear', color: 'from-orange-500 to-red-500' },
  ];

  const stats = [
    { label: '활성 사용자', value: '1,234', icon: 'ri-user-line' },
    { label: '총 게시글', value: '5,678', icon: 'ri-article-line' },
    { label: '대회 정보', value: '89', icon: 'ri-trophy-line' },
    { label: '기록 관리', value: '2,345', icon: 'ri-timer-line' },
  ];

  return (
    <div className="flex-1 w-full h-full bg-gray-50">
      {/* 상단 텍스트 + 슬라이드 박스 분리, 슬라이드에 흰 배경 강조 */}
      <div className="w-full flex flex-col items-center bg-gradient-to-r from-cyan-700 to-blue-900 py-12 mb-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-white drop-shadow-lg">수영 커뮤니티</h1>
          <p className="text-lg md:text-2xl font-medium text-white drop-shadow">수영 팬들을 위한 커뮤니티입니다.</p>
        </div>
        <div className="w-full max-w-5xl px-4">
          <div className="bg-white rounded-xl shadow-2xl p-2">
            <SlideBox />
          </div>
        </div>
      </div>

      {/* 통계 섹션 */}
      <div className="container mx-auto px-6 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`${stat.icon} text-white text-xl`}></i>
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 빠른 액션 섹션 */}
      <div className="container mx-auto px-6 mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">빠른 액션</h2>
          <p className="text-lg text-gray-600">원하는 기능을 바로 이용해보세요</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.link} className="group">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <i className={`${action.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">{action.title}</h3>
                <p className="text-sm text-gray-600 text-center">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 리뷰 사진 */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">수영장 리뷰</h2>
          <p className="text-lg text-gray-600">다른 사용자들의 수영장 후기를 확인해보세요</p>
        </div>
        <ReviewPhotos />
      </div>

      {/* 인기글 */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">인기 게시글</h2>
          <p className="text-lg text-gray-600">커뮤니티에서 가장 인기 있는 글들을 확인해보세요</p>
        </div>
        <PopularPosts />
      </div>

      {/* CTA 섹션 */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 py-16 mb-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">지금 바로 시작하세요</h2>
          <p className="text-xl text-blue-100 mb-8">수영 커뮤니티에 가입하고 다른 수영 팬들과 소통해보세요</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              회원가입
            </Link>
            <Link 
              to="/community" 
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              커뮤니티 둘러보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage; 