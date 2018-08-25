import * as React from 'react';
import {Fragment} from 'react';

import Panel from '../organisms/Panel';

export interface LoginProps {
}

class Login extends React.Component<LoginProps, {}> {
	render() {
		const {children} = this.props;

		return (
			<Fragment>
				<Panel urlImg="/images/about-bg.jpg"/>
				<div className="container">
					{children}
				</div>
			</Fragment>
		);

	}
}

export default Login;
