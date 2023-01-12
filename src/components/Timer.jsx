import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionTimerOver } from '../redux/actions';

const ONE_SECOND = 1000;

class Timer extends Component {
  state = {
    timer: 30,
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }, ONE_SECOND);
  }

  componentDidUpdate() {
    const { timer } = this.state;
    const { dispatch } = this.props;
    if (timer === 0) {
      clearInterval(this.timer);
      dispatch(actionTimerOver());
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { timer } = this.state;
    return (
      <div>{timer}</div>
    );
  }
}

Timer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Timer);
