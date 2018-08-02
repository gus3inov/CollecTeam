import startup from '@server/modules/startup'
import team from '@server/modules/team'
import user from '@server/modules/user'

export default (app: any) => {
	startup(app);
	team(app);
	user(app);
}
