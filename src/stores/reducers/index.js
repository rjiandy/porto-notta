import { combineReducers } from 'redux';

import registerReducers from './registerStore';
import triggerReducers from './triggerReducer';

const reducers = {
  authStore: () => null,
  registerStore: registerReducers,
  triggerStore: triggerReducers
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
