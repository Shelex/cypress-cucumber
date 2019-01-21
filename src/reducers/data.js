const data = (state = [], action) => {
  switch (action.type) {
    case 'SET_STAGE':
      return state.map((item) => {
        if (item.login.uuid !== action.payload.uuid) return item;
        return { ...item, hiringStage: action.payload.hiringStage };
      });
    default:
      return state;
  }
};

export default data;
