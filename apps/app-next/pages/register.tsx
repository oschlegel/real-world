import React from 'react';
import { RegistrationForm } from '../components/registration-form';

/* eslint-disable-next-line */
export interface RegisterProps {}

export function Register(props: RegisterProps) {
  return (
    <div className="auth-page">
      <div className="container page">
        <RegistrationForm />
      </div>
    </div>
  );
}

export default Register;
