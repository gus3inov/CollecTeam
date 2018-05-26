import * as Koa from 'koa';
import * as config from 'config';
import * as session from 'koa-session';
import * as RedisStore from 'koa-redis';
import * as bodyParser from 'koa-bodyparser';
import * as React from 'react';
import * as ReactDomServer from 'react-dom/server';
import {StaticRouter, matchPath} from 'react-router-dom';
import {Provider} from 'react-redux';
import * as logger from 'koa-logger';

import err from './middlewares/error';
import UserController from './controllers/UserController';
import User from './models/User';
import passportInit from './libs/passport'
import store from '../client/redux';
import App from '../client/App';
import routes from '../client/components/routes';

const serverPort = config.get('dev.serverPort');
const app = new Koa();
const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:4000' : '/';

const userModel = new User();
const userController = new UserController(userModel);

app.use(logger());
app.use(err);

app.keys = ['your-session-secret'];

app.use(session({
    store: new RedisStore()
}, app));

// app.use(jwt({ secret: config.get('jwtSecret') }));
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
                        <App/>
                    </Provider>
                </StaticRouter>
    );

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
