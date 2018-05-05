import * as convert from 'koa-convert';
import * as bodyParser from 'koa-body';

export default function BodyParser(app: any) {
    app.use(convert(bodyParser()));
};