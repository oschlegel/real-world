import React, { ChangeEvent, Component, FormEvent } from 'react';
import { login } from '../services/browser/user';
import ErrorMessages from './error-messages';

/* eslint-disable-next-line */
export interface LoginFormProps {}

export interface LoginFormState {
  email: string;
  password: string;
  error: unknown;
}

export class LoginForm extends Component<LoginFormProps, LoginFormState> {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: null };
  }

  handleEmailInput(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    this.setState({ email: event.target.value });
  }

  handlePasswordInput(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    this.setState({ password: event.target.value });
  }

  async handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await login(this.state.email, this.state.password);
      window.document.cookie = `token=${response.token}`;

      window.location.assign('/');
    } catch (error) {
      this.setState({ error });
    }
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center">Sign in</h1>

          <ErrorMessages error={this.state.error} />

          <form onSubmit={(event) => this.handleSubmit(event)}>
            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="Email"
                onChange={(event) => this.handleEmailInput(event)}
              ></input>
            </fieldset>
            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type="password"
                placeholder="Password"
                onChange={(event) => this.handlePasswordInput(event)}
              ></input>
            </fieldset>
            <button className="btn btn-lg btn-primary pull-xs-right">
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
