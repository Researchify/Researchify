/**
 * This file exports the login page of Researchify.
 */

import React from 'react';
import AuthBackground from './authComponents/AuthBackground';
import RegisterButton from './authComponents/RegisterButton';
import AuthLayout from './AuthLayout';
import LoginForm from './authComponents/LoginForm';

const LoginPage = () => (
  <>
    <AuthLayout button={RegisterButton()}>
      <AuthBackground form={LoginForm()} />
    </AuthLayout>
  </>
);

export default LoginPage;
