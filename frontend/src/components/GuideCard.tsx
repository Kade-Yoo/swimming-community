'use client';

import { useState } from 'react';

interface Guide {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: string;
  views: number;
  likes: number;
  image: string;
}

interface GuideCardProps {
  guide: Guide;
}

export default function GuideCard({ guide }: GuideCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(guide.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '초급': return 'bg-green-100 text-green-800';
      case '중급': return 'bg-yellow-100 text-yellow-800';
      case '고급': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative">
        <img 
          src={guide.image} 
          alt={guide.title}
          className="w-full h-48 object-cover object-top"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(guide.difficulty)}`}>
            {guide.difficulty}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <div className="bg-slate-800/60 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-time-line text-xs"></i>
            </div>
            {guide.duration}
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
          {guide.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {guide.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-eye-line"></i>
              </div>
              {formatNumber(guide.views)}
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-heart-line"></i>
              </div>
              {formatNumber(likeCount)}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer">
            가이드 보기
          </button>
          
          <button 
            onClick={handleLike}
            className={`p-2 rounded-full transition-colors cursor-pointer ${
              isLiked 
                ? 'bg-red-100 text-red-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
            }`}
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <i className={isLiked ? 'ri-heart-fill' : 'ri-heart-line'}></i>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
} 