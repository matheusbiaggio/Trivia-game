import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Timer from '../components/Timer';
import '../css/game.css';

const NUMBER_TWO = 2;
const NUMBER_THREE = 3;
const NUMBER_FOUR = 4;

class Game extends Component {
  state = {
    questions: [],
    index: 0,
    answered: false,
  };

  componentDidMount() {
    this.fetchQuestions();
  }

  componentDidUpdate() {
    const { isOver } = this.props;
    if (isOver) this.handlerClickAnswer();
  }

  handlerClickAnswer = () => {
    const incorrectAnswers = document.querySelectorAll('.incorrect');
    const correctAnswer = document.querySelector('.correct');
    correctAnswer.classList.add('green');
    incorrectAnswers.forEach((answer) => {
      answer.classList.add('red');
    });
    this.setState({ answered: true });
  };

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
    const { isOver } = this.props;
    if (type === 'boolean') {
      const twoRandomNumbers = this.randomNumbers(NUMBER_TWO);
      const answers = [(
        <button
          disabled={ isOver }
          onClick={ this.handlerClickAnswer }
          data-testid={ correct === 'True' ? 'wrong-answer-0' : 'correct-answer' }
          className={ correct === 'True' ? 'incorrect' : 'correct' }
          type="button"
          key="false"
        >
          False
        </button>
      ),
      (
        <button
          disabled={ isOver }
          className={ correct === 'True' ? 'correct' : 'incorrect' }
          onClick={ this.handlerClickAnswer }
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
          disabled={ isOver }
          className={ correct === 'True' ? 'correct' : 'incorrect' }
          onClick={ this.handlerClickAnswer }
          key={ `${answer[0]}${index}` }
          type="button"
          data-testid={ `wrong-answer-${index}` }
        >
          { answer }
        </button>
      ));

    const correctAnswer = [...incorrectAnswers, (
      <button
        disabled={ isOver }
        className={ correct === 'True' ? 'incorrect' : 'correct' }
        onClick={ this.handlerClickAnswer }
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

  handleClickNext = () => {
    const { index } = this.state;
    const { history } = this.props;
    if (index === NUMBER_FOUR) history.push('/feedback');

    const incorrectAnswers = document.querySelectorAll('.incorrect');
    const correctAnswer = document.querySelector('.correct');
    correctAnswer.classList.remove('green');

    incorrectAnswers.forEach((answer) => {
      answer.classList.remove('red');
    });

    this.setState((prevState) => ({
      index: prevState.index + 1,
      answered: false,
    }));
  };

  render() {
    const { index, questions, answered } = this.state;
    return (
      <div>
        <Header />
        <Timer />
        { Boolean(questions.length) && this.createQuestionElement(questions[index]) }
        { answered && (
          <button
            onClick={ this.handleClickNext }
            data-testid="btn-next"
            type="button"
          >
            Next
          </button>
        ) }
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  isOver: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ timer }) => ({
  isOver: timer.timerOver,
});

export default connect(mapStateToProps)(Game);
