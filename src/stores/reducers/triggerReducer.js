const initialState = {
  triggerNewData: Math.random()
};

export default function triggerReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_NEW_DATA': {
      const newTriggerNumber = Math.random();
      return {
        ...state,
        triggerNewData: newTriggerNumber
      };
    }
    default: {
      return state;
    }
  }
}
