export const SAVE_USER_INFO = 'SAVE_USER_INFO';
export const TIMER_OVER = 'TIMER_OVER';

export const actionSaveUserInfo = (payload) => ({
  type: SAVE_USER_INFO,
  payload,
});

export const actionTimerOver = () => ({
  type: TIMER_OVER,
});
