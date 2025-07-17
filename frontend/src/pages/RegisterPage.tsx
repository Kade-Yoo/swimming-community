import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        const err = await res.json();
        setError(err.error || '회원가입 실패');
        return;
      }
      const user = await res.json();
      login(user.token); // JWT 토큰 저장
      navigate('/'); // 메인 페이지로 이동
    } catch (e) {
      setError('네트워크 오류');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 32 }}>
      <h2>회원가입</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>이메일</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '100%', marginBottom: 12 }}
          />
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', marginBottom: 12 }}
          />
        </div>
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        <button type="submit" style={{ width: '100%' }}>회원가입</button>
      </form>
    </div>
  );
};

export default RegisterPage; 