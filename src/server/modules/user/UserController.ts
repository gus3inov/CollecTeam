import Router from 'server/core/RouteGenerator';
import checkAuth from 'server/middlewares/checkAuth';
import { Context, ErrorStatus, Next } from 'server/interfaces/IKoa';
import * as convert from 'koa-convert';
import * as KoaBody from 'koa-body';
import * as passport from 'passport';
import * as bodyParser from 'koa-bodyparser';

const koaBody = convert(KoaBody());

class UserController extends Router {

	private model: IUserModel;

	constructor(model: IUserModel) {
		super();
		this.model = model;
		this.setToken();
		this.getToken();
		this.deleteToken();
		this.actionCreate();
		this.actionGetAll();
		this.actionGet();
		this.actionChange();
		this.actionDelete();
		this.actionLogin();
		this.actionLogout();
		this.isAuth();
	}

	public getRoutes(): any {
		return this.listenRoutes();
	}

	public getMethods(): any {
		return this.allowedMethods();
	}

	public actionCreate() {
		this.post('/api/user', koaBody, async (ctx: Context, next: Next) => {
			await this.model.create(ctx.request.body);

			ctx.status = ErrorStatus.Created;
			ctx.body = [];

			await next();
			// return passport.authenticate('local', async (err, token, user) => {
			// 	if (user) {
			// 		ctx.body = {success: true, token};
			//
			// 		return ctx.login(user);
			// 	} else {
			// 		ctx.status = 400;
			// 		ctx.body = {
			// 			error: err,
			// 		};
			//
			// 		return err;
			// 	}
			// })(ctx);
		});
	}

	public actionLogin() {
		this.post('/auth/login', bodyParser(), async (ctx: Context, next: Next) => {
			return passport.authenticate('local', (err, token, user) => {
				if (user) {
					const userRequest = {
						id: user.id,
						username: user.username,
						firstName: user.first_name,
						lastName: user.last_name,
						email: user.email,
						avatar: user.avatar,
						position: user.position_id,
						role: user.role_id,
						team: user.team_id,
					};

					delete user.salt;
					delete user.password;
					ctx.body = {success: true, token, user: userRequest};

					return ctx.login(user);
				} else {
					ctx.status = 400;
					ctx.body = {
						error: `user : ${JSON.stringify(err)}`,
					};

					return err;
				}
			})(ctx);
		});
	}

	public isAuth() {
		this.get('/auth/isauth', bodyParser(), checkAuth, async (ctx, next: Next) => {
			const user = ctx.body.user;
			ctx.body = {
				user,
			};

			await next();
		});
	}

	public actionLogout() {
		this.get('/auth/logout', bodyParser(), async (ctx) => {
			if (ctx.isAuthenticated()) {
				await ctx.cookies.set('token', '');

				return ctx.logout();
			} else {
				ctx.body = {success: false};
				ctx.throw(401);
			}
		});
	}

	public actionGetAll() {
		this.get('/api/users', async (ctx: Context, next: Next) => {
			const result: Array<object> = await this.model.getAll();
			ctx.body = result[0];
		});
	}

	public actionGet() {
		this.get('/api/user/:username', async (ctx: Context, next: Next) => {
			const result: IUser = await this.model.findByUserName(ctx.params.username);

			if (result) {
				ctx.body = result[0];
			} else {
				ctx.status = ErrorStatus.NoContent;
			}

			await next();
		});
	}

	public actionChange() {
		this.put('/api/user/edit', koaBody, checkAuth, async <RequestStats>(ctx: Context, next: Next) => {
			ctx.status = ErrorStatus.NoContent;
			const username = ctx.body.user.username;
			await this.model.update(username, ctx.request.body);

			await next();
		});
	}

	public actionDelete() {
		this.delete('/api/user/delete', koaBody, checkAuth, async (ctx: Context, next: Next) => {
			ctx.status = ErrorStatus.NoContent;
			const username = ctx.body.user.username;
			await this.model.remove(username);

			await next();
		});
	}

	public setToken() {
		this.post('/api/user/setToken', koaBody, async (ctx: Context, next: Next) => {
			await ctx.cookies.set('token', ctx.request.body.token, {httpOnly: false});

			await next();
		});
	}

	public deleteToken() {
		this.delete('/api/user/deleteToken', async (ctx: Context, next: Next) => {
			await ctx.cookies.set('token', '');

			await next();
		});
	}

	public getToken() {
		this.get('/api/user/getToken', async (ctx: Context, next: Next) => {
			ctx.body = {
				token: ctx.cookies.get('token'),
			};

			await next();
		});
	}

}

export default UserController;
