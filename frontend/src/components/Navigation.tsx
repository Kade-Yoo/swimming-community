import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

const Navigation: React.FC = () => {
  const { isAuthenticated, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee', marginBottom: '1rem' }}>
      <Link to="/" style={{ marginRight: 16 }}>메인</Link>
      <Link to="/competition" style={{ marginRight: 16 }}>대회 정보</Link>
      <Link to="/record" style={{ marginRight: 16 }}>기록 관리</Link>
      <Link to="/gear" style={{ marginRight: 16 }}>수영복/장비</Link>
      <Link to="/guide" style={{ marginRight: 16 }}>수영 가이드</Link>
      <Link to="/community" style={{ marginRight: 16 }}>커뮤니티</Link>
      {isAuthenticated ? (
        <>
          <Link to="/mypage" style={{ marginRight: 16 }}>마이페이지</Link>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#1976d2', cursor: 'pointer', marginRight: 16 }}>로그아웃</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: 16 }}>로그인</Link>
          <Link to="/register">회원가입</Link>
        </>
      )}
    </nav>
  );
};

export default Navigation; 