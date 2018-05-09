import * as React from 'react';
import SignIn from '../Auth/SignIn';
import SignUp from '../Auth/SignUp';
import { Route, NavLink } from 'react-router-dom'
import {connect} from 'react-redux'
import {signUp, moduleName, signIn} from '../../ducks/auth'
import Loader from '../common/Loader'

export interface AuthPageProps {

}

class AuthPage extends React.Component<any, any> {
    handleSignIn = ({
        username,
        password
                    }: any) => {
        const user = {
            username,
            password
        };

        this.props.signIn(user);
    }

    handleSignUp = ({
                        username,
                        firstName,
                        lastName,
                        password,
                        email
                    }: any) => {

        const user = {
            username,
            firstName,
            lastName,
            password,
            email
        };
        this.props.signUp(user)
    }

    render() {
        const { loading } = this.props
        return (
            <div>
                <h1>Authefication</h1>
                <NavLink to="/auth/signin" activeStyle={{color: 'red'}}>sign in</NavLink>
                <NavLink to="/auth/signup" activeStyle={{color: 'red'}}>sign up</NavLink>
                <Route path="/auth/signin" render={() => <SignIn onSubmit={this.handleSignIn}/>}/>
                <Route path="/auth/signup" render={() => <SignUp onSubmit={this.handleSignUp}/>}/>
                {loading && <Loader />}
            </div>
        );
    }
}

export default connect(state => {
    return {
        loading: state[moduleName].loading
    }
}, {signUp, signIn})(AuthPage);