import { ContextStats } from '../interfaces/IKoa'

export default async (ctx: ContextStats, next: any) => {
    try {
        await next();
    } catch (err: object) {
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            message: err.message
        };
    }
}
