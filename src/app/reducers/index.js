import { combineReducers } from 'redux';
import CreateTestReducer from './createTestReducer';
import CreateObjectReducer from './createObjectReducer';

const allReducers = combineReducers({
    createTestReducer: CreateTestReducer,
    createObjectReducer: CreateObjectReducer
});

export default allReducers;
