import React from 'react';
import Header from '../backend/inc/Header';
import SideBar from '../backend/inc/SideBar';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        style={{
          width: '250px',
          minHeight: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: '#343a40',
          color: '#fff',
          zIndex: 1000,
        }}
      >
        <SideBar />
      </div>

      {/* Main Content Area */}
      <div
        style={{
          marginLeft: '250px',
          width: '100%',
          minHeight: '100vh',
          backgroundColor: '#f8f9fa',
        }}
      >
        {/* Header */}
        <Header />

        {/* Page Content */}
        <div style={{ padding: '20px' }}>
          <Outlet /> {/* ✅ This renders the current route's component */}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
