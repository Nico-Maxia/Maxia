import React from 'react';
import { Route } from 'react-router-dom';

import Login from '../components/Login';
import ForgotPassword from '../components/ForgotPassword';
import ChangePassword from '../components/ChangePassword';

/**
 * Routes du module d'authentification
 */
const AuthRoutes = [
  <Route key="login" path="/login" element={<Login />} />,
  <Route key="forgot-password" path="/forgot-password" element={<ForgotPassword />} />,
  <Route key="change-password" path="/change-password" element={<ChangePassword />} />
];

export default AuthRoutes; 