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
import { MuiThemeProvider, createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';
import {deepPurple, blue, grey} from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: blue,
        primary1Color: blue,
        primary2Color: "#2173B3",
        primary3Color: "#A9D2EB",
        accent1Color: "#ED3B3B",
        accent2Color: "#ED2B2B",
        accent3Color: "#F58C8C",
        accent: deepPurple,
        type: 'dark',
        textColor: grey[50],
        alternateTextColor: grey[50],
    }
});

ReactDOM.hydrate(
    <Router>
        <Provider store={store}>
            <CookiesProvider store={getUniversalCookies()}>
                <MuiThemeProvider theme={theme}>
                    {renderRoutes(routes)}
                </MuiThemeProvider>
            </CookiesProvider>
        </Provider>
    </Router>,
    document.getElementById('root') as HTMLElement
);
