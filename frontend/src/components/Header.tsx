import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const mainMenus = [
  { label: '커뮤니티', to: '/community' },
  { label: '대회', to: '/competition' },
  { label: '장비', to: '/gear' },
  { label: '가이드', to: '/guide' },
  { label: '기록', to: '/record' },
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
    <header style={{
      width: '100%',
      background: '#fff',
      borderBottom: '1px solid #e0e0e0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      height: 64,
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* 좌측 로고 */}
      <RouterLink to="/" className="logo text-2xl font-extrabold text-blue-600 font-sans tracking-wide flex items-center" style={{ textDecoration: 'none' }} aria-label="SWIMMERGY 홈">
        SWIM<span className="wave-m">M</span><span className="wave-e">E</span>RGY
      </RouterLink>
      {/* 중앙 메뉴 */}
      <nav style={{ display: 'flex', gap: 24 }}>
        {mainMenus.map((menu) => (
          <RouterLink
            key={menu.to}
            to={menu.to}
            style={{
              textDecoration: 'none',
              color: '#222',
              fontWeight: 500,
              fontSize: 16,
              padding: '8px 0',
              transition: 'color 0.2s',
            }}
          >
            {menu.label}
          </RouterLink>
        ))}
      </nav>
      {/* 우측 로그인/회원가입 또는 사용자 정보 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {isAuthenticated ? (
          <>
            <span style={{ color: '#1976d2', fontWeight: 500, marginRight: 8 }}>{email}</span>
            <button
              onClick={handleLogout}
              style={{
                background: 'none',
                border: '1px solid #1976d2',
                color: '#1976d2',
                borderRadius: 4,
                padding: '6px 16px',
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: 14,
              }}
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <RouterLink
              to="/login"
              style={{
                background: '#1976d2',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                padding: '6px 16px',
                fontWeight: 500,
                fontSize: 14,
                textDecoration: 'none',
                marginRight: 8,
              }}
            >
              로그인
            </RouterLink>
            <RouterLink
              to="/register"
              style={{
                background: 'none',
                color: '#1976d2',
                border: '1px solid #1976d2',
                borderRadius: 4,
                padding: '6px 16px',
                fontWeight: 500,
                fontSize: 14,
                textDecoration: 'none',
              }}
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