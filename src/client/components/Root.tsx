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

const PrivateRoute = ({component: Component, isAuth, ...rest}) => (
    <Route {...rest} render={props => (
        isAuth ? (
            <Component {...props} {...rest} />
        ) : (
            <Redirect to={{
                pathname: '/auth',
                state: {from: props.location}
            }}/>
        )
    )}/>
)

@connect(null, {isAuth})
class Root extends React.Component<RootProps, any> {
    state = {
        isAuthenticate: false
    }

    componentDidMount() {
        const {isAuth} = this.props;
        isAuth();

        this.setState({
            isAuthenticate: AuthService.isUserAuthenticated()
        })
    }

    render() {
        const {isAuthenticate} = this.state;
        console.log(isAuthenticate)
        return (
            <div>
                {/*<Redirect to="/auth/signup" />*/}
                <Switch>
                    <Route exact path="/" render={props => (
                        isAuthenticate ? (
                            <Redirect to='/home'/>
                        ) : (
                            <Redirect to='/auth'/>
                        )
                    )}/>
                    {/*<PrivateRoute exact path="/" isAuth={isAuthenticate} component={HomePage}/>*/}
                    <Route path="/auth" component={AuthPage}/>
                    <Route path="/home" component={HomePage}/>
                    <Route path="*" component={NotFound}/>
                </Switch>
            </div>
        );
    }
}

export default Root;