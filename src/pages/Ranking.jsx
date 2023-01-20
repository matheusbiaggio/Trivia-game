import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Ranking.css';

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
      <div className="container-ranking">
        <div className="container-ranking-content">
          <h1 data-testid="ranking-title">Ranking</h1>
          <ul>
            {ranking.map(({ name, score, picture }, index) => (
              <li
                key={ `${name}${index}` }
              >
                <img src={ picture } alt={ name } />
                <div>
                  <p data-testid={ `player-name-${index}` }>
                    {name}
                  </p>
                  <p>
                    {'Score: '}
                    <span data-testid={ `player-score-${index}` }>
                      {score}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={ this.redirectHome }
            data-testid="btn-go-home"
          >
            Home
          </button>
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
