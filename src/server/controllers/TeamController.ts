import * as convert from 'koa-convert';
import * as KoaBody from 'koa-body';
import * as bodyParser from 'koa-bodyparser';

import Router from '../helpers/RouteGenerator';
import { ITeamModel } from '../models/Team';
import { ContextStats, ErrorStatus, IRequest } from '../interfaces/IKoa';
import checkAuth from '../middlewares/checkAuth';

type RequestStats = IRequest;

const koaBody = convert(KoaBody());

class TeamController extends Router {

    private model: ITeamModel;

    constructor(model: ITeamModel){
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
        this.post('/api/team', koaBody, checkAuth, async(ctx: ContextStats, next: any) => {
            ctx.status = ErrorStatus.Created;
            console.log(ctx.request.body)
            const team = await this.model.create(ctx.request.body);

            ctx.body = team;
        })
    }

    public actionGetAll () {
        this.get('/api/teams', bodyParser(), checkAuth, async(ctx: ContextStats, next: any) => {
            const userId = ctx.body.user.id;
            console.log(userId);
            const result: Array<object> = await this.model.getAll(userId);
            ctx.body = result[0];
            console.log(ctx.body)
        });
    }

    public actionGet () {
        this.get('/api/team/:name', bodyParser(), checkAuth, async(ctx: ContextStats, next: any) => {
            let result: Array<object> = await this.model.findByTeamName(ctx.params.name);

            if (result) {
                ctx.body = result[0];
            } else {
                ctx.status = ErrorStatus.NoContent;
            }
        });
    }

    public actionChange () {
        this.put('/api/team/edit', bodyParser(), checkAuth, async <RequestStats> (ctx: ContextStats, next: any) => {
            ctx.status = ErrorStatus.NoContent;

            await this.model.update(ctx.params.name, ctx.request.body);
        })
    }

    public actionDelete () {
        this.delete('/api/team/delete', bodyParser(), checkAuth, async (ctx: ContextStats, next: any) => {
            ctx.status = ErrorStatus.NoContent;

            await this.model.remove(ctx.params.id);
        })
    }

}

export default TeamController;
