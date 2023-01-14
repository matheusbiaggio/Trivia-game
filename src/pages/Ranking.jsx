import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    if (localStorage.getItem('ranking')) {
      const localStorageRank = JSON.parse(localStorage.getItem('ranking'))
        .sort(({ score }, { score: score2 }) => score2 - score);

      this.setState({
        ranking: localStorageRank,
      });
    }
  }

  redirectHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          onClick={ this.redirectHome }
          data-testid="btn-go-home"
        >
          Home
        </button>
        <div>
          <ul>
            {ranking.map(({ name, score, picture }, index) => (
              <li
                key={ `${name}${index}` }
              >
                <p data-testid={ `player-name-${index}` }>
                  {name}
                </p>
                <p>
                  {'Score: '}
                  <span data-testid={ `player-score-${index}` }>
                    {score}
                  </span>
                </p>
                <img src={ picture } alt={ name } />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Ranking);
