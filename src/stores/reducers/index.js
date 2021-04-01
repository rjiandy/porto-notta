import { combineReducers } from 'redux';

import registerReducers from './registerStore';

const reducers = {
  authStore: () => null,
  registerStore: registerReducers
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
