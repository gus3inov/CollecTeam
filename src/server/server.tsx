import * as Koa from 'koa';
import * as config from 'config';
import * as session from 'koa-session';
import * as RedisStore from 'koa-redis';
import * as logger from 'koa-logger';
import * as cookiesMiddleware from 'universal-cookie-koa';
import * as serve from 'koa-static';

import routesModules from '@server/routes';
import passportInit from '@server/libs/passport';
import err from '@server/middlewares/error';
import client from '@server/middlewares/client';

const serverPort = config.get('dev.serverPort');
const app = new Koa();
const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:4000' : '/';

app.use(logger());
app.use(err);

app.keys = ['your-session-secret'];
app.use(cookiesMiddleware());

app.use(session({
	store: new RedisStore(),
}, app));

app.use(serve(__dirname + '\\public'));

import '@server/authenticate/init';

passportInit(app);

routesModules(app);

client(app, assetUrl);

app.listen(serverPort);

console.log(`server listen on port ${serverPort}`);
