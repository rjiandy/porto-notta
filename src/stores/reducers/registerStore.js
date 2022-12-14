const initialState = {
  rekeningList: [],
  registerBankPayload: {
    data: {
      bank: {
        bank_image: ''
      }
    }
  }
};

export default function registerReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_REKENING_LIST': {
      return {
        ...state,
        rekeningList: action.payload.data.rekening,
        registerBankPayload: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
