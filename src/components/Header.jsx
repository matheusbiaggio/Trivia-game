import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { hash, name, score } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="avatar"
        />
        <h2
          data-testid="header-player-name"
        >
          {name}
        </h2>
        <p>
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
