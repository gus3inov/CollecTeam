import UserController from '@server/modules/user/UserController';
import UserModel from '@server/modules/user/UserModel';

const model = new UserModel();
const controller = new UserController(model);

export default (app: any) => {
	app.use(controller.getRoutes());
	app.use(controller.getMethods());
}
