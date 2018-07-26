import * as convert from 'koa-convert';
import * as KoaBody from 'koa-body';
import * as bodyParser from 'koa-bodyparser';

import Router from '../helpers/RouteGenerator';
import { IStartupModel } from '../models/Startup';
import { ContextStats, ErrorStatus, IRequest } from '../interfaces/IKoa';
import checkAuth, {default as checkAuth} from '../middlewares/checkAuth';

type RequestStats = IRequest;

const koaBody = convert(KoaBody());

class StartupController extends Router {

    private model: IStartupModel;

    constructor(model: IStartupModel){
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
        this.post('/api/startup', koaBody, checkAuth, async(ctx: ContextStats, next: any) => {
            ctx.status = ErrorStatus.Created;
            const startup = await this.model.create(ctx.request.body);

            ctx.body = startup;

        })
    }

    public actionGetAll () {
        this.get('/api/startups', bodyParser(), checkAuth, async(ctx: ContextStats, next: any) => {
                const userId = ctx.body.user.id;
                const result: Array<object> = await this.model.privateGetAll(userId);
                ctx.body = result[0];
        });
    }

    public actionGet () {
        this.get('/api/startup/:name', checkAuth,async(ctx: ContextStats, next: any) => {
            let result: Array<object> = await this.model.findByStartupName(ctx.params.name);

            if (result) {
                ctx.body = result[0];
            } else {
                ctx.status = ErrorStatus.NoContent;
            }
        });
    }

    public actionChange () {
        this.put('/api/startup/:id', bodyParser(), checkAuth, async <RequestStats> (ctx: ContextStats, next: any) => {
            ctx.status = ErrorStatus.NoContent;
            const userId = ctx.body.user.id;
            await this.model.update(ctx.params.id, userId, ctx.request.body);
        })
    }

    public actionDelete () {
        this.delete('/api/startup/:id', bodyParser(), checkAuth, async (ctx: ContextStats, next: any) => {
            ctx.status = ErrorStatus.NoContent;
            const userId = ctx.body.user.id;
            await this.model.remove(ctx.params.id, userid);
        })
    }

}

export default StartupController;
