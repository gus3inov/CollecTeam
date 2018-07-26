import * as React from 'react';
import { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';

import { isAuthAction, moduleName } from '../../ducks/auth';

export interface ProtectedRouteProps {

}

class ProtectedRoute extends React.Component<ProtectedRouteProps, any> {
    render() {
        const { routes, cookies } = this.props;
        const protectedRoutes = [...routes.protectedRoutes, ...routes.routes];
        const isAuth = typeof cookies.get('token') !== 'undefined';

        return (
            <Route
                {...rest}
                render={props =>
                    isAuth ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                    )
                }
            />
        );
    }
}

export default ProtectedRoute;
