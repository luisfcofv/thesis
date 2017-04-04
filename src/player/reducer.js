import { handleActions } from 'redux-actions';

import types from './actionTypes';

const initialState = {
  locations: [],
  goals: [],
  social: [],
  stateLocation: 0,
};

export default handleActions({
  [types.UPDATE_LOCATIONS]: (state, action) => ({ ...state, locations: action.payload }),
  [types.UPDATE_GOALS]: (state, action) => ({ ...state, goals: action.payload }),
  [types.UPDATE_SOCIAL]: (state, action) => ({ ...state, social: action.payload }),
  [types.UPDATE_STATE_LOCATION]: (state, action) => ({ ...state, stateLocation: action.payload }),
}, initialState);
