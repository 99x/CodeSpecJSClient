import { combineReducers } from 'redux';
import CreateTestReducer from './createTestReducer';

import { reducer as reduxFormReducer } from 'redux-form';
import NavigationReducer from './navigationReducer';
import loginReducer from './loginReducer';

const allReducers = combineReducers({
    form: reduxFormReducer,
    createTestReducer: CreateTestReducer,
    navigation: NavigationReducer,
    login: loginReducer
});

export default allReducers;
