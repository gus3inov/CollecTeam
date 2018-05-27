import * as React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {moduleName} from '../../ducks/auth';
import UnAuthorized from './UnAuthorized';

export interface ProtectedRouteProps {
    component: any;
    authorized: any;
    path: any;
}

class ProtectedRoute extends React.Component<ProtectedRouteProps, any> {

    renderProtected = (routeProps: any) => {
        const {component: ProtectedComponent, authorized} = this.props;

        return authorized ? <ProtectedComponent {...routeProps} /> : <UnAuthorized/>;
    };

    render() {
        const {component, ...rest} = this.props;

        return (
            <div>
                <Route {...rest} render={this.renderProtected}/>
            </div>
        );
    }
}

export default connect(state => ({
    authorized: !!state[moduleName].user
}), null, null, {pure: false})(ProtectedRoute);