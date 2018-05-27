import * as React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {renderRoutes} from 'react-router-config';

import {isAuth} from '../ducks/auth';
import AuthService from '../services/AuthService';
import {isNode} from '../helpers/browser';
import HomePage from './HomePage';

export interface RootProps {
    isAuth(): void;
}

@connect(null, {isAuth})
class Root extends React.Component<RootProps, any> {
    state = {
        isAuthenticate: isNode ? AuthService.isUserAuthenticated() : false
    };

    componentDidMount () {
        const {isAuth} = this.props;
        isAuth();
    }

    render () {
        const { route } = this.props;
        const { isAuthenticate } = this.state;
        console.log(isAuthenticate);
        const protectedRoutes = [...route.protectedRoutes, ...route.routes];
        return (
            <div>
                <Switch>
                    <Route exact path="/" render={props => (
                        isAuthenticate ? (
                            <Redirect to='/home'/>
                        ) : (
                            <Redirect to='/about'/>
                        )
                    )}/>
                    {
                        isAuthenticate ? (
                            renderRoutes(protectedRoutes)
                        ) : (
                            renderRoutes(route.routes)
                        )
                    }
                </Switch>
            </div>
        );
    }
}

export default Root;