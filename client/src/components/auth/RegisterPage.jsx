/**
 * This file exports the register page for Researchify.
 */

import React from 'react';
import LoginButton from './authComponents/LoginButton';
import AuthLayout from './AuthLayout';

const RegisterPage = () => (
  <>
    <AuthLayout button={LoginButton()} />
  </>
);

export default RegisterPage;
