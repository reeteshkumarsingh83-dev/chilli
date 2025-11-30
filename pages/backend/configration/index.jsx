import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AdminSettings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    company_name: '',
    company_email: '',
    company_phone: '',
    company_address: '',
    country: '',
    company_copy_right: '',
  });

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [loading, setLoading] = useState(false);

  // ✅ Fetch settings from API on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/get-settings`);
        if (res.data?.status) {
          setSettings(res.data.data);
        } else {
          Swal.fire('Error', res.data.message || 'Failed to fetch settings', 'error');
        }
      } catch (error) {
        Swal.fire('Error', 'Something went wrong while fetching settings!', 'error');
        console.error(error);
      }
    };

    fetchSettings();
  }, []);

  // ✅ Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/settings/update`, settings); // ✅ used BASE_URL
      if (res.data?.status) {
        Swal.fire('Success', 'Settings updated successfully', 'success');
      } else {
        Swal.fire('Error', res.data.message || 'Failed to update settings', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Something went wrong while saving!', 'error');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="card shadow-lg border-0 rounded-2 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="fw-bold mb-1">Configuration</h2>
            <p className="text-muted mb-0">Update the customer details</p>
          </div>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>← Back</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Company Name</label>
              <input
                type="text"
                className="form-control"
                name="company_name"
                value={settings.company_name}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Company Email</label>
              <input
                type="email"
                className="form-control"
                name="company_email"
                value={settings.company_email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Phone Number</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={settings.company_phone}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Country</label>
              <input
                type="text"
                className="form-control"
                name="country"
                value={settings.country}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Shop Address</label>
            <textarea
              className="form-control"
              name="shop_address"
              rows="2"
              value={settings.company_address}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Copyright</label>
            <input
              type="text"
              className="form-control"
              name="company_copy_right"
              value={settings.company_copy_right}
              onChange={handleChange}
            />
          </div>

          <div className="text-end">
            <button
              type="submit"
              className="btn btn-primary px-4"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Saving...
                </>
              ) : (
                'Update Settings'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
