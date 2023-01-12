import { TIMER_OVER } from '../actions';

const INITIAL_STATE = {
  timerOver: false,
};

const timerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TIMER_OVER:
    return ({
      timerOver: true,
    });
  default:
    return state;
  }
};

export default timerReducer;
