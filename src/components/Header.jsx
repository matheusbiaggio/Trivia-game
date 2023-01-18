import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Game.css';

class Header extends Component {
  render() {
    const { hash, name, score } = this.props;
    return (
      <header>
        <img
          className="avatar"
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="avatar"
        />
        <h2
          className="gamer-name"
          data-testid="header-player-name"
        >
          <i
            className="fas fa-star"
          />
          <span>{name}</span>
        </h2>
        <p className="score">
          {'Score: '}
          <span data-testid="header-score">{score}</span>
        </p>

      </header>
    );
  }
}

Header.propTypes = {
  hash: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player: { hash, name, score } }) => ({
  hash,
  name,
  score,
});

export default connect(mapStateToProps)(Header);
