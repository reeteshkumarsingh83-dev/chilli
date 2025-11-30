import React, { useState, useEffect, useRef } from 'react';
import '../../../public/assets/css/custom.css';
import LogoutButton from './Logout';
import { Link, useNavigate } from 'react-router-dom';
import { getAdminProfile } from '../../../utils/fetchAdminApi';
import { FaUser, FaTachometerAlt, FaCog, FaSignOutAlt, FaBell } from 'react-icons/fa';
import defaultImage from '../../../public/assets/images/default/default.png';

function Header() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    image: '',
    role: '',
  });

  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const sidebarItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'AI Feature', path: '/dashboard/users' },
    { name: 'Product', path: '/dashboard/orders' },
    { name: 'Profile', path: '/dashboard/profile' },
    { name: 'Onboarding', path: '/settings' },
    { name: 'Setting', path: '/settings' },
    { name: 'Customer', path: '/settings' },
    { name: 'Blog', path: '/settings' },
    { name: 'Page', path: '/settings' },
    { name: 'Banner', path: '/settings' },
  ];

  useEffect(() => {
    const adminId = localStorage.getItem("adminId");
    async function fetchProfile() {
      const result = await getAdminProfile(adminId);
      if (result.status && result.data) {
        const user = result.data;

        setProfile({
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '',
          image: user.avatar || '',
          role: user.role || 'Administrator',
        });
      }
    }

    fetchProfile();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !notifRef.current?.contains(event.target) &&
        !profileRef.current?.contains(event.target) &&
        !searchRef.current?.contains(event.target)
      ) {
        setShowNotif(false);
        setShowProfile(false);
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  //  Handle search box
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const filtered = sidebarItems.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (path) => {
    navigate(path);
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const closeAllDropdowns = () => {
    setShowNotif(false);
    setShowProfile(false);
    setShowSuggestions(false);
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4"
      style={{
        height: '70px',
        position: 'sticky',
        top: 0,
        zIndex: 999,
        borderBottom: '1px solid #eee',
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">

        {/* 🔎 SEARCH BAR */}
        <div className="flex-grow-1 mx-4 d-none d-md-block" ref={searchRef}>
          <div className="input-group position-relative">
            <input
              type="search"
              className="form-control form-control-lg"
              placeholder="Search anything..."
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => searchTerm.length > 0 && setShowSuggestions(true)}
            />

            {showSuggestions && suggestions.length > 0 && (
              <ul
                className="list-group position-absolute w-100 bg-white shadow rounded mt-1"
                style={{
                  zIndex: 1050,
                  top: '100%',
                  maxHeight: '220px',
                  overflowY: 'auto',
                  border: '1px solid #dee2e6',
                }}
              >
                {suggestions.map((item, index) => (
                  <li
                    key={index}
                    className="list-group-item list-group-item-action px-3 py-2"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleSuggestionClick(item.path)}
                  >
                    🔎 {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* RIGHT SIDE ICONS */}
        <div className="d-flex align-items-center gap-4">

          {/* 🔔 Notification */}
          <div className="position-relative" ref={notifRef}>
            <FaBell
              className="fs-5 text-secondary dropdown-toggle"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setShowNotif(!showNotif);
                setShowProfile(false);
                setShowSuggestions(false);
              }}
            />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              2
            </span>

            {showNotif && (
              <div
                className="dropdown-menu show shadow rounded mt-2 p-2"
                style={{ right: 0, minWidth: '230px', top: '100%' }}
              >
                <span className="dropdown-item">🔔 New message received</span>
                <span className="dropdown-item">📢 Server updated successfully</span>
              </div>
            )}
          </div>

          {/* 👤 Profile Dropdown */}
          <div className="position-relative" ref={profileRef}>
            <img
              src={
                profile.image
                  ? profile.image
                  : defaultImage
              }
              alt="User Avatar"
              className="rounded-circle border shadow"
              width="40"
              height="40"
              style={{ cursor: 'pointer', objectFit: 'cover' }}
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotif(false);
                setShowSuggestions(false);
              }}
            />
            {showProfile && (
              <div
                className="dropdown-menu show shadow rounded mt-2 p-2"
                style={{ right: 0, minWidth: '180px', top: '100%' }}
              >
                <Link className="dropdown-item" to="/admin/dashboard" onClick={closeAllDropdowns}>
                  <FaTachometerAlt className="me-2" /> Dashboard
                </Link>

                <Link className="dropdown-item" to="/admin/dashboard/profile" onClick={closeAllDropdowns}>
                  <FaUser className="me-2" /> Profile
                </Link>

                <Link className="dropdown-item" to="/settings" onClick={closeAllDropdowns}>
                  <FaCog className="me-2" /> Settings
                </Link>

                <hr className="dropdown-divider" />

                <div className="dropdown-item" onClick={closeAllDropdowns}>
                  <FaSignOutAlt className="me-2" /> <LogoutButton />
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Header;
