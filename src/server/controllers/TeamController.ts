import Router from '@core/RouteGenerator';
import { ITeamModel } from '@server/models/Team';
import { Context, ErrorStatus, Next } from '@server/interfaces/IKoa';
import checkAuth from '@server/middlewares/checkAuth';
import * as convert from 'koa-convert';
import * as KoaBody from 'koa-body';
import * as bodyParser from 'koa-bodyparser';

const koaBody = convert(KoaBody());

class TeamController extends Router {

	private model: ITeamModel;

	constructor(model: ITeamModel) {
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
		this.post('/api/team', koaBody, checkAuth, async (ctx: Context, next: Next) => {
			ctx.status = ErrorStatus.Created;
			const team = await this.model.create(ctx.request.body);
			ctx.body = team;
			await next();
		});
	}

	public actionGetAll() {
		this.get('/api/teams', bodyParser(), checkAuth, async (ctx: Context, next: Next) => {
			const result: Array<object> = await this.model.getAll();
			ctx.body = result[0];
			await next();
		});
	}

	public actionGet() {
		this.get('/api/team/:name', bodyParser(), checkAuth, async (ctx: Context, next: Next) => {
			const result: Array<object> = await this.model.findByTeamName(ctx.params.name);

			if (result) {
				ctx.body = result[0];
			} else {
				ctx.status = ErrorStatus.NoContent;
			}
			await next();
		});
	}

	public actionChange() {
		this.put('/api/team/edit', bodyParser(), checkAuth, async <RequestStats>(ctx: Context, next: Next) => {
			ctx.status = ErrorStatus.NoContent;

			await this.model.update(ctx.params.name, ctx.request.body);
			await next();
		});
	}

	public actionDelete() {
		this.delete('/api/team/delete', bodyParser(), checkAuth, async (ctx: Context, next: Next) => {
			ctx.status = ErrorStatus.NoContent;

			await this.model.remove(ctx.params.id);
			await next();
		});
	}

}

export default TeamController;
