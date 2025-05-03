import React from 'react';
import { Route } from 'react-router-dom';

import LicensesList from '../components/LicensesList';
import CreateLicense from '../components/CreateLicense';
import LicenseDetails from '../components/LicenseDetails';
import UpgradeLicense from '../components/UpgradeLicense';

/**
 * Routes pour le module de gestion des licences
 */
const LicensesRoutes = [
  <Route key="licenses-list" path="/licenses" element={<LicensesList />} />,
  <Route key="license-create" path="/licenses/create" element={<CreateLicense />} />,
  <Route key="license-details" path="/licenses/:id" element={<LicenseDetails />} />,
  <Route key="license-upgrade" path="/licenses/upgrade/:id" element={<UpgradeLicense />} />,
];

export default LicensesRoutes; 