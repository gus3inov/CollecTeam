import User from '@server/models/User';
import { Context, Next } from '@server/interfaces/IKoa';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';

export default async (ctx: Context, next: Next) => {
	const userModel = new User();
	const jwtSecret = config.get('jwtSecret');

	if (!ctx.request.headers.authorization) {
		ctx.body = {
			messageS: JSON.stringify(ctx.request.header),
		};

		return ctx.throw(401);
	}

	const token = ctx.request.headers.authorization.split(' ')[1];

	return jwt.verify(token, jwtSecret, async (err: any, decoded: any) => {
		if (err) {
			return ctx.throw(401);
		}

		const userId = decoded.sub;

		const findUser = await userModel.findIndentity(userId)
			.then(user => {
				ctx.body = {
					user: user[0],
				};
			})
			.catch((error: any) => {
				ctx.body = {
					error,
				};

				return ctx.throw(401);
			});

		await next();
		return findUser;
	});
};
