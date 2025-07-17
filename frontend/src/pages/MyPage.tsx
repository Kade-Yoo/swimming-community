import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

const MyPage: React.FC = () => {
  const { token, logout } = useAuthContext();
  const navigate = useNavigate();

  // 실제로는 이메일 등 사용자 정보가 필요하지만, 현재는 token(id)만 저장됨
  // 추후 JWT 적용 시 이메일 등 정보 표시 가능

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 32 }}>
      <h2>마이페이지</h2>
      <div style={{ marginBottom: 16 }}>
        <b>내 ID:</b> {token}
      </div>
      <button onClick={handleLogout} style={{ width: '100%' }}>로그아웃</button>
    </div>
  );
};

export default MyPage; 