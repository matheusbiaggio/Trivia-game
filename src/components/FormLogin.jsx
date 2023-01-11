import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormLogin extends Component {
  state = {
    email: '',
    name: '',
    buttonEnabled: false,
  };

  handleClick = async () => {
    const { history } = this.props;
    const requireApi = await fetch('https://opentdb.com/api_token.php?command=request');
    const tokenApi = await requireApi.json();
    console.log(history);
    return history.push('/game');
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
          onClick={ this.handleClick }
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

FormLogin.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default FormLogin;
