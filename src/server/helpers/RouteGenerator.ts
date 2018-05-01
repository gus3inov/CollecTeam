import * as KoaRouter from 'koa-router';
import { IMiddleware, IRouterContext } from 'koa-router';

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

class Router implements IRouter {
    private _router: any = new KoaRouter();

    public get (path: string | RegExp, ...middleware: Array<IMiddleware>): any {
        this._router.get(path, ...middleware);
    }

    public post (path: string | RegExp, ...middleware: Array<IMiddleware>) {
        this._router.post(path, ...middleware);
    }

    public delete (path: string | RegExp, ...middleware: Array<IMiddleware>) {
        this._router.delete(path, ...middleware);
    }

    public put (path: string | RegExp, ...middleware: Array<IMiddleware>) {
        this._router.put(path, ...middleware);
    }

    protected listenRoutes () {
        this._router.routes();
    }
}

export default Router;