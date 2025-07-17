import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void; // token은 JWT 토큰
  logout: () => void;
}

const TOKEN_KEY = 'swim_token';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem(TOKEN_KEY));
  }, []);

  const login = (tokenValue: string) => {
    // tokenValue는 JWT 토큰
    localStorage.setItem(TOKEN_KEY, tokenValue);
    setToken(tokenValue);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('AuthContext를 AuthProvider로 감싸서 사용하세요.');
  return ctx;
} 