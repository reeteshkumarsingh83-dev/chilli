// src/components/LogoutButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Logout() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('authToken');
  if (!isLoggedIn) return null;

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out from your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, logout'
    }).then((result) => {
      if (result.isConfirmed) {
        // Remove login data
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        localStorage.removeItem('userId');

        // Show success alert
        Swal.fire({
          icon: 'success',
          title: 'Logged Out',
          text: 'You have been logged out successfully.',
          showConfirmButton: false,
          timer: 1500
        });

        // Navigate to login
        setTimeout(() => {
          navigate('/login');
        }, 1600);
      }
    });
  };

  return (
    <span onClick={handleLogout}>
      Logout
    </span>
  );
}

const styles = {
  button: {
    padding: '10px 20px',
    backgroundColor: '#d32f2f',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default Logout;
