import { combineReducers } from 'redux';
import CreateTestReducer from './createTestReducer';

import { reducer as reduxFormReducer } from 'redux-form';

const allReducers = combineReducers({
    form: reduxFormReducer,
    createTestReducer: CreateTestReducer

});

export default allReducers;
