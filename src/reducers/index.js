import { combineReducers } from 'redux';
import ReducerCreate from './reducerCreate';

const allReducers = combineReducers({
    reducerCreate: ReducerCreate
});

export default allReducers;
