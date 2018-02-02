import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

import store from './store';
import Login from './app/components/login';
import './index.css';


//render the app
ReactDOM.render(
    <Provider store={store}>
        <Login />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();

