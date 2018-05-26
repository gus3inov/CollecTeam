import AuthPage from './AuthPage';
import NotFound from './NotFound';
import HomePage from './HomePage';
import Root from '../Root';

const routes =  [
    {
        path: '/',
        exact: true,
        component: Root,
    },
    {
        path: '/home',
        component: HomePage,
    },
    {
        path: '/auth',
        component: AuthPage
    },
    {
        path: '*',
        component: NotFound
    }
]

export default routes