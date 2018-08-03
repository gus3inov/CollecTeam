import TeamController from '@server/modules/team/TeamController';
import TeamModel from '@server/modules/team/TeamModel';

const model = new TeamModel();
const controller = new TeamController(model);

export default (app: any) => {
	app.use(controller.getRoutes());
	app.use(controller.getMethods());
}
