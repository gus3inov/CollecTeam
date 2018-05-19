import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from './routes/AuthPage';
import NotFound from './routes/NotFound';
import HomePage from './routes/HomePage';

export interface RootProps {

}

class Root extends React.Component<RootProps, any> {
    render() {
        return (
            <div>
                {/*<Redirect to="/auth/signup" />*/}
                <Switch>
                    <Route path="/home" component={ HomePage } />
                    <Route path="/auth" component={ AuthPage } />
                    <Route path="*" component={ NotFound } />
                </Switch>
            </div>
        );
    }
}

export default Root;