import React from 'react';

import { LoginForm } from '../components/login-form';

/* eslint-disable-next-line */
export interface LoginProps {}

export function Login(props: LoginProps) {
  return (
    <div className="auth-page">
      <div className="container page">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
