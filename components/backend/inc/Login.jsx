import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../../public/assets/images/logo/chilli.png';
import { adminLogin } from '../../../utils/fetchAdminApi'; // helper API

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) navigate('/admin/dashboard', { replace: true });
  }, [navigate]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      toast.error('Both email and password are required.');
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    if (trimmedPassword.length < 1) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      const result = await adminLogin(trimmedEmail, trimmedPassword);

      if (result.status && result.data) {
        const user = result.data;

        // Save login info
        localStorage.setItem('loginTime', Date.now());
        localStorage.setItem('authToken', user.access_token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('adminId', user.id);
        toast.success('Login Successful!');

        navigate('/admin/dashboard');
      } else {
        toast.error(result.message || 'Invalid credentials');
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div style={styles.card}>
        <img src={logo} alt="Logo" style={{ height: '80px' }} />
        <h2 style={styles.title}>Administrator Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p style={styles.note}>Enter your credentials to continue.</p>
      </div>
    </div>
  );
}

export default Login;

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(to right, #E5354B, #5962A7)',
    padding: '20px',
  },
  card: {
    background: '#fff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 0 20px rgba(0,0,0,0.2)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '30px',
    fontSize: '28px',
    color: '#0d47a1',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#E5354B',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  note: {
    marginTop: '20px',
    fontSize: '14px',
    color: '#777',
  },
};
