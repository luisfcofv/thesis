import { handleActions } from 'redux-actions';

import types from './actionTypes';

const initialState = {
  world: {},
};

export default handleActions({
  [types.SET]: (state, action) => action.payload,
}, initialState);
