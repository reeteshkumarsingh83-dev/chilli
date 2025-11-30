import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAdminProfile, updateAdminProfile, updateAdminPassword } from '../../../utils/fetchAdminApi';
import defaultImage from '../../../public/assets/images/default/default.png';

const AdminProfile = () => {
  const adminId = localStorage.getItem('adminId');
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Administrator',
    avatar: '',
    image: '',
    password: '',
    confirm_password: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getAdminProfile(adminId);
      if (data.status !== false) {
        setProfile({
          name: data.data.name || '',
          email: data.data.email || '',
          phone: data.data.phone || '',
          role: data.data.role || 'Administrator',
          avatar: data.data.avatar || '',
          image: data.data.avatar,
          password: '',
          confirm_password: ''
        });
      } else {
        toast.error('Failed to fetch profile');
      }
    };

    fetchProfile();
  }, [adminId]);

  const handleChange = e => setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setProfile(prev => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  // Update profile
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', profile.name);
    formData.append('phone', profile.phone);
    if (imageFile) formData.append('avatar', imageFile);

    const updatedData = await updateAdminProfile(adminId, formData);
    setLoading(false);

    if (updatedData.status) {
      toast.success('Profile updated successfully!');
    } else {
      toast.error(updatedData.message || 'Failed to update profile');
    }
  };

  // Update password
  const handlePasswordSubmit = async e => {
    e.preventDefault();
    setLoadingPassword(true);

    if (profile.password !== profile.confirm_password) {
      toast.error('Passwords do not match');
      setLoadingPassword(false);
      return;
    }

    const success = await updateAdminPassword(adminId, profile.password, profile.confirm_password);
    setLoadingPassword(false);
    success ? toast.success('Password updated successfully!') : toast.error('Failed to update password');
  };

  return (
    <div className="container py-4">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div className="card shadow-lg border-0 rounded-4">
        {/* Profile Section */}
        <div className="card-body text-center">
          <img
            src={profile.image || defaultImage}
            alt="Admin Avatar"
            className="rounded-circle shadow mb-3"
            width="120"
            height="120"
          />
          <h4 className="mb-0">{profile.name}</h4>
          <p className="text-muted">{profile.role}</p>

          <form onSubmit={handleSubmit} className="px-md-5 mt-4">
            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Profile Image</label>
              <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3 text-start">
                <label className="form-label fw-semibold">Full Name</label>
                <input type="text" className="form-control" name="name" value={profile.name} onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-3 text-start">
                <label className="form-label fw-semibold">Phone Number</label>
                <input type="text" className="form-control" name="phone" value={profile.phone} onChange={handleChange} placeholder="Enter phone number" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3 text-start">
                <label className="form-label fw-semibold">Email Address</label>
                <input type="email" className="form-control" value={profile.email} disabled />
                <div className="form-text">Email cannot be changed</div>
              </div>
              <div className="col-md-6 mb-3 text-start">
                <label className="form-label fw-semibold">Role</label>
                <input type="text" className="form-control" value={profile.role} disabled />
              </div>
            </div>

            <div className="text-end">
              <button type="submit" className="btn btn-primary px-4" disabled={loading}>
                {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Saving...</> : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>

        {/* Password Section */}
        <div className="card-body border-top mt-3">
          <form onSubmit={handlePasswordSubmit} className="px-md-5">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">New Password</label>
                <input type="password" className="form-control" name="password" value={profile.password} onChange={handleChange} placeholder="New Password" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Confirm Password</label>
                <input type="password" className="form-control" name="confirm_password" value={profile.confirm_password} onChange={handleChange} placeholder="Confirm Password" />
              </div>
            </div>

            <div className="text-end">
              <button type="submit" className="btn btn-primary px-4" disabled={loadingPassword}>
                {loadingPassword ? <><span className="spinner-border spinner-border-sm me-2"></span>Saving...</> : 'Change Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
