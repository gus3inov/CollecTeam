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
import { renderRoutes } from 'react-router-config';
import routes from './client/components/routes'

const supportsHistory = 'pushState' in window.history

ReactDOM.hydrate(
    <Router forceRefresh={!supportsHistory}>
        <Provider store={store}>
            {renderRoutes(routes)}
        </Provider>
    </Router>,
    document.getElementById('root') as HTMLElement
);
