import types from './actionTypes';

export const setWorld = payload => ({
  payload,
  type: types.SET,
});

export default { setWorld };
