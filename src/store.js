import { createStore, applyMiddleware } from 'redux';
// import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import allReducers from './app/reducers/index';
// import mySaga from './app/sagas/index'


//create saga middleware
// const sagaMiddleware = createSagaMiddleware()

//mount middlewares on the store
const store = createStore(
    allReducers,
    {},
    applyMiddleware(logger)
);

//run the saga
// sagaMiddleware.run(mySaga)

export default store