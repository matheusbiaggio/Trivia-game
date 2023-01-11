import { SAVE_USER_INFO } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  hash: '',
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
  default:
    return state;
  }
};

export default userReducer;