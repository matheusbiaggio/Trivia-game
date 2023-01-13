import { CHANGE_URL, CORRECT_ANSWER, SAVE_USER_INFO } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  hash: '',
  url: 'https://opentdb.com/api.php?amount=5&category=&difficulty=&type=&token=',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_USER_INFO:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
      hash: action.payload.hash,
    };

  case CHANGE_URL:
    return {
      ...state,
      url: action.payload,
    };

  case CORRECT_ANSWER:
    return {
      ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default userReducer;
