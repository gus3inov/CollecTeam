import * as Koa from 'koa';
import * as config from 'config';
import err from './middlewares/error';
import UserController from './controllers/UserController';
import User from './models/User'
import passportInit from './libs/passport'
import * as session from 'koa-session';
import * as RedisStore from 'koa-redis';
import * as bodyParser from 'koa-bodyparser';
import * as serve from 'koa-static';
import * as path from 'path';

import * as React from 'react';
import * as ReactDomServer from 'react-dom/server';
import store from '../client/redux';
import { Provider } from 'react-redux';
import App from '../client/App';
import { StaticRouter } from 'react-router-dom';

const serverPort = config.get('dev.port');
const app = new Koa();
const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8000' : '/';

const userModel = new User();
const userController = new UserController(userModel);

app.use(err);

app.keys = ['your-session-secret'];

app.use(session({
    store: new RedisStore()
}, app));

// app.use(bodyParser());
app.use(serve(path.join(__dirname, '/public')));

import './authenticate/init';

passportInit(app);

app.use(userController.getRoutes());
app.use(userController.getMethods());

app.use(async (ctx, next) => {
    const context = {};

    const componentHTML = ReactDomServer.renderToString(

        <Provider store={store}>
                    <StaticRouter location={ctx.req.url}
                                  context={context}>
                            <App />
                    </StaticRouter>
                </Provider>
    );

    return ctx.res.end(renderHTML(componentHTML));
});

const renderHTML = (componentHTML: any) => {
    return `
    <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Collect Team</title>
          <link rel="stylesheet" href="${assetUrl}/static/css/styles.css">
      </head>
      <body>
        <div id="root">${componentHTML}</div>
        <script type="application/javascript" src="${assetUrl}/static/js/bundle.js"></script>
      </body>
    </html>
  `;
}

app.listen(serverPort);

console.log(`server listen on port ${serverPort}`)
