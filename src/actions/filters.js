/* eslint-disable import/prefer-default-export */

export const setFilters = filters => ({
  type: 'SET_FILTERS',
  payload: filters,
});
export const clearFilters = () => ({
  type: 'CLEAR_FILTERS',
});
