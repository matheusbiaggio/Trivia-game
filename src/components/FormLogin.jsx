import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { actionSaveUserInfo } from '../redux/actions';

class FormLogin extends Component {
  state = {
    email: '',
    name: '',
    buttonEnabled: false,
  };

  APIRequired = async () => {
    const requireApi = await fetch('https://opentdb.com/api_token.php?command=request');
    const tokenApi = await requireApi.json();
    localStorage.setItem('token', tokenApi.token);
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

  handleClick = () => {
    const { email, name } = this.state;
    const { dispatch, history } = this.props;
    const hash = md5(email).toString();
    dispatch(actionSaveUserInfo({ name, email, hash }));
    this.APIRequired();
    history.push('/game');
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
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(FormLogin);
