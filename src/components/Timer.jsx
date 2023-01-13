import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionStopTimer, actionTimerOver } from '../redux/actions';

const ONE_SECOND = 1000;

class Timer extends Component {
  state = {
    timer: 30,
  };

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate() {
    const { timer } = this.state;
    const { dispatch, answered } = this.props;

    if (answered) {
      clearInterval(this.timer);
      dispatch(actionStopTimer(timer));
    }

    if (timer === 0) {
      clearInterval(this.timer);
      dispatch(actionTimerOver());
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startTimer = () => {
    this.timer = setInterval(() => {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }, ONE_SECOND);
  };

  render() {
    const { timer } = this.state;
    const { number } = this.props;
    return (
      <div id={ number }>{timer}</div>
    );
  }
}

Timer.propTypes = {
  answered: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Timer);
