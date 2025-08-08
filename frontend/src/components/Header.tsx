import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import NotificationSystem from './NotificationSystem';
import ChatSystem from './ChatSystem';
import ThemeToggle from './ThemeToggle';
import type { Notification } from './NotificationSystem';

const mainMenus = [
  { label: '커뮤니티', to: '/community' },
  { label: '대회', to: '/competition' },
  { label: '장비', to: '/gear' },
  { label: '가이드', to: '/guide' },
  { label: '마이페이지', to: '/mypage' },
];

const Header: React.FC = () => {
  const { isAuthenticated, logout, token } = useAuth();
  const navigate = useNavigate();
  const email = token || '';
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // 더미 알림 데이터 생성
  useEffect(() => {
    if (isAuthenticated) {
      const dummyNotifications: Notification[] = [
        {
          id: '1',
          type: 'comment',
          title: '새로운 댓글',
          message: 'user2님이 회원님의 게시글에 댓글을 남겼습니다.',
          timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5분 전
          read: false,
          postId: 1
        },
        {
          id: '2',
          type: 'like',
          title: '좋아요',
          message: 'user3님이 회원님의 게시글을 좋아합니다.',
          timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15분 전
          read: false,
          postId: 1
        },
        {
          id: '3',
          type: 'mention',
          title: '멘션',
          message: 'user4님이 댓글에서 회원님을 언급했습니다.',
          timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30분 전
          read: true,
          postId: 2
        },
        {
          id: '4',
          type: 'system',
          title: '시스템 알림',
          message: '새로운 기능이 추가되었습니다. 확인해보세요!',
          timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1시간 전
          read: true
        }
      ];
      setNotifications(dummyNotifications);
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <>
      <header className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 rounded-t-xl px-8 py-4 flex items-center justify-between">
        {/* 좌측 로고 */}
        <RouterLink to="/" className="text-2xl font-extrabold text-white font-sans tracking-wide flex items-center" aria-label="SWIMMERGY 홈">
          <i className="ri-swimming-line mr-2"></i>
          SWIMMERGY
        </RouterLink>
        
        {/* 중앙 메뉴 */}
        <nav className="flex space-x-8">
          {mainMenus.map((menu) => (
            <RouterLink
              key={menu.to}
              to={menu.to}
              className="text-white font-medium text-base px-2 py-1 hover:text-cyan-100 transition-colors"
            >
              {menu.label}
            </RouterLink>
          ))}
        </nav>
        
        {/* 우측 사용자 정보 및 알림 */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {/* 테마 토글 */}
              <ThemeToggle />

              {/* 채팅 버튼 */}
              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="relative p-2 text-white hover:text-cyan-100 transition-colors"
                title="실시간 채팅"
              >
                <i className="ri-message-3-line text-xl"></i>
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  <i className="ri-wifi-line"></i>
                </span>
              </button>

              {/* 알림 시스템 */}
              <NotificationSystem
                notifications={notifications}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
                onDeleteNotification={handleDeleteNotification}
              />
              
              {/* 사용자 메뉴 */}
              <div className="relative group">
                <button className="flex items-center gap-2 text-white hover:text-cyan-100 transition-colors">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <i className="ri-user-line text-white"></i>
                  </div>
                  <span className="font-medium">{email}</span>
                  <i className="ri-arrow-down-s-line"></i>
                </button>
                
                {/* 드롭다운 메뉴 */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <RouterLink
                      to="/mypage"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <i className="ri-user-line mr-2"></i>
                      마이페이지
                    </RouterLink>
                    <RouterLink
                      to="/records"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <i className="ri-timer-line mr-2"></i>
                      기록 관리
                    </RouterLink>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <i className="ri-logout-box-line mr-2"></i>
                      로그아웃
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* 테마 토글 */}
              <ThemeToggle />
              
              <RouterLink
                to="/login"
                className="bg-white text-blue-600 border border-blue-600 rounded-lg px-4 py-2 font-semibold hover:bg-blue-50 transition mr-2"
              >
                로그인
              </RouterLink>
              <RouterLink
                to="/register"
                className="bg-transparent text-white border border-white rounded-lg px-4 py-2 font-semibold hover:bg-white hover:text-blue-600 transition"
              >
                회원가입
              </RouterLink>
            </>
          )}
        </div>
      </header>

      {/* 실시간 채팅 */}
      {isAuthenticated && (
        <ChatSystem
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          currentUser={email}
        />
      )}
    </>
  );
};

export default Header; 