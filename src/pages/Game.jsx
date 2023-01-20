import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Timer from '../components/Timer';
import { actionCorrectAnswer, actionTimerRestart } from '../redux/actions';
import { setLocalStorage, fetchQuestions } from '../services';
import '../styles/Game.css';

const NEGATIVE_NUMBER_ONE = -1;
const NUMBER_THREE = 3;
const NUMBER_FOUR = 4;
const NUMBER_TEN = 10;
const correctAnswer = 'correct-answer';

class Game extends Component {
  state = {
    questions: [],
    index: 0,
    answered: false,
    resetTimer: true,
    questionsShuffled: [],
  };

  async componentDidMount() {
    this.getQuestions();
  }

  componentDidUpdate() {
    const { isOver, dispatch } = this.props;

    if (isOver) {
      this.handlerClickAnswer();
      dispatch(actionTimerRestart());
    }
  }

  getQuestions = async () => {
    const { history, url } = this.props;
    const token = localStorage.getItem('token');

    const APIResponse = await fetchQuestions(`${url}${token}`);

    if (APIResponse.response_code === NUMBER_THREE) {
      localStorage.removeItem('token');
      history.push('/');
    }

    this.setState({ questions: APIResponse.results }, this.shuffleQuestions);
  };

  handlerClickAnswer = (event) => {
    this.setState({ answered: true, event });
  };

  shuffleQuestions = () => {
    const { questions, index } = this.state;

    this.setState({ questionsShuffled: this.shuffleQuestionAnswers(questions[index]) });
  };

  shuffleQuestionAnswers = (question) => {
    const { incorrect_answers: incorrect, correct_answer: correct } = question;

    const array = [...incorrect, correct];

    const numbers = this.randomNumbers(array.length);

    const allAnswers = array.map((_, index) => array[numbers[index]]);

    return { ...question, allAnswers };
  };

  randomNumbers = (quantity) => {
    const numbers = [];

    while (numbers.length < quantity) {
      const number = Math.floor(Math.random() * quantity);
      if (!numbers.includes(number)) numbers.push(number);
    }

    return numbers;
  };

  handleClickNextLastQuestion = () => {
    const { history, name, hash, score } = this.props;
    history.push('/feedback');

    setLocalStorage(
      'ranking',
      [...JSON.parse(localStorage.getItem('ranking') ?? '[]'),
        { name, score, picture: `https://www.gravatar.com/avatar/${hash}` }],
    );
  };

  handleClickNext = () => {
    const { index } = this.state;

    if (index === NUMBER_FOUR) this.handleClickNextLastQuestion();

    this.setState((prevState) => ({
      index: prevState.index + 1,
      answered: false,
      resetTimer: false,
    }), () => {
      this.setState({ resetTimer: true });
      this.shuffleQuestions();
    });
  };

  sumPoints = () => {
    const { props: { stoppedTimer, dispatch }, state: { index, questions } } = this;
    const { difficulty } = questions[index];
    const difficulties = { easy: 1, medium: 2, hard: 3 };

    const total = NUMBER_TEN + (stoppedTimer * difficulties[difficulty]);

    dispatch(actionCorrectAnswer(total));
  };

  createAnswerButtons = (answer, index, answered) => {
    const { questionsShuffled: { correct_answer: correct } } = this.state;
    const { isOver } = this.props;

    return (
      <button
        disabled={ isOver || answered }
        onClick={ this.handlerClickAnswer }
        type="button"
        data-testid={ answer === correct
          ? correctAnswer : `wrong-answer-${index}` }
        key={ answer === correct ? correctAnswer : `wrong-answer-${index}` }
        className={ `answer ${answered && (answer === correct ? 'green' : 'red')}` }
      >
        { answer }
      </button>
    );
  };

  render() {
    const { answered, resetTimer, questionsShuffled, event } = this.state;
    const { category, question, allAnswers } = questionsShuffled;
    let index = NEGATIVE_NUMBER_ONE;

    return (
      <div className="container-game">
        <Header />
        <div className="title-trivia-game">Trivia</div>
        { resetTimer && <Timer
          answered={ answered }
          event={ event }
          sumPoints={ this.sumPoints }
        /> }
        { Boolean(allAnswers) && (
          <div>
            <p data-testid="question-category">{ category }</p>
            <p data-testid="question-text">{ question }</p>
            <div data-testid="answer-options">
              {
                allAnswers.map((answer) => {
                  if (answer !== questionsShuffled.correct_answer) index += 1;
                  return this.createAnswerButtons(answer, index, answered);
                })
              }
            </div>
          </div>
        ) }
        { answered && (
          <button
            className="next-btn"
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
  hash: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  isOver: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  stoppedTimer: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};

const mapStateToProps = ({ timer, player }) => ({
  isOver: timer.timerOver,
  stoppedTimer: timer.stoppedTimer,
  ...player,
});

export default connect(mapStateToProps)(Game);
