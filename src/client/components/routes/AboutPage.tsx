import * as React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';


import About from '../../ui/templates/About';
import FormAuth from '../../ui/organisms/FormAuth';
import { signUp, moduleName, signIn } from '../../ducks/auth';
import Loader from '../common/Loader';
import SignIn from '../Auth/SignIn';
import SignUp from '../Auth/SignUp';

export interface AboutPageProps {

}

@connect(state => {
    return {
        loading: state[moduleName].loading
    };
}, {signUp, signIn})
class AboutPage extends React.Component<AboutPageProps, any> {
    handleSignIn = ({
                        username,
                        password
                    }: any) => {
        const user = {
            username,
            password
        };

        this.props.signIn(user);
    };

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
        this.props.signUp(user);
    };

    render() {
        const { loading } = this.props;

        return (
            <About>
                <FormAuth
                    componentSignIn={<SignIn onSubmit={this.handleSignIn}/>}
                    componentSignUp={<SignUp onSubmit={this.handleSignUp}/>}
                />
                {loading && <Loader/>}
            </About>
        );
    }
}

export default AboutPage;
