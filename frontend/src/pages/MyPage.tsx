import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

const MyPage: React.FC = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex-1 w-full h-full min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full px-4 md:px-8">
        <h2 className="text-2xl font-bold text-center mb-6">마이페이지</h2>
        {/* 사용자 정보(이메일 등) 표시 필요 시 API 연동 후 출력 */}
        <button onClick={handleLogout} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition mt-4">로그아웃</button>
      </div>
    </div>
  );
};

export default MyPage; 