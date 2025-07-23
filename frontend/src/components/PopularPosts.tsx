'use client';

import { useState } from 'react';

const popularPosts = [
  {
    id: 1,
    title: "10 Essential Swimming Techniques Every Beginner Should Master",
    author: "Coach Amanda Foster",
    date: "2024-01-15",
    likes: 234,
    comments: 45,
    image: "https://readdy.ai/api/search-image?query=Swimming%20instructor%20demonstrating%20proper%20technique%20in%20crystal%20clear%20pool%2C%20professional%20coaching%20session%2C%20modern%20aquatic%20facility%2C%20educational%20swimming%20environment%2C%20clean%20blue%20water%20background&width=400&height=250&seq=post1&orientation=landscape"
  },
  {
    id: 2,
    title: "Best Swimming Workouts for Building Endurance",
    author: "Mark Rodriguez",
    date: "2024-01-12",
    likes: 189,
    comments: 32,
    image: "https://readdy.ai/api/search-image?query=Competitive%20swimmer%20training%20in%20pool%2C%20endurance%20workout%20session%2C%20professional%20swimming%20training%2C%20athletic%20performance%2C%20modern%20aquatic%20center%2C%20focused%20training%20environment&width=400&height=250&seq=post2&orientation=landscape"
  },
  {
    id: 3,
    title: "How to Choose the Right Swimming Goggles",
    author: "Jennifer Lee",
    date: "2024-01-10",
    likes: 167,
    comments: 28,
    image: "https://readdy.ai/api/search-image?query=Collection%20of%20premium%20swimming%20goggles%2C%20modern%20aquatic%20equipment%20display%2C%20professional%20swimming%20gear%2C%20clean%20white%20background%20with%20blue%20accents%2C%20product%20comparison%20setup&width=400&height=250&seq=post3&orientation=landscape"
  }
];

const latestPosts = [
  {
    id: 4,
    title: "Swimming Pool Safety Tips for Families",
    author: "Dr. Sarah Mitchell",
    date: "2024-01-18",
    likes: 156,
    comments: 22,
    image: "https://readdy.ai/api/search-image?query=Family%20swimming%20safely%20in%20pool%2C%20children%20with%20parents%2C%20pool%20safety%20demonstration%2C%20modern%20family%20aquatic%20center%2C%20safe%20swimming%20environment%2C%20clear%20blue%20water&width=400&height=250&seq=post4&orientation=landscape"
  },
  {
    id: 5,
    title: "Nutrition Guide for Competitive Swimmers",
    author: "Nutritionist Alex Chen",
    date: "2024-01-17",
    likes: 198,
    comments: 38,
    image: "https://readdy.ai/api/search-image?query=Healthy%20nutrition%20for%20swimmers%2C%20sports%20nutrition%20setup%2C%20fresh%20fruits%20and%20protein%20foods%2C%20athletic%20meal%20preparation%2C%20clean%20modern%20kitchen%2C%20sports%20nutrition%20concept&width=400&height=250&seq=post5&orientation=landscape"
  },
  {
    id: 6,
    title: "Recovery Techniques After Intense Swimming Sessions",
    author: "Physical Therapist Maya Patel",
    date: "2024-01-16",
    likes: 143,
    comments: 19,
    image: "https://readdy.ai/api/search-image?query=Athlete%20recovery%20after%20swimming%2C%20stretching%20and%20relaxation%20techniques%2C%20modern%20sports%20recovery%20facility%2C%20professional%20therapy%20session%2C%20aquatic%20sports%20rehabilitation%20environment&width=400&height=250&seq=post6&orientation=landscape"
  }
];

export default function PopularPosts() {
  const [activeTab, setActiveTab] = useState('popular');

  const currentPosts = activeTab === 'popular' ? popularPosts : latestPosts;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Community Posts</h2>
          <p className="text-xl text-gray-600">Discover insights from our swimming community</p>
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setActiveTab('popular')}
              className={`px-6 py-3 rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'popular' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-blue-600'
              }`}
            >
              Popular Posts
            </button>
            <button
              onClick={() => setActiveTab('latest')}
              className={`px-6 py-3 rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'latest' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-blue-600'
              }`}
            >
              Latest Posts
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post) => (
            <article
              key={post.id}
              className="bg-blue-50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            >
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-48 object-cover object-top"
              />
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">{post.title}</h3>
                
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {post.author.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700 font-medium">{post.author}</p>
                    <p className="text-gray-500 text-sm">{post.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-gray-500">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 bg-blue-100 hover:bg-blue-200 transition-colors cursor-pointer rounded px-2 py-1">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-heart-line text-blue-600"></i>
                      </div>
                      <span className="font-semibold text-blue-600">{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 bg-green-100 hover:bg-green-200 transition-colors cursor-pointer rounded px-2 py-1">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-chat-3-line text-green-600"></i>
                      </div>
                      <span className="font-semibold text-green-600">{post.comments}</span>
                    </button>
                  </div>
                  <button className="bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer rounded p-2">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-share-line text-gray-500"></i>
                    </div>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
} 