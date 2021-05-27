import React, { ChangeEvent, Component, FormEvent } from 'react';
import { register } from '../services/browser/user';
import ErrorMessages from './error-messages';

/* eslint-disable-next-line */
export interface RegistrationFormProps {}

interface RegistrationFormState {
  username: string;
  email: string;
  password: string;
  error: unknown;
}

export class RegistrationForm extends Component<
  RegistrationFormProps,
  RegistrationFormState
> {
  constructor(props) {
    super(props);
    this.state = { username: '', email: '', password: '', error: null };
  }

  handleUsernameInput(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    this.setState({ username: event.target.value });
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
      await register(
        this.state.username,
        this.state.email,
        this.state.password
      );

      window.location.assign('/login');
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center">Sign up</h1>
          <p className="text-xs-center">
            <a href="/login">Have an account?</a>
          </p>

          <ErrorMessages error={this.state.error} />

          <form onSubmit={(event) => this.handleSubmit(event)}>
            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                onChange={(event) => this.handleUsernameInput(event)}
              ></input>
            </fieldset>
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
              Sign up
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default RegistrationForm;
