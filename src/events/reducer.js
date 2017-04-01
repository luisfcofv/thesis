import { handleActions } from 'redux-actions';

import types from './actionTypes';

const initialState = {
  events: [],
};

export default handleActions({
  [types.ADD]: (state, action) => action.payload,
}, initialState);
