import * as convert from 'koa-convert';
import * as KoaBody from 'koa-body';
import * as passport from 'passport';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import * as util from 'util';

import Router from '../helpers/RouteGenerator';
import { IUserModel } from '../models/User';

interface ContextStats {
    status: number;
    body: object;
    params: object;
    request: object;
}

enum ErrorStatus{
    Created = 201,
    NoContent = 204
}

interface IRequest{
    body: any;
    id: number;
}

type RequestStats = IRequest;

const koaBody = KoaBody();

/***
 * @todo Сделать MV подобную архитектуру с контроллером, в качестве аргумента инстанса принемаемый экземлпяр модели
 */

class UserController extends Router {

    private model: IUserModel;

    constructor(model: IUserModel){
        super();
        this.model = model;
        this.actionCreate();
        this.actionGetAll();
        this.actionGet();
        this.actionChange();
        this.actionDelete();
        this.actionLogin();
        this.actionLogout();
    }

    public getRoutes (): any {
        return this.listenRoutes();
    }

    public getMethods (): any {
        return this.allowedMethods();
    }

    public actionCreate () {
        this.post('/api/user', koaBody, async(ctx: ContextStats, next: any) => {
            ctx.status = ErrorStatus.Created;
            // const imgAvatar = ctx.request.body.avatar;
            // ctx.body = {
            //     message: JSON.stringify(imgAvatar)
            // }
            // const reader = fs.createWriteStream(imgAvatar.path);
            // const stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()));
            // reader.pipe(stream);

            const userData = {
                username: ctx.request.body.username,
                firstName: ctx.request.body.firstName,
                lastName: ctx.request.body.lastName,
                password: ctx.request.body.password,
                email: ctx.request.body.email
            };

            const user = await this.model.create(userData);

            // return passport.authenticate('local', (err, user, info, status) => {
            //     if (user) {
            //         ctx.body = { success: true };
            //         return ctx.login(user);
            //     } else {
            //         ctx.status = 400;
            //         ctx.body = {
            //             status: status,
            //             user: user,
            //             info: info,
            //             error: err
            //         };
            //     }
            // })(ctx);
        })
    }

    public actionLogin () {
        this.post('/auth/login', async (ctx) => {
            return passport.authenticate('local', (err, user, info, status) => {
                if (user) {
                    ctx.body = { success: true };
                    return ctx.login(user);
                } else {
                    ctx.status = 400;
                    ctx.body = {
                        status: status,
                        user: user,
                        info: info,
                        error: err
                    };
                }
            })(ctx);
        });
    }

    public actionLogout () {
        this.get('/auth/logout', async (ctx) => {
            if (ctx.isAuthenticated()) {
                return ctx.logout();
            } else {
                ctx.body = { success: false };
                ctx.throw(401);
            }
        });
    }

    public actionGetAll () {
        this.get('/api/users', async(ctx: ContextStats, next: any) => {
            const result: Array<object> = await this.model.getAll();
            ctx.body = result[0];
        });
    }

    public actionGet () {
        this.get('/api/user/:username', async(ctx: ContextStats, next: any) => {
            let result: Array<object> = await this.model.findByUserName(ctx.params.username);

            if (result) {
                ctx.body = result[0];
            } else {
                ctx.status = ErrorStatus.NoContent;
            }
        });
    }

    public actionChange () {
        this.put('/api/user/:username', koaBody, async <RequestStats> (ctx: ContextStats, next: any) => {
            ctx.status = ErrorStatus.NoContent;

            await this.model.update(ctx.params.username, ctx.request.body);
        })
    }

    public actionDelete () {
        this.delete('/api/user/:username', async (ctx: ContextStats, next: any) => {
            ctx.status = ErrorStatus.NoContent;

            await this.model.remove(ctx.params.username);
        })
    }
}

export default UserController;
