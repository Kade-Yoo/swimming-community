import React from 'react';

const navMenus = [
  { label: 'BEST', to: '/best' },
  { label: '인기글', to: '/popular' },
  { label: '최근글', to: '/recent' },
  { label: '공지', to: '/notice' },
];

const Navigation: React.FC = () => {
  return (
    <aside style={{
      width: '100%',
      background: '#fafbfc',
      borderBottom: '1px solid #e0e0e0',
      padding: '0.5rem 2rem',
      display: 'flex',
      gap: 24,
      fontSize: 15,
      fontWeight: 500,
    }}>
      {navMenus.map((menu) => (
        <a
          key={menu.to}
          href={menu.to}
          style={{
            color: '#1976d2',
            textDecoration: 'none',
            padding: '6px 0',
            transition: 'color 0.2s',
          }}
        >
          {menu.label}
        </a>
      ))}
    </aside>
  );
};

export default Navigation; 