import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

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

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <header className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 rounded-t-xl px-8 py-4 flex items-center justify-between">
      {/* 좌측 로고 */}
      <RouterLink to="/" className="text-2xl font-extrabold text-white font-sans tracking-wide flex items-center" aria-label="SWIMMERGY 홈">
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
      {/* 우측 로그인/회원가입 또는 사용자 정보 */}
      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <>
            <span className="text-white font-medium mr-2">{email}</span>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 border border-blue-600 rounded-lg px-4 py-2 font-semibold hover:bg-blue-50 transition"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
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
  );
};

export default Header; 