/**
 * This file exports the register page for Researchify.
 */

import React from 'react';
import AuthBackground from './authComponents/AuthBackground';
import LoginButton from './authComponents/LoginButton';
import AuthLayout from './AuthLayout';
import RegistrationForm from './authComponents/RegistrationForm';

const RegisterPage = () => (
  <>
    <AuthLayout button={LoginButton()}>
      <AuthBackground form={RegistrationForm()} />
    </AuthLayout>
  </>
);

export default RegisterPage;
