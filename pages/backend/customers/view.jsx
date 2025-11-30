import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';
import defaultImage from '../../../public/assets/images/default/default.png';
import { getCustomerDetail } from '../../../utils/fetchAdminApi';

const CustomerView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    address: '',
    passport_number: '',
    is_verified: false,
    image_url: '' // Add this
  });

  useEffect(() => {
    const fetchCustomer = async () => {
      const data = await getCustomerDetail(id);

      if (data) {
        setCustomer(data);
      } else {
        Swal.fire('Error', 'Failed to fetch customer data', 'error');
      }
    };

    fetchCustomer();
  }, [id]);

  return (
    <div className="container-fluid py-4">
      <div className="card shadow border-0 rounded-3 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <img
              src={customer.image_url || defaultImage}
              alt={customer.full_name}
              className="rounded-circle me-3"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
            <div>
              <h3 className="fw-bold mb-1">Customer Details</h3>
              <p className="text-muted mb-0">View the complete customer profile</p>
            </div>
          </div>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>← Back</button>
        </div>

        <div className="row">

          <div className="col-md-9">
            <div className="row">

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Name</label>
                <div className="form-control bg-light">{customer.full_name || '-'}</div>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Email</label>
                <div className="form-control bg-light">{customer.email || '-'}</div>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Phone</label>
                <div className="form-control bg-light">{customer.phone_number || '-'}</div>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Verification</label>
                <div className="form-control bg-light">{customer.is_verified ? 'Verified' : 'Not Verified'}</div>
              </div>

              <div className="col-md-12 mb-3">
                <label className="form-label fw-semibold">Address</label>
                <div className="form-control bg-light">{customer.address || '-'}</div>
              </div>

            </div>
          </div>

          {/* Verification Badge */}
          <div className="col-md-3 d-flex align-items-center justify-content-center">
            {customer.is_verified ? (
              <div className="text-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5D3YsiIzwI9EW0hp_HV6VQu1B2WSRfKWZYg&s"
                  alt="Verified"
                  style={{ maxWidth: '100px' }}
                />
                <p className="text-success fw-semibold mt-2">Verified</p>
              </div>
            ) : (
              <div className="text-center">
                <img
                  src="https://png.pngtree.com/png-clipart/20230806/original/pngtree-not-valid-sign-or-stamp-current-emblem-rubber-vector-picture-image_9949538.png"
                  alt="Unverified"
                  style={{ maxWidth: '100px' }}
                />
                <p className="text-danger fw-semibold mt-2">Not Verified</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default CustomerView;
