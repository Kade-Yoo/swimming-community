import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { HiOutlineUserCircle } from 'react-icons/hi';

const Navigation: React.FC = () => {
  const { isAuthenticated, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-4 md:px-12 py-2 flex items-center justify-between sticky top-0 z-50">
      {/* 로고 */}
      <div className="font-extrabold text-xl md:text-2xl tracking-tight text-blue-600">
        <Link to="/">RXP FLEX</Link>
      </div>
      {/* 메뉴 */}
      <div className="hidden md:flex gap-7 text-base font-medium text-gray-800">
        <Link to="/community" className="hover:text-blue-600 transition">커뮤니티</Link>
        <Link to="/competition" className="hover:text-blue-600 transition">대회</Link>
        <Link to="/gear" className="hover:text-blue-600 transition">장비</Link>
        <Link to="/guide" className="hover:text-blue-600 transition">가이드</Link>
        <Link to="/record" className="hover:text-blue-600 transition">기록</Link>
        <Link to="/mypage" className="hover:text-blue-600 transition">마이페이지</Link>
      </div>
      {/* 버튼 */}
      <div className="flex gap-2 items-center">
        {isAuthenticated ? (
          <>
            <Link to="/mypage" className="text-blue-600 hover:text-blue-800 transition text-2xl"><HiOutlineUserCircle /></Link>
            <button onClick={handleLogout} className="px-4 py-1 rounded border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition">로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-4 py-1 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">로그인</Link>
            <Link to="/register" className="px-4 py-1 rounded border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition">회원가입</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation; 