import React from 'react';
import Navbar from './Navbar'; // Your navigation component
import Footer from './Footer'; // Your footer component

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
