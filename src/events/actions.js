import types from './actionTypes';

const addEvents = payload => ({
  payload,
  type: types.ADD,
});

export default { addEvents };
