import * as React from 'react';
import * as ReactDomServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { renderRoutes } from 'react-router-config';

import { Context, Next } from '@server/interfaces/IKoa';
import { cookies } from '@client/helpers/cookies';
import store from '@client/redux';
import routes from '@client/components/routes';
import renderHTML from '@server/common/renderHTML';
import { blue, deepPurple, grey } from '@material-ui/core/colors';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: blue,
		primary2Color: '#2173B3',
		primary3Color: '#A9D2EB',
		accent1Color: '#ED3B3B',
		accent2Color: '#ED2B2B',
		accent3Color: '#F58C8C',
		accent: deepPurple,
		type: 'dark',
		alternateTextColor: grey[50],
	},
});

const client = (app: any, assetUrl: string) => {
	app.use(async (ctx: Context, next: Next) => {
		const context = {};

		const componentHTML = ReactDomServer.renderToString(
			<StaticRouter location={ctx.request.url} context={context}>
				<Provider store={store}>
					<CookiesProvider cookies={ctx.request.universalCookies}>
						<MuiThemeProvider theme={theme} sheetsManager={new Map()}>
							{renderRoutes(routes)}
						</MuiThemeProvider>
					</CookiesProvider>
				</Provider>
			</StaticRouter>
		);

		cookies.setCookies(ctx.request.universalCookies);

		if (context.url) {
			ctx.response.redirect(context.url);
		}

		return ctx.res.end(renderHTML(componentHTML, assetUrl));
	});
};

export default client;
