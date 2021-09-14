/**
 * This file exports the login page of Researchify.
 */

import React from 'react';
import RegisterButton from './authComponents/RegisterButton';
import AuthLayout from './AuthLayout';

const LoginPage = () => (
  <>
    <AuthLayout button={RegisterButton()} />
  </>
);

export default LoginPage;
