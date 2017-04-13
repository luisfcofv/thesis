import types from './actionTypes';

const updateLocationSalience = payload => ({
  payload,
  type: types.UPDATE_LOCATION,
});

const updateTimeSalience = payload => ({
  payload,
  type: types.UPDATE_TIME,
});

export default { updateLocationSalience, updateTimeSalience };
