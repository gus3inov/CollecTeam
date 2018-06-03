import * as React    from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';

import { isAuthAction } from '../ducks/auth';
import ProtectedRoute from './common/ProtectedRoute';

export interface RootProps {
    isAuth(): void;
}

@connect(null, { isAuthAction })
@withCookies
class Root extends React.Component<RootProps, any> {
    // componentWillMount () {
    //     const { isAuthAction } = this.props;
    //     isAuthAction();
    // }

    render () {
        const { route, cookies } = this.props;
        return (
            <Switch>
                <ProtectedRoute routes={route} cookies={cookies} />
            </Switch>
        );
    }
}

export default Root;
