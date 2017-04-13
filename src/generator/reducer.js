import { handleActions } from 'redux-actions';

import types from './actionTypes';

const initialState = {
  timeSalience: {
    high: 75,
    medium: 40,
  },
  locationSalience: {
    high: 75,
    medium: 40,
  },
};

export default handleActions({
  [types.UPDATE_TIME]: (state, action) => ({ ...state, timeSalience: action.payload }),
  [types.UPDATE_LOCATION]: (state, action) => ({ ...state, locationSalience: action.payload }),
}, initialState);
