import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FeedbackCard from '../components/FeedbackCard';
import Header from '../components/Header';
import '../styles/Feedback.css';

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
      <>
        <Header />
        <div className="container-feedback">
          <div className="container-content">
            <p
              data-testid="feedback-text"
              className={ assertions < NUMBER_THREE ? 'worst' : 'better' }
            >
              {
                assertions < NUMBER_THREE ? 'Could be better...' : 'Well Done!'
              }
            </p>
            <FeedbackCard />
            <div className="container-feedback-btn">
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
          </div>
        </div>
      </>
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
