import * as React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import {connect} from "react-redux";

import {isAuth} from '../ducks/auth'
import AuthPage from './routes/AuthPage';
import NotFound from './routes/NotFound';
import HomePage from './routes/HomePage';
import AuthService from '../services/AuthService'

export interface RootProps {

}

@connect(null, {isAuth})
class Root extends React.Component<RootProps, any> {
    state = {
        isAuthenticate: AuthService.isUserAuthenticated()
    }

    componentDidMount () {
        const {isAuth} = this.props;
        isAuth();
    }

    render() {
        const {isAuthenticate} = this.state;
        console.log(isAuthenticate)
        return (
            <div>
                <Switch>
                    <Route exact path="/" render={props => (
                        isAuthenticate ? (
                            <Redirect to='/home'/>
                        ) : (
                            <Redirect to='/auth'/>
                        )
                    )}/>
                    <Route path="/auth" component={AuthPage}/>
                    <Route path="/home" component={HomePage}/>
                    <Route path="*" component={NotFound}/>
                </Switch>
            </div>
        );
    }
}

export default Root;