import { Context, Next } from '@server/interfaces/IKoa';

export default async (ctx: Context, next: Next) => {
	try {
		await next();
	} catch (err) {
		ctx.status = err.statusCode || err.status || 500;
		ctx.body = {
			message: err.message,
		};
	}
};
