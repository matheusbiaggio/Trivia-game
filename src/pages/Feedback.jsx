import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FeedbackCard from '../components/FeedbackCard';
import Header from '../components/Header';

const NUMBER_THREE = 3;

class Feedback extends Component {
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
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player: { assertions } }) => ({
  assertions,
});

export default connect(mapStateToProps)(Feedback);
