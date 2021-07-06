import React, { Component } from 'react';
import { User } from '@real-world/models';

/* eslint-disable-next-line */
export interface SettingsFormProps {
  user: User;
}

export class SettingsForm extends Component<SettingsFormProps> {
  render() {
    return (
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  defaultValue={this.props.user.image}
                ></input>
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  defaultValue={this.props.user.username}
                ></input>
              </fieldset>
              <fieldset className="form-group">
                <textarea
                  className="form-control form-control-lg"
                  rows={8}
                  placeholder="Short bio about you"
                  defaultValue={this.props.user.bio}
                ></textarea>
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  defaultValue={this.props.user.email}
                ></input>
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                ></input>
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default SettingsForm;
