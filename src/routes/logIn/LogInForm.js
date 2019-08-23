// @flow
import * as React from 'react';

export class LogInForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { email: '', password: '' };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const variables = {
      input: this.state,
    };

    console.log('variables:', variables);

    this.props.logIn({ variables });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          value={this.state.name}
          onChange={(e) => this.setState({ email: e.target.value })}
          placeholder='Email'
          name='email'
          type='text'
        />
        <input
          value={this.state.password}
          onChange={(e) => this.setState({ password: e.target.value })}
          placeholder='Password'
          name='password'
          type='password'
        />
        <button type='submit' disabled={this.props.loading}>Log In</button>
      </form>
    )
  }
}
