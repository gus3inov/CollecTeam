import * as React from 'react';
import { Route } from 'react-router-dom';
import AuthPage from './routes/AuthPage';

export interface RootProps {

}

class Root extends React.Component<RootProps, any> {
    render() {
        return (
            <div>
                <Route path="/auth" component={ AuthPage } />
            </div>
        );
    }
}

export default Root;