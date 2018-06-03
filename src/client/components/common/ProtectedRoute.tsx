import * as React from 'react';
import { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';

import { isAuthAction, moduleName } from '../../ducks/auth';

export interface ProtectedRouteProps {

}

// @connect(state => ({
//     token: state.authentication.token
// }), null)
class ProtectedRoute extends React.Component<ProtectedRouteProps, any> {
    render() {
        const { routes, cookies } = this.props;
        const protectedRoutes = [...routes.protectedRoutes, ...routes.routes];
        const token = cookies.get('token') !== null;
        console.log('cookies ----- ', cookies)
        return (
            <Fragment>
                <Route exact path="/" render={props => (
                    token ? (
                        <Redirect to='/home'/>
                    ) : (
                        <Redirect to='/about'/>
                    )
                )}/>
                {
                    token ? (
                        renderRoutes(protectedRoutes)
                    ) : (
                        renderRoutes(routes.routes)
                    )
                }
            </Fragment>
        );
    }
}

export default ProtectedRoute;
