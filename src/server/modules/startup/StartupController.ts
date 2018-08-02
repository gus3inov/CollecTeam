import Router from '@server/core/RouteGenerator';
import { Context, ErrorStatus, Next } from '@server/interfaces/IKoa';
import checkAuth from '@server/middlewares/checkAuth';
import * as convert from 'koa-convert';
import * as KoaBody from 'koa-body';
import * as bodyParser from 'koa-bodyparser';

const koaBody = convert(KoaBody());

class StartupController extends Router {

	private model: IStartupModel;

	constructor(model: IStartupModel) {
		super();
		this.model = model;
		this.actionCreate();
		this.actionGetAll();
		this.actionGet();
		this.actionChange();
		this.actionDelete();
	}

	public getRoutes(): any {
		return this.listenRoutes();
	}

	public getMethods(): any {
		return this.allowedMethods();
	}

	public actionCreate() {
		this.post('/api/startup', koaBody, checkAuth, async (ctx: Context, next: Next) => {
			ctx.status = ErrorStatus.Created;
			const startup = await this.model.create(ctx.request.body);
			ctx.body = startup;

			await next();
		});
	}

	public actionGetAll() {
		this.get('/api/startups', bodyParser(), checkAuth, async (ctx: Context, next: Next) => {
			const userId = ctx.body.user.id;
			const result: Array<object> = await this.model.privateGetAll(userId);
			ctx.body = result[0];
			await next();
		});
	}

	public actionGet() {
		this.get('/api/startup/:name', checkAuth, async <RequestStats>(ctx: Context, next: Next) => {
			const result: Array<object> = await this.model.findByStartupName(ctx.params.name);

			if (result) {
				ctx.body = result[0];
			} else {
				ctx.status = ErrorStatus.NoContent;
			}

			await next();
		});
	}

	public actionChange() {
		this.put('/api/startup/:id', bodyParser(), checkAuth, async <RequestStats>(ctx: Context, next: Next) => {
			ctx.status = ErrorStatus.NoContent;
			const userId = ctx.body.user.id;
			await this.model.update(ctx.params.id, userId, ctx.request.body);

			await next();
		});
	}

	public actionDelete() {
		this.delete('/api/startup/:id', bodyParser(), checkAuth, async <RequestStats>(ctx: Context, next: Next) => {
			ctx.status = ErrorStatus.NoContent;
			const userId = ctx.body.user.id;
			await this.model.remove(ctx.params.id, userId);

			await next();
		});
	}

}

export default StartupController;
