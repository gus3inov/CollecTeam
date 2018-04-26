import * as Router from 'koa-router';
import * as convert from 'koa-conver';
import * as KoaBody from 'koa-body';
import {IRouterOptions, IMiddleware, IRouterOptions, IRouterAllowedMethodsOptions, IRouterContext} from 'koa-router';

enum ErrorStatus{
    Created = 201,
    NoContent = 204
}

interface ContextStats {
    status: number;
    body: object;
    params: object;
    request: object;
}

interface IRequest{
    body: any;
    id: number;
}

type RequestStats = IRequest

interface IRouter {
    router: IRouter;
    get(path: string | RegExp, ...middleware: Array<IMiddleware>): void;
    post(path: string | RegExp, ...middleware: Array<IMiddleware>): void;
    delete(path: string | RegExp, ...middleware: Array<Router.IMiddleware>): void;
    put(path: string | RegExp, ...middleware: Array<IMiddleware>): void;
}

/***
 * @todo Допилить класс для создания роутов отдельной модели
 */
/

export default class Router implements IRouter {
    private _router: IRouterOptions;

    constructor(router: IRouterOptions) {
        this._router = router;
    }

    public get (path: string | RegExp, ...middleware: Array<IMiddleware>): any {
        this._router.get(path, ...middleware);
    }

    public set post (path: string | RegExp, ...middleware: Array<IMiddleware>) {

    }

    public delete () {

    }

    public put () {

    }
}