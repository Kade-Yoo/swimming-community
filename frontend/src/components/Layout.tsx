import React from 'react';
import Navigation from './Navigation';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-full h-full min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 w-full h-full flex flex-col">
        {children}
      </main>
    </div>
  );
};

export default Layout; 