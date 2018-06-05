import * as React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from '../../ui/templates/Home';
import { moduleName } from '../../ducks/auth';
import Startups from '../Home/Startups';
import AddStartup from '../Home/AddStartup';
import Startup from '../Home/Startup';
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

    getStartup = ({ match }) => {
        const { name } = match.params
        return <Startup name = { name } key = { name } />
    };

    render() {
        const { children, user } = this.props;

        return (
            <Home user={user} routes={MenuRoutes}>
                <Route path="/home/startups" exact component={Startups}/>
                <Route path="/home/startup/add" component={AddStartup}/>
                <Route path="/home/startups/:name" render={this.getStartup}/>
            </Home>
        );
    }
}

export default HomePage;
