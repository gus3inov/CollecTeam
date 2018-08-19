import LoginPage from './LoginPage';
import NotFound from './NotFound';
import HomePage from './HomePage';
import Root from '../Root';

const routes: Array<object> = [
	{
		component: Root,
		protectedRoutes: [
			{
				path: '/home',
				component: HomePage,
			},
		],
		routes: [
			{
				path: '/login',
				component: LoginPage,
			},
			{
				path: '*',
				component: NotFound,
			},
		],
	},
];

export default routes;
