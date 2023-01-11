import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';

const NUMBER_TWO = 2;
const NUMBER_THREE = 3;
const NUMBER_FOUR = 4;

class Game extends Component {
  state = {
    questions: [],
    index: 0,
  };

  componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');

    const apiResponse = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = (await apiResponse.json());

    if (data.response_code === NUMBER_THREE) {
      localStorage.removeItem('token');
      history.push('/');
    }

    this.setState({ questions: data.results });
  };

  createQuestionElement = ({
    type,
    category,
    question,
    incorrect_answers: incorrect,
    correct_answer: correct,
  }) => {
    if (type === 'boolean') {
      const twoRandomNumbers = this.randomNumbers(NUMBER_TWO);

      const answers = [(
        <button
          data-testid={ correct === 'True' ? 'wrong-answer-0' : 'correct-answer' }
          type="button"
          key="false"
        >
          False
        </button>
      ),
      (
        <button
          key="true"
          data-testid={ correct === 'True' ? 'correct-answer' : 'wrong-answer-0' }
          type="button"
        >
          True
        </button>
      )];

      return (
        <div>
          <p data-testid="question-category">{ category }</p>
          <p data-testid="question-text">{ question }</p>
          <div data-testid="answer-options">
            { answers.map((_, index) => answers[twoRandomNumbers[index]]) }
          </div>
        </div>
      );
    }

    const incorrectAnswers = incorrect
      .map((answer, index) => (
        <button
          key={ `${answer[0]}${index}` }
          type="button"
          data-testid={ `wrong-answer-${index}` }
        >
          { answer }
        </button>
      ));

    const correctAnswer = [...incorrectAnswers, (
      <button
        key="correct-answer"
        type="button"
        data-testid="correct-answer"
      >
        { correct }
      </button>
    )];

    const fourRandomNumbers = this.randomNumbers(NUMBER_FOUR);

    return (
      <div>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <div data-testid="answer-options">
          {
            correctAnswer.map((_answer, index) => correctAnswer[fourRandomNumbers[index]])
          }
        </div>
      </div>
    );
  };

  randomNumbers = (quantity) => {
    const numbers = [];

    while (numbers.length < quantity) {
      const number = Math.floor(Math.random() * quantity);
      if (!numbers.includes(number)) numbers.push(number);
    }

    return numbers;
  };

  render() {
    const { index, questions } = this.state;
    return (
      <div>
        <Header />
        { Boolean(questions.length) && this.createQuestionElement(questions[index]) }
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Game;
