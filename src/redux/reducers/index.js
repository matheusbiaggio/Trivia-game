import { combineReducers } from 'redux';
import userReducer from './userReducer';
import timerReducer from './timerReducer';

const rootReducer = combineReducers({
  player: userReducer,
  timer: timerReducer,
});

export default rootReducer;
