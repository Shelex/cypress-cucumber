const filters = (state = {}, action) => {
  switch (action.type) {
    case 'SET_FILTERS':
      return action.payload;
    case 'CLEAR_FILTERS':
      return {};
    default:
      return state;
  }
};

export default filters;
