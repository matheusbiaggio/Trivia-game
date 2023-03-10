import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionChangeUrl } from '../redux/actions';
import triviaCategories from '../services/triviaCategories';
import '../styles/Settings.css';

const NUMBER_FIFTY = 50;

class Settings extends Component {
  state = {
    difficulty: '',
    difficulties: ['easy', 'medium', 'hard'],
    category: '',
    categories: [],
    type: '',
    types: ['boolean', 'multiple'],
  };

  async componentDidMount() {
    this.setState({ categories: triviaCategories });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { difficulty, category, type } = this.state;
    const { dispatch, history } = this.props;
    const url = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=${type}&token=`;

    dispatch(actionChangeUrl(url));
    setTimeout(() => history.push('/'), NUMBER_FIFTY);
  };

  render() {
    const { difficulty, difficulties, category, categories, type, types } = this.state;
    return (
      <div className="container-settings">
        <form className="container-settings-content">
          <h1 data-testid="settings-title">Configurações</h1>
          <label htmlFor="difficulty">
            <span>Difficulty</span>
            <select
              name="difficulty"
              id="difficulty"
              value={ difficulty }
              onChange={ this.handleChange }
            >
              <option hidden defaultValue>Dificuldade</option>

              { difficulties.map((dif) => (
                <option
                  key={ dif }
                  value={ dif }
                >
                  { dif }
                </option>
              )) }
            </select>
          </label>

          <label htmlFor="category">
            <span>Category</span>
            <select
              name="category"
              id="category"
              value={ category }
              onChange={ this.handleChange }
            >
              <option hidden defaultValue>Categoria</option>

              { categories.map(({ name, id }) => (
                <option
                  key={ name }
                  value={ id }
                >
                  { name }
                </option>
              )) }
            </select>
          </label>
          <label htmlFor="type">
            <span>Type</span>
            <select
              name="type"
              id="type"
              value={ type }
              onChange={ this.handleChange }
            >
              <option hidden defaultValue>Tipo</option>

              { types.map((typ) => (
                <option
                  key={ typ }
                  value={ typ }
                >
                  { typ }
                </option>
              )) }
            </select>
          </label>

          <button
            type="button"
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

Settings.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Settings);
