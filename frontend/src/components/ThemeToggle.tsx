import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, isDark, toggleTheme } = useTheme();

  const getThemeIcon = () => {
    if (theme === 'auto') {
      return isDark ? 'ri-moon-line' : 'ri-sun-line';
    }
    return theme === 'dark' ? 'ri-moon-line' : 'ri-sun-line';
  };

  const getThemeLabel = () => {
    if (theme === 'auto') {
      return isDark ? '다크모드 (자동)' : '라이트모드 (자동)';
    }
    return theme === 'dark' ? '다크모드' : '라이트모드';
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 text-white hover:text-cyan-100 transition-colors group"
      title={getThemeLabel()}
    >
      <i className={`${getThemeIcon()} text-xl`}></i>
      
      {/* 툴팁 */}
      <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {getThemeLabel()}
        <div className="absolute top-full right-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
      </div>
    </button>
  );
};

export default ThemeToggle; 