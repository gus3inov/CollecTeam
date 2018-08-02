import * as KoaRouter from 'koa-router';
import { IMiddleware } from 'koa-router';

interface IRouter {

	get(path: string | RegExp, ...middleware: Array<IMiddleware>): void;

	post(path: string | RegExp, ...middleware: Array<IMiddleware>): void;

	delete(path: string | RegExp, ...middleware: Array<IMiddleware>): void;

	put(path: string | RegExp, ...middleware: Array<IMiddleware>): void;
}

class Router implements IRouter {
	private _router: any = new KoaRouter();

	public get(path: string | RegExp, ...middleware: Array<IMiddleware>): any {
		this._router.get(path, ...middleware);
	}

	public post(path: string | RegExp, ...middleware: Array<IMiddleware>): any {
		this._router.post(path, ...middleware);
	}

	public delete(path: string | RegExp, ...middleware: Array<IMiddleware>): any {
		this._router.delete(path, ...middleware);
	}

	public put(path: string | RegExp, ...middleware: Array<IMiddleware>): any {
		this._router.put(path, ...middleware);
	}

	protected listenRoutes() {
		return this._router.routes();
	}

	protected allowedMethods() {
		return this._router.allowedMethods();
	}
}

export default Router;
