import * as React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from '../../ui/templates/Home';
import { moduleName } from '../../ducks/auth';
import Profile from '../Profile/Profile';
import Startups from '../Home/Startups';
import Startup from '../Startup/Startup';
import MenuRoutes from '../common/MenuRoutes';
import Dashboard from '../Home/Dashboard';

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
                <Route path="/home/dashboard" exact component={Dashboard}/>
                <Route path="/home/startups" exact component={Startups}/>
                <Route path="/home/startups/:name" render={this.getStartup}/>
                <Route path="/profile" exact component={Profile}/>
            </Home>
        );
    }
}

export default HomePage;
