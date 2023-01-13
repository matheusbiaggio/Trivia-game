import { STOP_TIMER, TIMER_OVER } from '../actions';

const INITIAL_STATE = {
  timerOver: false,
  stoppedTimer: 0,
};

const timerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TIMER_OVER:
    return ({
      ...state,
      timerOver: true,
    });
  case STOP_TIMER:
    return {
      ...state,
      stoppedTimer: action.payload,
    };
  default:
    return state;
  }
};

export default timerReducer;
