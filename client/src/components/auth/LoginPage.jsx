/**
 * This file exports the login page of Researchify.
 */

import React from 'react';
import AuthBackground from './authComponents/AuthBackground';
import RegisterButton from './authComponents/RegisterButton';
import AuthLayout from './AuthLayout';

const LoginPage = () => (
  <>
    <AuthLayout button={RegisterButton()}>
      <AuthBackground />
    </AuthLayout>
  </>
);

export default LoginPage;
