import * as React from 'react';
import * as ReactDOM from 'react-dom';

import '@client/css/bootstrap.css';
import '@client/css/main.css';
import { Provider } from 'react-redux';
import store from '@client/redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes from '@client/components/routes';
import { CookiesProvider } from 'react-cookie';
import { getUniversalCookies } from '@client/helpers/cookies';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

const theme = createMuiTheme({
	palette: {
		primary: blue,
		type: 'dark',
	},
});

ReactDOM.hydrate(
	<Router>
		<Provider store={store}>
			<CookiesProvider cookies={getUniversalCookies()}>
				<MuiThemeProvider theme={theme}>
					{renderRoutes(routes)}
				</MuiThemeProvider>
			</CookiesProvider>
		</Provider>
	</Router>,
	document.getElementById('root') as HTMLElement
);
