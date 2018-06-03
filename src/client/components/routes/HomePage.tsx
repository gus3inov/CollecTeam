import * as React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from '../../ui/templates/Home';
import { moduleName } from '../../ducks/auth';
import Startups from '../Home/Startups';
import MenuRoutes from '../common/MenuRoutes';
import AuthService from '../../services/AuthService';

export interface HomePageProps {

}

@connect(state => {
    return {
        user: state[moduleName].user
    }
}, null)
class HomePage extends React.Component<HomePageProps, any> {
    render() {
        const { children, user } = this.props;

        return (
            <Home user={user} routes={MenuRoutes}>
                <Route path="/home/startups" component={Startups}/>
            </Home>
        );
    }
}

export default HomePage;
