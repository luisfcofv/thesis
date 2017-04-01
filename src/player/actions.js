import types from './actionTypes';

const updateSocial = payload => ({
  payload,
  type: types.UPDATE_SOCIAL,
});

const updateLocations = payload => ({
  payload,
  type: types.UPDATE_LOCATIONS,
});

const updateGoals = payload => ({
  payload,
  type: types.UPDATE_GOALS,
});

export default { updateSocial, updateLocations, updateGoals };
