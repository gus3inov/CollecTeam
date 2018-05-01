import * from 'koa';
import * as config 'config';

import err from './middlewares/error';
import { routes, allowedMethods } from './middlewares/routes'
import { init, mysqlPromise, redis } from './libs/dbs'

const initDb = init();

console.log(initDb)