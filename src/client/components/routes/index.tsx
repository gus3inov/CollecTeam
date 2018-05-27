import AboutPage from './AboutPage';
import NotFound from './NotFound';
import HomePage from './HomePage';
import Root from '../Root';

const routes: Array<object> = [
    { component: Root,
        protectedRoutes: [
            {
                path: '/home',
                component: HomePage
            }
        ],
        routes: [
            {
                path: '/about',
                component: AboutPage
            },
            {
                path: '*',
                component: NotFound
            }
        ]
    }
];

export default routes
