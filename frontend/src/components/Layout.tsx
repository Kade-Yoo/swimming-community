import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Navigation />
      <main style={{ flex: 1, padding: '2rem 0' }}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout; 