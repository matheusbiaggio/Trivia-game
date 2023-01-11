import React, { Component } from 'react';

class FormLogin extends Component {
  state = {
    email: '',
    name: '',
    buttonEnabled: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, this.handleEnable);
  };

  handleEnable = () => {
    const { email, name } = this.state;
    const verify = email.length > 0 && name.length > 0;
    this.setState({
      buttonEnabled: verify,
    });
  };

  render() {
    const { email, name, buttonEnabled } = this.state;
    return (
      <form>
        <label htmlFor="email">
          <input
            onChange={ this.handleChange }
            value={ email }
            name="email"
            data-testid="input-gravatar-email"
            placeholder="email..."
            id="email"
            type="email"
          />
        </label>

        <label htmlFor="name">
          <input
            onChange={ this.handleChange }
            value={ name }
            name="name"
            data-testid="input-player-name"
            placeholder="name..."
            id="name"
            type="name"
          />
        </label>

        <button
          disabled={ !buttonEnabled }
          data-testid="btn-play"
          type="button"
        >
          Play

        </button>

      </form>
    );
  }
}

export default FormLogin;
