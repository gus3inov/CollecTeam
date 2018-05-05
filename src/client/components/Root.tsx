import * as React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from './common/ProtectedRoute';

export interface RootProps {

}

class Root extends React.Component<RootProps, any> {
    render() {
        return (
            <div>
                <ProtectedRoute path="/admin" component={ AdminPage } />
                <Route path="/auth" component={ AuthPage } />
            </div>
        );
    }
}

export default Root;