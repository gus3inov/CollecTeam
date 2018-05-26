import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './client/css/bootstrap.css';
import './client/css/main.css';
import App from './client/App';
import {ConnectedRouter} from 'react-router-redux';
import {Provider} from 'react-redux';
import history from './client/helpers/history';
import store from './client/redux';
import {BrowserRouter as Router} from 'react-router-dom'

const supportsHistory = 'pushState' in window.history

ReactDOM.hydrate(
    <Router forceRefresh={!supportsHistory}>
        <Provider store={store}>
            <App/>
        </Provider>
    </Router>,
    document.getElementById('root') as HTMLElement
);
