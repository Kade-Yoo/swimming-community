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
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 32 }}>
      <h2>마이페이지</h2>
      {/* 사용자 정보(이메일 등) 표시 필요 시 API 연동 후 출력 */}
      <button onClick={handleLogout} style={{ width: '100%' }}>로그아웃</button>
    </div>
  );
};

export default MyPage; 