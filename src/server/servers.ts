import * from 'koa';
import * as config 'config';
import err from './middlewares/error';
import { routes, allowedMethods } from './middlewares/routes'