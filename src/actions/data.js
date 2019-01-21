/* eslint-disable import/prefer-default-export */

export const setHiringStage = (uuid, hiringStage) => ({
  type: 'SET_STAGE',
  payload: { uuid, hiringStage },
});
