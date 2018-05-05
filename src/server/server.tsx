import * as Koa from 'koa';
import * as config from 'config';
import err from './middlewares/error';
import UserController from './controllers/UserController';
import User from './models/User'
import { DBConnect, mysqlPromise, redis } from './libs/dbs';

import * as React from 'react';
import * as ReactDomServer from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import App from '../client/App'

const serverPort = config.get('dev.port');
const app = new Koa();
const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8000' : '/';

// const userModel = new User();
// const userController = new UserController(userModel)

// app.use(err);
// app.use(userController.getRoutes());
// app.use(userController.allowedMethods());

app.use(async (ctx, next) => {

    // match({ routes, location: ctx.req.url }, ( error, redirectLocation, renderProps ) => {
    //     if (redirectLocation) { // Если необходимо сделать redirect
    //         return ctx.res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    //     }
    //
    //     if (error) { // Произошла ошибка любого рода
    //         return ctx.res.status(500).send(error.message);
    //     }
    //
    //     if (!renderProps) {
    //         return ctx.res.status(404).send('Not found');
    //     }
    //
    // })

    const componentHTML = ReactDomServer.renderToString(<App />);

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