import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Timer from '../components/Timer';
import '../css/game.css';
import { actionCorrectAnswer } from '../redux/actions';

const NUMBER_TWO = 2;
const NUMBER_THREE = 3;
const NUMBER_FOUR = 4;
const NUMBER_TEN = 10;

class Game extends Component {
  state = {
    questions: [],
    index: 0,
    answered: false,
    resetTimer: false,
  };

  componentDidMount() {
    this.fetchQuestions();
  }

  componentDidUpdate() {
    const { isOver } = this.props;
    if (isOver) this.handlerClickAnswer();
  }

  handlerClickAnswer = (event) => {
    const incorrectAnswers = document.querySelectorAll('.incorrect');
    const correctAnswer = document.querySelector('.correct');

    correctAnswer.classList.add('green');

    incorrectAnswers.forEach((answer) => {
      answer.classList.add('red');
    });

    this.setState({ answered: true }, () => {
      if (!event.target.className.includes('incorrect')) this.sumPoints();
    });
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

  boolQuestion = ({
    category,
    question,
    correct_answer: correct,
  }) => {
    const { isOver } = this.props;
    const { answered } = this.state;
    const twoRandomNumbers = this.randomNumbers(NUMBER_TWO);

    const answers = [(
      <button
        disabled={ isOver || answered }
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
        disabled={ isOver || answered }
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
  };

  createQuestionElement = (ask) => {
    const {
      type,
      category,
      question,
      incorrect_answers: incorrect,
      correct_answer: correct,
    } = ask;
    const { isOver } = this.props;
    const { answered } = this.state;

    if (type === 'boolean') return this.boolQuestion(ask);

    const incorrectAnswers = incorrect
      .map((answer, index) => (
        <button
          disabled={ isOver || answered }
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
        disabled={ isOver || answered }
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
      resetTimer: true,
    }));
  };

  sumPoints = () => {
    setTimeout(() => {
      const { stoppedTimer, dispatch } = this.props;
      const { index, questions } = this.state;

      const { difficulty } = questions[index];

      let difficultyPoints;

      switch (difficulty) {
      case 'easy':
        difficultyPoints = 1;
        break;
      case 'medium':
        difficultyPoints = NUMBER_TWO;
        break;
      case 'hard':
        difficultyPoints = NUMBER_THREE;
        break;
      default:
        break;
      }

      console.log(difficulty);

      const total = NUMBER_TEN + (stoppedTimer * difficultyPoints);

      dispatch(actionCorrectAnswer(total));
    }, 100);
  };

  render() {
    const { index, questions, answered, resetTimer } = this.state;
    return (
      <div>
        <Header />

        { resetTimer ? <Timer answered={ answered } number="1" /> : <Timer answered={ answered } number="2" /> }

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
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  isOver: PropTypes.bool.isRequired,
  stoppedTimer: PropTypes.number.isRequired,
};

const mapStateToProps = ({ timer }) => ({
  isOver: timer.timerOver,
  stoppedTimer: timer.stoppedTimer,
});

export default connect(mapStateToProps)(Game);
