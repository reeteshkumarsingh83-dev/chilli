import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from '../components/layouts/AdminLayout';
import Dashboard from '../pages/backend/dashboard/Dashboard';
import Login from '../components/backend/inc/Login';
import Logout from '../components/backend/inc/Logout';
import AdminProfile from '../pages/backend/profile/index';
import CustomerList from '../pages/backend/customers/index';
import CustomerEdit from '../pages/backend/customers/edit';
import CustomerView from '../pages/backend/customers/view';
import Configration from '../pages/backend/configration/index';

import Onboarding from '../pages/backend/onboarding/index';
import CreateOnboardingQuestion from '../pages/backend/onboarding/create';
import EditOnboardingQuestion from '../pages/backend/onboarding/edit';

import Products from '../pages/backend/product/listing';
import ProductView from '../pages/backend/product/view';

import PrivateRoute from './privateRoute';

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />

      {/* Protected Layout with Nested Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute>
            <AppLayout />
          </PrivateRoute>
        }
      >
      <Route index element={<Dashboard />} />
      <Route path="profile" element={<AdminProfile />} />
      <Route path="customers" element={<CustomerList />} />
      <Route path="customer/view/:id" element={<CustomerView />} />
      <Route path="customer/edit/:id" element={<CustomerEdit />} />

      {/*Onboarding*/}
      <Route path="onboarding" element={<Onboarding />} />
      <Route path="onboarding/create" element={<CreateOnboardingQuestion />} />
      <Route path="onboarding/edit/:id" element={<EditOnboardingQuestion />} />

      {/* Product */}
      <Route path="products" element={<Products />} />
      <Route path="product/view/:id" element={<ProductView />} />

      <Route path="configration" element={<Configration />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;