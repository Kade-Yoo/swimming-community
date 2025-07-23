import React, { useState } from 'react';
import GuideCard from '../components/GuideCard';

const categories = [
  { id: 'all', name: '전체', icon: 'ri-list-check' },
  { id: 'swimming', name: '수영 영법', icon: 'ri-water-flash-line' },
  { id: 'scuba', name: '스쿠버 다이빙', icon: 'ri-ship-line' },
  { id: 'skin', name: '스킨 스쿠버', icon: 'ri-glasses-2-line' },
  { id: 'safety', name: '안전 가이드', icon: 'ri-shield-check-line' },
  { id: 'equipment', name: '장비 사용법', icon: 'ri-tools-line' }
];

const guides = [
  {
    id: 1,
    title: '자유형 완전 정복 가이드',
    description: '자유형의 기본 자세부터 고급 기술까지 단계별로 배우는 완전 가이드입니다.',
    category: 'swimming',
    difficulty: '초급',
    duration: '30분',
    views: 15420,
    likes: 892,
    image: 'https://readdy.ai/api/search-image?query=Professional%20swimmer%20performing%20freestyle%20stroke%20in%20clear%20blue%20pool%20water%20with%20perfect%20form%20and%20technique%2C%20underwater%20view%20showing%20streamlined%20body%20position%2C%20swimming%20lanes%20visible%2C%20bright%20aquatic%20environment%2C%20high%20quality%20sports%20photography&width=400&height=250&seq=guide1&orientation=landscape'
  },
  {
    id: 2,
    title: '배영 마스터 클래스',
    description: '배영의 올바른 자세와 호흡법, 팔 동작의 타이밍을 자세히 알아보세요.',
    category: 'swimming',
    difficulty: '중급',
    duration: '25분',
    views: 12350,
    likes: 674,
    image: 'https://readdy.ai/api/search-image?query=Swimming%20backstroke%20technique%20demonstration%20in%20crystal%20clear%20pool%2C%20athlete%20showing%20perfect%20backstroke%20form%20with%20proper%20arm%20rotation%20and%20body%20alignment%2C%20swimming%20pool%20lanes%2C%20professional%20sports%20photography%20with%20clean%20aquatic%20background&width=400&height=250&seq=guide2&orientation=landscape'
  },
  {
    id: 3,
    title: '평영 기초부터 실전까지',
    description: '평영의 개구리 킥과 팔 동작을 완벽하게 익히는 단계별 가이드입니다.',
    category: 'swimming',
    difficulty: '초급',
    duration: '35분',
    views: 9800,
    likes: 523,
    image: 'https://readdy.ai/api/search-image?query=Breaststroke%20swimming%20technique%20with%20swimmer%20demonstrating%20perfect%20frog%20kick%20and%20arm%20movement%20in%20clear%20pool%20water%2C%20underwater%20angle%20showing%20proper%20body%20position%2C%20swimming%20lanes%20background%2C%20professional%20aquatic%20sports%20photography&width=400&height=250&seq=guide3&orientation=landscape'
  },
  {
    id: 4,
    title: '버터플라이 도전하기',
    description: '가장 어려운 영법인 버터플라이를 차근차근 배워보는 전문 가이드입니다.',
    category: 'swimming',
    difficulty: '고급',
    duration: '40분',
    views: 7650,
    likes: 445,
    image: 'https://readdy.ai/api/search-image?query=Butterfly%20stroke%20swimming%20technique%20with%20powerful%20dolphin%20kick%20and%20synchronized%20arm%20movement%2C%20swimmer%20in%20clear%20blue%20pool%20water%20showing%20perfect%20form%2C%20dynamic%20water%20splash%2C%20professional%20sports%20photography%20with%20clean%20aquatic%20background&width=400&height=250&seq=guide4&orientation=landscape'
  },
  {
    id: 5,
    title: '스쿠버 다이빙 입문 가이드',
    description: '스쿠버 다이빙의 기본 원리부터 안전 수칙까지 초보자를 위한 완전 가이드입니다.',
    category: 'scuba',
    difficulty: '초급',
    duration: '45분',
    views: 18200,
    likes: 1120,
    image: 'https://readdy.ai/api/search-image?query=Scuba%20diving%20beginner%20guide%20with%20diver%20in%20full%20equipment%20underwater%2C%20colorful%20coral%20reef%20background%2C%20clear%20blue%20ocean%20water%2C%20professional%20diving%20gear%20including%20mask%20and%20regulator%2C%20underwater%20photography%20with%20marine%20life&width=400&height=250&seq=guide5&orientation=landscape'
  },
  {
    id: 6,
    title: '스쿠버 장비 사용법',
    description: '스쿠버 다이빙 장비의 올바른 사용법과 관리 방법을 알아보세요.',
    category: 'scuba',
    difficulty: '초급',
    duration: '30분',
    views: 14500,
    likes: 780,
    image: 'https://readdy.ai/api/search-image?query=Scuba%20diving%20equipment%20layout%20on%20boat%20deck%20including%20BCD%20vest%2C%20regulator%2C%20mask%2C%20fins%20and%20tank%2C%20professional%20diving%20gear%20arrangement%2C%20clear%20blue%20ocean%20background%2C%20equipment%20preparation%20photography&width=400&height=250&seq=guide6&orientation=landscape'
  },
  {
    id: 7,
    title: '수중 사진 촬영 가이드',
    description: '스쿠버 다이빙 중 멋진 수중 사진을 촬영하는 방법과 팁을 공유합니다.',
    category: 'scuba',
    difficulty: '중급',
    duration: '35분',
    views: 11800,
    likes: 692,
    image: 'https://readdy.ai/api/search-image?query=Underwater%20photography%20with%20scuba%20diver%20taking%20pictures%20of%20colorful%20coral%20reef%20and%20tropical%20fish%2C%20underwater%20camera%20equipment%2C%20clear%20blue%20ocean%20water%2C%20marine%20life%20photography%20session&width=400&height=250&seq=guide7&orientation=landscape'
  },
  {
    id: 8,
    title: '스킨 스쿠버 기초 가이드',
    description: '스킨 스쿠버의 기본 자세와 호흡법, 잠수 기술을 배워보세요.',
    category: 'skin',
    difficulty: '초급',
    duration: '25분',
    views: 13200,
    likes: 856,
    image: 'https://readdy.ai/api/search-image?query=Skin%20diving%20or%20snorkeling%20technique%20with%20person%20diving%20underwater%20wearing%20mask%20and%20fins%2C%20clear%20tropical%20blue%20water%2C%20underwater%20view%20showing%20proper%20diving%20form%2C%20marine%20environment%20background&width=400&height=250&seq=guide8&orientation=landscape'
  },
  {
    id: 9,
    title: '프리다이빙 호흡법',
    description: '프리다이빙을 위한 전문적인 호흡법과 멘탈 트레이닝 방법입니다.',
    category: 'skin',
    difficulty: '고급',
    duration: '50분',
    views: 9500,
    likes: 634,
    image: 'https://readdy.ai/api/search-image?query=Freediving%20breath%20hold%20technique%20with%20person%20floating%20peacefully%20underwater%2C%20serene%20blue%20ocean%20environment%2C%20meditation-like%20underwater%20scene%2C%20professional%20freediving%20photography%20showing%20relaxed%20body%20position&width=400&height=250&seq=guide9&orientation=landscape'
  },
  {
    id: 10,
    title: '수영장 안전 수칙',
    description: '수영장에서 지켜야 할 기본 안전 수칙과 응급처치 방법을 알아보세요.',
    category: 'safety',
    difficulty: '초급',
    duration: '20분',
    views: 22500,
    likes: 1345,
    image: 'https://readdy.ai/api/search-image?query=Swimming%20pool%20safety%20demonstration%20with%20lifeguard%20equipment%2C%20pool%20safety%20signs%2C%20clear%20blue%20swimming%20pool%20water%2C%20safety%20equipment%20like%20life%20rings%20and%20first%20aid%20kit%2C%20professional%20pool%20facility%20photography&width=400&height=250&seq=guide10&orientation=landscape'
  },
  {
    id: 11,
    title: '바다 수영 안전 가이드',
    description: '바다에서 수영할 때 주의해야 할 사항과 안전 수칙을 상세히 설명합니다.',
    category: 'safety',
    difficulty: '초급',
    duration: '30분',
    views: 16800,
    likes: 945,
    image: 'https://readdy.ai/api/search-image?query=Ocean%20swimming%20safety%20with%20lifeguard%20tower%20on%20beach%2C%20clear%20blue%20ocean%20water%2C%20safety%20flags%20and%20warning%20signs%2C%20beach%20safety%20equipment%2C%20professional%20beach%20safety%20photography%20with%20horizon%20view&width=400&height=250&seq=guide11&orientation=landscape'
  },
  {
    id: 12,
    title: '수영 장비 관리법',
    description: '수영복, 수경, 킥보드 등 수영 장비의 올바른 관리와 보관 방법입니다.',
    category: 'equipment',
    difficulty: '초급',
    duration: '15분',
    views: 8900,
    likes: 432,
    image: 'https://readdy.ai/api/search-image?query=Swimming%20equipment%20care%20and%20maintenance%20with%20goggles%2C%20swimsuit%2C%20kickboard%20and%20training%20equipment%20arranged%20neatly%2C%20clean%20pool%20background%2C%20equipment%20maintenance%20guide%20photography&width=400&height=250&seq=guide12&orientation=landscape'
  }
];

const GuidePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredGuides = selectedCategory === 'all'
    ? guides
    : guides.filter(guide => guide.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '초급': return 'bg-green-100 text-green-800';
      case '중급': return 'bg-yellow-100 text-yellow-800';
      case '고급': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">수영 가이드</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              수영 영법부터 스쿠버 다이빙까지, 전문가가 제공하는 완전한 가이드로 수영 실력을 향상시켜보세요
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-500 hover:text-blue-600 hover:bg-blue-50 shadow-md'
              }`}
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <i className={`${category.icon} text-sm`}></i>
              </div>
              {category.name}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGuides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
        {filteredGuides.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <i className="ri-file-list-3-line text-2xl text-gray-400"></i>
            </div>
            <p className="text-gray-500 text-lg">해당 카테고리에 가이드가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuidePage; 