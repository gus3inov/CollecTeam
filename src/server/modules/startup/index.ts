import StartupController from '@server/modules/startup/StartupController';
import StartupModel from '@server/modules/startup/StartupModel';

const model = new StartupModel();
const controller = new StartupController(model);

export default (app: any) => {
	app.use(controller.getRoutes());
	app.use(controller.getMethods());
};
