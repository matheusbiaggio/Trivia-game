import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class FeedbackCard extends Component {
  render() {
    const { assertions, score } = this.props;
    return (
      <div>
        <p>
          {'Você acertou '}
          <span
            data-testid="feedback-total-question"
          >
            { assertions }
          </span>
          {' perguntas!'}
        </p>
        <p>
          {'Você fez '}
          <span
            data-testid="feedback-total-score"
          >
            { score }
          </span>
          {' pontos!'}
        </p>
      </div>
    );
  }
}

FeedbackCard.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player: { assertions, score } }) => ({
  assertions,
  score,
});

export default connect(mapStateToProps)(FeedbackCard);
