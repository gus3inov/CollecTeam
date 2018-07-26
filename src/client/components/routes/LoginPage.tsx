import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Login from '../../ui/templates/Login';
import FormAuth from '../../ui/organisms/FormAuth';
import { signUp, moduleName, signIn } from '../../ducks/auth';
import Loader from '../common/Loader';
import SignIn from '../Auth/SignIn';
import SignUp from '../Auth/SignUp';
import {withCookies} from 'react-cookie';
import {withRouter} from 'react-router';

export interface AboutPageProps {

}

@connect(state => {
    return {
        loading: state[moduleName].loading
    };
}, {signUp, signIn})
@withCookies
@withRouter
class LoginPage extends React.Component<AboutPageProps, any> {
    handleSignIn = ({
                        username,
                        password
                    }: any) => {
        const { signIn, history } = this.props;
        const user = {
            username,
            password
        };

        signIn(user);
    };

    handleSignUp = ({
                        username,
                        firstName,
                        lastName,
                        password,
                        email
                    }: any) => {
        const { signUp } = this.props;
        const user = {
            username,
            firstName,
            lastName,
            password,
            email
        };

        signUp(user);
    };

    componentDidMount() {
        const { cookies, history } = this.props;
        const token = typeof cookies.get('token') !== 'undefined';
        if(token) {
            history.push('/home')
        } else {
            history.push('/login')
        }
    }

    render() {
        const { loading } = this.props;
        return (
            <Login>
                <FormAuth
                    componentSignIn={<SignIn onSubmit={this.handleSignIn}/>}
                    componentSignUp={<SignUp onSubmit={this.handleSignUp}/>}
                />
                {loading && <Loader/>}
            </Login>
        );
    }
}

export default LoginPage;
