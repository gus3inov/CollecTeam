import * as Koa from 'koa';
import * as config from 'config';
import err from './middlewares/error';
import UserController from './controllers/UserController';
import User from './models/User'
import { DBConnect, mysqlPromise, redis } from './libs/dbs';

const serverPort = config.get('dev.port');
const app = new Koa();

const userModel = new User();
const userController = new UserController(userModel)

app.use(err);
app.use(userController.getRoutes());
app.use(userController.allowedMethods());

app.use(async (ctx, next) => {
    await next();

    ctx.body = ctx.request.body;
});

app.listen(serverPort);

console.log(`server listen on port ${serverPort}`)