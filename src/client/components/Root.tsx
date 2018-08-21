import * as React from 'react';
import {withRouter} from 'react-router';
import {ActionCreator, connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withCookies} from 'react-cookie';
import {renderRoutes} from 'react-router-config';

import {isAuthAction} from '../ducks/auth';

export interface RootProps {
	history: any;
	classes: any;
	cookies: any;
	route: any;
	location: any;
	match: any;
	isAuth(): ActionCreator<any>;
}

class Root extends React.Component<RootProps, any> {
	componentWillMount() {
		const { isAuth } = this.props;
		isAuth();
	}

	// componentDidMount() {
	//     const { cookies, history } = this.props;
	//     const token = typeof cookies.get('token') !== 'undefined';
	//     if(token) {
	//         history.push('/home/dashboard')
	//     } else {
	//         history.push('/login')
	//     }
	// }

	render() {
		const {route, cookies} = this.props;

		const protectedRoutes = [...route.protectedRoutes, ...route.routes];
		const token = typeof cookies.get('token') !== 'undefined';
		return (
			<div>
				{
					token ? (
						renderRoutes(protectedRoutes)
					) : (
						renderRoutes(route.routes)
					)
				}
			</div>
		);
	}
}

export default connect(null, (dispatch: any) => ({
	isAuth: bindActionCreators(isAuthAction, dispatch),
}))(withRouter(withCookies(Root)));
