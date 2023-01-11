import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormLogin from '../components/FormLogin';

class Login extends Component {
  render() {
    return (
      <div>
        <FormLogin />
      </div>
    );
  }
}

export default connect()(Login);
