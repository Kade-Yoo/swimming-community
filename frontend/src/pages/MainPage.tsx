import React from 'react';
import Header from '../components/Header';
import SlideBox from '../components/SlideBox';
import ReviewPhotos from '../components/ReviewPhotos';
import PopularPosts from '../components/PopularPosts';

const MainPage: React.FC = () => {
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
      {/* 리뷰 사진 */}
      <ReviewPhotos />
      {/* 인기글 */}
      <PopularPosts />
    </div>
  );
};

export default MainPage; 