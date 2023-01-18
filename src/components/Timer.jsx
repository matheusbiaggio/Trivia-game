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

  async componentDidUpdate() {
    const { timer } = this.state;
    const { dispatch, answered, event, sumPoints } = this.props;

    if (answered) {
      clearInterval(this.timer);

      await dispatch(actionStopTimer(timer));

      const isCorrect = event && event.target.className.includes('green');
      if (isCorrect) sumPoints();
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
    return (
      <div>{timer}</div>
    );
  }
}

Timer.propTypes = {
  answered: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  event: PropTypes.shape({
    target: PropTypes.shape({
      className: PropTypes.string,
    }),
  }),
  sumPoints: PropTypes.func.isRequired,
};

Timer.defaultProps = {
  event: undefined,
};

export default connect()(Timer);
