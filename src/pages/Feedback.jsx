import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FeedbackCard from '../components/FeedbackCard';
import Header from '../components/Header';

const NUMBER_THREE = 3;

class Feedback extends Component {
  redirectPlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  redirectRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertions } = this.props;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {
            assertions < NUMBER_THREE ? 'Could be better...' : 'Well Done!'
          }
        </p>
        <FeedbackCard />
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.redirectPlayAgain }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.redirectRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = ({ player: { assertions } }) => ({
  assertions,
});

export default connect(mapStateToProps)(Feedback);
