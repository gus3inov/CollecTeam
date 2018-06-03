export type IMenuRoutes = {
    path: string;
    name: string;
    icon: string;
}

const MenuRoutes: Array<IMenuRoutes> = [
    {
        path: '/home/dashboard',
        name: 'Главная',
        icon: 'mdi-home'
    },
    {
        path: '/home/startups',
        name: 'Стартапы',
        icon: 'mdi-application'
    },
    {
        path: '/home/startup/add',
        name: 'Создание стартапа',
        icon: 'mdi-library-plus'
    }
];

export default MenuRoutes;
