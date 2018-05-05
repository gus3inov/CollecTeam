import * as convert from 'koa-convert';
import * as KoaBody from 'koa-body';

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

type RequestStats = IRequest

const koaBody = convert(KoaBody());


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
    }

    public getRoutes (): any {
        return this.listenRoutes();
    }

    public getMethods (): any {
        return this.allowedMethods();
    }

    public actionCreate () {
        this.post('/api/user', koaBody, async(ctx: ContextStats, next: any) => {
            console.log('create', ctx.request)
            ctx.status = ErrorStatus.Created;

            const user = this.model.create(ctx.request.body);

            ctx.body = user
        })
    }

    public actionGetAll () {
        this.get('/api/users', async(ctx: ContextStats, next: any) => {
            const result = await this.model.getAll();
            ctx.body = result[0];
        });
    }

    public actionGet () {
        this.get('/api/user/:username', async(ctx: ContextStats, next: any) => {
            let result = await this.model.findByUserName(ctx.params.username);
            console.log('get ----', ctx.params.username)
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
            console.log('body ----', ctx.request.body)
            await this.model.update(ctx.params.username, ctx.request.body);
        })
    }

    public actionDelete () {
        this.delete('/api/user/:username', async (ctx: ContextStats, next: any) => {
            console.log(ctx.params.username)
            ctx.status = ErrorStatus.NoContent;
            await this.model.remove(ctx.params.username);
        })
    }
}

export default UserController;