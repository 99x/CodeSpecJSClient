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

// store.dispatch({
//     type: "ADD_FEATURE",
//     payload: "feature description"

// });

// store.dispatch({
//     type: "ADD_SCENARIO",
//     payload: {
//         "description": "mock description blah blah"
//     }
// });

// store.dispatch({
//     type: "ADD_SCENARIO",
//     payload: {
//         "description": "mock 2 blah blah"
//     }
// });

// store.dispatch({
//     type: "ADD_STEP",
//     payload: {
//         "scenarioId": "1",
//         "description": "given navigate to URL"
//     }
// });

// store.dispatch({
//     type: "ADD_STEP",
//     payload: {
//         "scenarioId": "1",
//         "description": "then click on the button"
//     }
// });

// store.dispatch({
//     type: "ADD_SCENARIO",
//     payload: {
//         "description": "mock 3 blah blah"
//     }
// });

ReactDOM.render(
    <Provider store={store}>
        <Header />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();

