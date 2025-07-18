import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{
      width: '100%',
      background: '#f5f5f5',
      borderTop: '1px solid #e0e0e0',
      marginTop: '2rem',
      padding: '2rem 2rem 1rem 2rem',
      fontSize: '0.95rem',
      color: '#888',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
    }}>
      <div style={{ display: 'flex', gap: 24, marginBottom: 8 }}>
        <a href="#" style={{ color: '#888', textDecoration: 'none' }}>광고안내</a>
      </div>
      <div style={{ color: '#bbb', fontSize: '0.85rem' }}>
        © 2025 SWIMMERGY. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer; 