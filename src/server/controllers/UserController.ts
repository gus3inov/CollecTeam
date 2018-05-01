import * as convert from 'koa-convert';
import * as koaBody from 'koa-body';

import Router from '../helpers/RouteGenerator';
import User, { IUserModel } from '../models/User';

interface ContextStats {
    status: number;
    body: any;
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

type RequestStats = IRequest

/***
 * @todo Сделать MV подобную архитектуру с контроллером, в качестве аргумента инстанса принемаемый экземлпяр модели
 */

class UserController extends Router {

    private user: IUserModel;

    constructor(){
        super();
        this.actionCreate();
        this.actionGetAll();
        this.actionGet();
        this.actionChange();
        this.actionDelete();

        super.listenRoutes();
    }

    public actionCreate () {
        this.post('/api/poster', koaBody, async(ctx: ContextStats, next: any) => {
            ctx.status = ErrorStatus.Created;

            const user = new User(ctx.request.body);

            ctx.body = user
        })
    }

    public actionGetAll () {
        this.get('/api/user', async(ctx: ContextStats, next: any) => {
            ctx.body = await User.getAll();
        });
    }

    public actionGet () {
        this.get('/api/user/:id', async(ctx: ContextStats, next: any) => {
            let result = await User.findIndentity(ctx.params.id);

            if (result) {
                ctx.body = result;
            } else {
                ctx.status = ErrorStatus.NoContent;
            }
        });
    }

    public actionChange () {
        this.put('/api/user/:id', koaBody, async <RequestStats> (ctx: ContextStats, next: any) => {
            ctx.status = ErrorStatus.NoContent;
            await User.update(ctx.params.id, ctx.request.body);
        })
    }

    public actionDelete () {
        this.delete('/api/user/:id', async (ctx: ContextStats, next: any) => {
            ctx.status = ErrorStatus.NoContent;
            await User.remove(ctx.params.id);
        })
    }
}