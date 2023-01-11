import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormLogin from '../components/FormLogin';

class Login extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <FormLogin history={ history } />
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default connect()(Login);
