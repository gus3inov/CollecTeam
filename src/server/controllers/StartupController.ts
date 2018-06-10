import * as convert from 'koa-convert';
import * as KoaBody from 'koa-body';
import * as passport from 'passport';

import Router from '../helpers/RouteGenerator';
import { IStartupModel } from '../models/Startup';
import { ContextStats, ErrorStatus, IRequest } from '../interfaces/IKoa';
import * as bodyParser from 'koa-bodyparser';
import * as config from "config";
import User from '../models/User';
import * as jwt from "jsonwebtoken";

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
        this.post('/api/startup', koaBody, async(ctx: ContextStats, next: any) => {
            ctx.status = ErrorStatus.Created;
            console.log(ctx.request.body)
            const startup = await this.model.create(ctx.request.body);

            ctx.body = startup;

        })
    }

    public actionGetAll () {
        this.get('/api/startups', bodyParser(), async(ctx: ContextStats, next: any) => {
            const user = new User();
            const jwtSecret = config.get('jwtSecret');

            if (!ctx.request.headers.authorization) {
                ctx.body = {
                    messageS: JSON.stringify(ctx.request.header)
                };

                return ctx.throw(401).end();
            }

            const token = ctx.request.headers.authorization.split(' ')[1];

            return jwt.verify(token, jwtSecret, async (err, decoded) => {

                const userId = decoded.sub;

                const result: Array<object> = await this.model.privateGetAll(userId);
                ctx.body = result[0];
            });

        });
    }

    public actionGet () {
        this.get('/api/startup/:name', async(ctx: ContextStats, next: any) => {
            let result: Array<object> = await this.model.findByStartupName(ctx.params.name);

            if (result) {
                ctx.body = result[0];
            } else {
                ctx.status = ErrorStatus.NoContent;
            }
        });
    }

    public actionChange () {
        this.put('/api/startup/:name', koaBody, async <RequestStats> (ctx: ContextStats, next: any) => {
            ctx.status = ErrorStatus.NoContent;

            await this.model.update(ctx.params.name, ctx.request.body);
        })
    }

    public actionDelete () {
        this.delete('/api/startup/:name', async (ctx: ContextStats, next: any) => {
            ctx.status = ErrorStatus.NoContent;

            await this.model.remove(ctx.params.name);
        })
    }

}

export default StartupController;
