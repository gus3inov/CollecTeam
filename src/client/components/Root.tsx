import * as React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import { withRouter } from 'react-router';
import {connect} from 'react-redux';
import {withCookies} from 'react-cookie';
import {renderRoutes} from 'react-router-config';

import {isAuthAction} from '../ducks/auth';

export interface RootProps {
    isAuth(): void;
}

@connect(null, {isAuthAction})
@withCookies
@withRouter
class Root extends React.Component<RootProps, any> {
    componentWillMount() {
        const {isAuthAction} = this.props;
        isAuthAction();
    }

    // componentDidMount() {
    //     const { cookies, history } = this.props;
    //     const token = typeof cookies.get('token') !== 'undefined';
    //     if(token) {
    //         history.push('/home/dashboard')
    //     } else {
    //         history.push('/login')
    //     }
    // }

    render() {
        const {route, cookies} = this.props;

        const protectedRoutes = [...route.protectedRoutes, ...route.routes];
        const token = typeof cookies.get('token') !== 'undefined';
        return (
            <div>
                {
                    token ? (
                        renderRoutes(protectedRoutes)
                    ) : (
                        renderRoutes(route.routes)
                    )
                }
            </div>
        );
    }
}

export default Root;
