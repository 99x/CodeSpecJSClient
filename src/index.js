import React from 'react';
import ReactDOM from 'react-dom';

import Header from './app/components/header';
import './index.css';

import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

import store from './store';

//render the app
ReactDOM.render(
    <Provider store={store}>
        <Header />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();

