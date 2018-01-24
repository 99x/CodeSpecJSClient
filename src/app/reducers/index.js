import { combineReducers } from 'redux';
import CreateTestReducer from './createTestReducer';

import { reducer as reduxFormReducer } from 'redux-form';
import NavigationReducer from './navigationReducer';
// import ShowTestsReducer from './showTestsReducer';

const allReducers = combineReducers({
    form: reduxFormReducer,
    createTestReducer: CreateTestReducer,
    navigation: NavigationReducer
});

export default allReducers;
