import React from 'react';
import ReactDOM from 'react-dom';

import allReducers from './reducers/index';
import Header from './components/header';
import './index.css';

import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(allReducers, {}, applyMiddleware(logger));

ReactDOM.render(
    <Provider store={store}>
        <Header />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();

