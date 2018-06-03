import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './client/css/bootstrap.css';
import './client/css/main.css';
import {ConnectedRouter} from 'react-router-redux';
import {Provider} from 'react-redux';
import store from './client/redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import routes from './client/components/routes';
import { CookiesProvider } from 'react-cookie';
import { getUniversalCookies } from './client/helpers/cookies'

ReactDOM.hydrate(
    <Router>
        <Provider store={store}>
            <CookiesProvider store={getUniversalCookies()}>
                {renderRoutes(routes)}
            </CookiesProvider>
        </Provider>
    </Router>,
    document.getElementById('root') as HTMLElement
);
