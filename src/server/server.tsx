import * as Koa from 'koa';
import * as config from 'config';
import * as session from 'koa-session';
import * as RedisStore from 'koa-redis';
import * as bodyParser from 'koa-bodyparser';
import * as React from 'react';
import * as ReactDomServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as logger from 'koa-logger';
import { renderRoutes } from 'react-router-config';
import * as cookiesMiddleware from 'universal-cookie-koa';
import { CookiesProvider } from 'react-cookie';
import { cookies } from '../client/helpers/cookies'

import err from './middlewares/error';
import UserController from './controllers/UserController';
import User from './models/User';
import passportInit from './libs/passport'
import store from '../client/redux';
import routes from '../client/components/routes';

const serverPort = config.get('dev.serverPort');
const app = new Koa();
const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:4000' : '/';

const userModel = new User();
const userController = new UserController(userModel);

app.use(logger());
app.use(err);

app.keys = ['your-session-secret'];
app.use(cookiesMiddleware());

app.use(session({
    store: new RedisStore()
}, app));

app.use(bodyParser());

import './authenticate/init';

passportInit(app);

app.use(userController.getRoutes());
app.use(userController.getMethods());

app.use(async (ctx, next) => {
    const context = {};
    console.log('ctx.request.url ---- ', ctx.request.url)
    const componentHTML = ReactDomServer.renderToString(
        <StaticRouter location={ctx.request.url} context={context}>
                            <Provider store={store}>
                                <CookiesProvider cookies={ctx.request.universalCookies}>
                                    {renderRoutes(routes)}
                                </CookiesProvider>
                            </Provider>
                </StaticRouter>
    );

    cookies.setCookies(ctx.request.universalCookies);

    console.log('context ----- ', context)

    if (context.url) {
        ctx.response.redirect(context.url)
    }

    return ctx.res.end(renderHTML(componentHTML));
});

const renderHTML = (componentHTML: any) => {
    return `
    <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href="//cdn.materialdesignicons.com/2.3.54/css/materialdesignicons.min.css" media="all" rel="stylesheet" type="text/css" />
          <link href="https://fonts.googleapis.com/css?family=Alegreya+SC" rel="stylesheet">
          <title>Collect Team</title>
      </head>
      <body>
        <div id="root">${componentHTML}</div>
        <script type="application/javascript" src="${assetUrl}/static/js/bundle.js"></script>
      </body>
    </html>
  `;
};

app.listen(serverPort);

console.log(`server listen on port ${serverPort}`);
