export const SAVE_USER_INFO = 'SAVE_USER_INFO';
export const TIMER_OVER = 'TIMER_OVER';
export const STOP_TIMER = 'STOP_TIMER';
export const CORRECT_ANSWER = 'CORRECT_ANSWER';
export const TIMER_RESTART = 'TIMER_RESTART';

export const actionSaveUserInfo = (payload) => ({
  type: SAVE_USER_INFO,
  payload,
});

export const actionTimerOver = () => ({
  type: TIMER_OVER,
});

export const actionTimerRestart = () => ({
  type: TIMER_RESTART,
});

export const actionStopTimer = (payload) => ({
  type: STOP_TIMER,
  payload,
});

export const actionCorrectAnswer = (payload) => ({
  type: CORRECT_ANSWER,
  payload,
});
