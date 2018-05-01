import * as Koa from 'koa';
import * as config from 'config';

import err from './middlewares/error';
import { routes, allowedMethods } from './middlewares/routes';
import { DBConnect, mysqlPromise, redis } from './libs/dbs';

import User from './models/User'

const user = new User({
    username: 'gus3infsdfaov',
    lastName: 'Guseinov',
    firstName: 'Muslim',
    password: '23123131233',
    email: 'gusejnov@mail.ru'
})

user.create().then(res => {
    console.log(res)
})

// const dbConnect = new DBConnect;
//
// console.log(dbConnect.init())