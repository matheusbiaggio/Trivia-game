import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormLogin from '../components/FormLogin';
import { actionResetGame } from '../redux/actions';
import '../styles/App.css';

class Login extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionResetGame());
  }

  render() {
    const { history } = this.props;
    return (
      <div className="container-login">
        <div>
          <FormLogin history={ history } />
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default connect()(Login);
