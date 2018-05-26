import * as jwt from 'jsonwebtoken';
import * as config from 'config';

import User from '../models/User';
import { ContextStats } from '../interfaces/IKoa';

export default async (ctx: ContextStats, next: any) => {
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

        if (err) {
            return ctx.throw(401).end;
        }

        const userId = decoded.sub;

        const findUser = await user.findIndentity(userId)
            .then(user => {
                ctx.body = {
                    user
                };
            });
            // .catch(err => {
            //     ctx.body = {
            //         err
            //     }
            //
            //     return ctx.throw(401).end();
            // });

        return findUser;
    });
};
