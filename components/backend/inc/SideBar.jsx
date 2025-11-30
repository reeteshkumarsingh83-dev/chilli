import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt, FaUser, FaBox, FaStar, FaImage, FaListAlt, FaFileAlt, FaCogs, FaFacebookF
} from 'react-icons/fa';
import logo from '../../../public/assets/images/logo/chilli.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const SideBar = () => {
  const location = useLocation();

  // ✅ Updated isActive: exact match optional
  const isActive = (paths, exact = false) => {
    const currentPath = location.pathname;

    if (Array.isArray(paths)) {
      return paths.some(path => exact ? currentPath === path : currentPath.startsWith(path));
    }

    return exact ? currentPath === paths : currentPath.startsWith(paths);
  };

  const linkStyle = (paths, exact = false) =>
    `nav-link d-flex align-items-center gap-2 rounded px-3 py-2 fw-medium ${
      isActive(paths, exact) ? 'bg-brand text-white shadow-sm' : 'text-dark'
    }`;

  return (
    <div
      className="d-flex flex-column shadow-sm"
      style={{
        width: '260px',
        height: '100vh',
        position: 'fixed',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e6e6e6',
      }}
    >
      {/* Fixed Logo Header */}
      <div
        className="px-5 border-bottom"
        style={{
          flexShrink: 0,
          position: 'sticky',
          top: 2,
          background: '#fff',
          zIndex: 10,
        }}
      >
        <div className="d-flex align-items-center gap-2">
          <img src={logo} alt="Logo" height={67} />
        </div>
      </div>

      {/* Scrollable Menu */}
      <div className="px-3 py-2" style={{ flexGrow: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <ul className="nav flex-column">
          {/* Section: Main */}
          <li className="text-uppercase small text-muted mt-4 mb-2 px-2">Main</li>
          <li className="nav-item">
            <Link to="/admin/dashboard" className={linkStyle('/admin/dashboard', true)}>
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>
          <li className="nav-item mt-2">
            <Link to="/admin/dashboard/products" className={linkStyle('/admin/dashboard/products')}>
              <FaBox /> Product
            </Link>
          </li>

          {/* Section: Content */}
          <li className="text-uppercase small text-muted mt-4 mb-2 px-2">Content</li>
          <li className="nav-item mt-2">
            <Link to="/admin/dashboard/onboarding" className={linkStyle('/admin/dashboard/onboarding')}>
              <FaStar /> Onboarding
            </Link>
          </li>
          <li className="nav-item mt-2">
            <Link to="/admin/dashboard/customers" className={linkStyle('/category')}>
              <FaListAlt /> Category
            </Link>
          </li>
          <li className="nav-item mt-2">
            <Link to="/admin/dashboard/customers" className={linkStyle('/banner')}>
              <FaImage /> Sub Category
            </Link>
          </li>
          <li className="nav-item mt-2">
            <Link to="/admin/dashboard/customers" className={linkStyle('/pages')}>
              <FaFileAlt />Feed Posts
            </Link>
          </li>
          <li className="nav-item mt-2">
            <Link to="/admin/dashboard/customers" className={linkStyle('/admin/dashboard/customers')}>
              <FaUser /> Customers
            </Link>
          </li>
          <li className="nav-item mt-2">
            <Link to="/admin/dashboard/customers" className={linkStyle('/social-media')}>
              <FaFacebookF /> Social Media
            </Link>
          </li>
          <li className="nav-item mt-2">
            <Link to="/admin/dashboard/configration" className={linkStyle('/configration')}>
              <FaCogs /> Configuration
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
