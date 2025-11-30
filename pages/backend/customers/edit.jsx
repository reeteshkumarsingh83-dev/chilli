import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCustomerDetail, updateCustomer } from '../../../utils/fetchAdminApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomerEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    passport_number: '',
    address: '',
    status: '',
  });

  useEffect(() => {
    const fetchCustomer = async () => {
      const data = await getCustomerDetail(id);
      if (data) setCustomer(data);
    };
    fetchCustomer();
  }, [id]);

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await updateCustomer(id, customer);
    setLoading(false);

    if (success) {
      toast.success('Customer updated successfully!');
      setTimeout(() => {
        navigate('/admin/dashboard/customers');
      }, 1500);
    }
  };

  return (
    <div className="container-fluid py-4">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      
      <div className="card shadow-lg border-0 rounded-2 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="fw-bold mb-1">Edit Customer</h2>
            <p className="text-muted mb-0">Update the customer details</p>
          </div>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>← Back</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="mb-3 col-md-6">
              <label className="form-label fw-semibold">Name</label>
              <input
                type="text"
                className="form-control"
                name="full_name"
                value={customer.full_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3 col-md-6">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={customer.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="mb-3 col-md-6">
              <label className="form-label fw-semibold">Phone</label>
              <input
                type="text"
                className="form-control"
                name="phone_number"
                value={customer.phone_number}
                onChange={handleChange}
              />
            </div>

            {/* <div className="mb-3 col-md-4">
              <label className="form-label fw-semibold">Passport Number</label>
              <input
                type="text"
                className="form-control"
                name="passport_number"
                value={customer.passport_number}
                onChange={handleChange}
              />
            </div> */}

            <div className="mb-3 col-md-6">
              <label className="form-label fw-semibold">Status</label>
              <select
                className="form-control"
                name="status"
                value={customer.status || ''}
                onChange={handleChange}
              >
                <option value="">-- Select Status --</option>
                <option value="active">Active</option>
                <option value="inActive">InActive</option>
                <option value="banned">Banned</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="mb-3 col-md-12">
              <label className="form-label fw-semibold">Address</label>
              <textarea
                className="form-control"
                name="address"
                rows="3"
                value={customer.address}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          <div className="text-end">
            <button
              type="submit"
              className="btn bg-brand text-white px-4"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Updating...
                </>
              ) : (
                'Update'
              )}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CustomerEdit;
