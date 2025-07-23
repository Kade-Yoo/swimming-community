import React from 'react';
import { useState } from 'react';

const categories = [
  { id: 'all', name: '전체', icon: 'ri-grid-line' },
  { id: 'swimsuit', name: '수영복', icon: 'ri-t-shirt-line' },
  { id: 'goggles', name: '수경', icon: 'ri-eye-line' },
  { id: 'accessories', name: '액세서리', icon: 'ri-magic-line' },
  { id: 'training', name: '훈련용품', icon: 'ri-dumbbell-line' }
];

const equipmentReviews = [
  {
    id: 1,
    title: "Speedo Endurance+ 경기용 수영복",
    category: "swimsuit",
    rating: 4.8,
    reviewCount: 124,
    price: "89,000원",
    image: "https://readdy.ai/api/search-image?query=Professional%20competitive%20swimming%20suit%20on%20display%2C%20modern%20athletic%20swimwear%2C%20sleek%20design%2C%20high-performance%20fabric%2C%20swimming%20equipment%20store%20setting%2C%20clean%20white%20background%2C%20premium%20sports%20gear&width=300&height=300&seq=equip1&orientation=squarish",
    reviewer: "김수영",
    review: "경기에서 착용했는데 정말 몸에 잘 맞고 물의 저항이 확실히 줄어드는 느낌이에요. 내구성도 좋습니다.",
    pros: ["뛰어난 착용감", "물 저항 최소화", "내구성 우수"],
    cons: ["가격이 다소 높음"]
  },
  {
    id: 2,
    title: "Aqua Sphere 카이엔 수경",
    category: "goggles",
    rating: 4.6,
    reviewCount: 89,
    price: "45,000원",
    image: "https://readdy.ai/api/search-image?query=Premium%20swimming%20goggles%20close-up%2C%20crystal%20clear%20lenses%2C%20comfortable%20silicone%20seal%2C%20modern%20aquatic%20eyewear%2C%20pool%20water%20background%2C%20professional%20swimming%20equipment%2C%20sleek%20design&width=300&height=300&seq=equip2&orientation=squarish",
    reviewer: "박헤엄",
    review: "시야가 wirklich 넓고 물이 새지 않아요. 장거리 수영할 때도 편안합니다.",
    pros: ["넓은 시야", "완벽한 밀착", "편안한 착용감"],
    cons: ["김서림이 가끔 발생"]
  },
  {
    id: 3,
    title: "TYR 훈련용 핀",
    category: "training",
    rating: 4.5,
    reviewCount: 67,
    price: "35,000원",
    image: "https://readdy.ai/api/search-image?query=Swimming%20training%20fins%20in%20pool%20water%2C%20blue%20silicone%20fins%2C%20professional%20training%20equipment%2C%20underwater%20shot%2C%20aquatic%20sports%20gear%2C%20modern%20swimming%20facility%2C%20athletic%20training&width=300&height=300&seq=equip3&orientation=squarish",
    reviewer: "이영법",
    review: "킥력 향상에 정말 도움이 됩니다. 재질도 튼튼하고 사이즈도 정확해요.",
    pros: ["킥력 향상", "튼튼한 재질", "정확한 사이즈"],
    cons: ["초보자에게는 다소 무거움"]
  },
  {
    id: 4,
    title: "Arena 킥보드",
    category: "training",
    rating: 4.7,
    reviewCount: 156,
    price: "25,000원",
    image: "https://readdy.ai/api/search-image?query=Swimming%20kickboard%20training%20equipment%2C%20athlete%20using%20kickboard%20in%20clear%20blue%20pool%20water%2C%20professional%20aquatic%20training%20gear%2C%20modern%20swimming%20facility%2C%20sports%20training%20session&width=300&height=300&seq=equip4&orientation=squarish",
    reviewer: "정물새",
    review: "부력이 좋고 잡기 편해요. 하체 훈련할 때 필수 아이템입니다.",
    pros: ["우수한 부력", "편안한 그립", "내구성 좋음"],
    cons: ["크기가 다소 큼"]
  },
  {
    id: 5,
    title: "Zoomers 패들",
    category: "training",
    rating: 4.4,
    reviewCount: 92,
    price: "28,000원",
    image: "https://readdy.ai/api/search-image?query=Swimming%20hand%20paddles%20training%20equipment%2C%20colorful%20paddle%20fins%2C%20swimmer%20using%20paddles%20in%20pool%2C%20professional%20aquatic%20training%20gear%2C%20blue%20water%20background%2C%20modern%20swimming%20accessories&width=300&height=300&seq=equip5&orientation=squarish",
    reviewer: "강바다",
    review: "상체 근력 강화에 효과적입니다. 처음에는 적응이 필요하지만 확실히 도움이 돼요.",
    pros: ["근력 강화", "기술 향상", "다양한 크기"],
    cons: ["초기 적応 필요"]
  },
  {
    id: 6,
    title: "Aqua Fitness 벨트",
    category: "accessories",
    rating: 4.3,
    reviewCount: 43,
    price: "32,000원",
    image: "https://readdy.ai/api/search-image?query=Aqua%20fitness%20belt%20water%20exercise%20equipment%2C%20pool%20fitness%20training%2C%20modern%20aquatic%20fitness%20gear%2C%20clear%20blue%20water%2C%20professional%20water%20sports%20equipment%2C%20athletic%20training%20session&width=300&height=300&seq=equip6&orientation=squarish",
    reviewer: "홍수영",
    review: "수중 운동할 때 정말 유용해요. 부력 조절이 잘 되고 편안합니다.",
    pros: ["부력 조절", "편안한 착용", "다양한 운동 가능"],
    cons: ["물에서 벗기기 어려움"]
  }
];

const GearPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const filteredReviews = equipmentReviews.filter(review => 
    selectedCategory === 'all' || review.category === selectedCategory
  );

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">수영 장비 후기</h1>
          <p className="text-xl text-gray-600">실제 사용자들의 솔직한 장비 후기를 확인해보세요</p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-4 mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className={category.icon}></i>
                </div>
                {category.name}
              </button>
            ))}
          </div>

          <div className="flex justify-end">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
            >
              <option value="rating">평점순</option>
              <option value="reviews">리뷰수순</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedReviews.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-64 object-cover object-top"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {item.rating}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-blue-600">{item.price}</span>
                  <span className="text-sm text-gray-500">리뷰 {item.reviewCount}개</span>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {item.reviewer.charAt(0)}
                    </div>
                    <span className="ml-3 text-gray-600 font-medium">{item.reviewer}</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{item.review}</p>
                </div>

                <div className="space-y-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-thumb-up-line text-green-500"></i>
                      </div>
                      <span className="text-sm font-medium text-gray-700">장점</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.pros.map((pro, index) => (
                        <span key={index} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          {pro}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-thumb-down-line text-red-500"></i>
                      </div>
                      <span className="text-sm font-medium text-gray-700">단점</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.cons.map((con, index) => (
                        <span key={index} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                          {con}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GearPage; 