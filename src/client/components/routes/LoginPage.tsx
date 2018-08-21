import * as React from 'react';
import {connect} from 'react-redux';

import Login from '../../ui/templates/Login';
import FormAuth from '../../ui/organisms/FormAuth';
import {signUp, moduleName, signIn} from '../../ducks/auth';
import Loader from '../common/Loader';
import SignIn from '../Auth/SignIn';
import SignUp from '../Auth/SignUp';
import {withCookies} from 'react-cookie';
import {withRouter} from 'react-router';
import {bindActionCreators} from 'redux';

export interface AboutPageProps {
	history: any;
	cookies: any;
	match: any;
	location: any;
	loading: boolean;
	signUpAction(data: any): any;
	signInAction(data: any): any;
}

class LoginPage extends React.Component<AboutPageProps, any> {
	handleSignIn = ({
						username,
						password,
					}: any) => {
		const {
			signInAction,
		} = this.props;

		const user = {
			username,
			password,
		};

		signInAction(user);
	};

	handleSignUp = ({
						username,
						firstName,
						lastName,
						password,
						email,
					}: any) => {
		const { signUpAction } = this.props;
		const user = {
			username,
			firstName,
			lastName,
			password,
			email,
		};

		signUpAction(user);
	};

	componentDidMount() {
		const {cookies, history} = this.props;
		const token = typeof cookies.get('token') !== 'undefined';
		if (token) {
			history.push('/home');
		} else {
			history.push('/login');
		}
	}

	render() {
		const {loading} = this.props;
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

export default connect(state => {
	return {
		loading: state[moduleName].loading,
	};
}, (dispatch: any) => ({
	signUpAction: bindActionCreators(signUp, dispatch),
	signInAction: bindActionCreators(signIn, dispatch),
}))(withCookies(withRouter(LoginPage)));
