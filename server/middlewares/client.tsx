import * as React from 'react';
import * as ReactDomServer from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {CookiesProvider} from 'react-cookie';
import {renderRoutes} from 'react-router-config';

import {Next} from '@server/interfaces/IKoa';
import {cookies} from '@client/helpers/cookies';
import store from '@client/redux';
import routes from '@client/components/routes';
import renderHTML from '@server/common/renderHTML';
import {blue} from '@material-ui/core/colors';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: blue,
		type: 'dark',
	},
});

const client = (app: any, assetUrl: string) => {
	app.use(async (ctx: any, next: Next) => {
		const context: any = {};

		const componentHTML = ReactDomServer.renderToString(
			<StaticRouter location={ctx.request.url} context={context}>
				<Provider store={store}>
					<CookiesProvider cookies={ctx.request.universalCookies}>
						<MuiThemeProvider theme={theme} sheetsManager={new Map()}>
							{ renderRoutes(routes) }
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
