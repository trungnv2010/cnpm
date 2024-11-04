import React from 'react';
import Navbar from '../navbar/Navbar';

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>

    </>
  );
}

export default Layout;
