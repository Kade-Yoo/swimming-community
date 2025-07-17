import React from 'react';
import { Button } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
  const { isAuthenticated, logout, token } = useAuth();
  const navigate = useNavigate();

  // 샘플: 토큰이 이메일이라고 가정
  const email = token || '';

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2 style={{ margin: 0 }}>아마추어 수영 커뮤니티</h2>
      <div>
        {isAuthenticated ? (
          <>
            <span style={{ marginRight: 16 }}>{email}</span>
            <Button variant="outlined" size="small" onClick={handleLogout}>로그아웃</Button>
          </>
        ) : (
          <Button component={RouterLink} to="/login" variant="contained" size="small">로그인</Button>
        )}
      </div>
    </header>
  );
};

export default Header; 