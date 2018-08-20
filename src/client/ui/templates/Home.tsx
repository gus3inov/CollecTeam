import * as React from 'react';
import {Fragment} from 'react';

import toggleOpen from '../../hocs/toggleOpen';
import Menu from '../organisms/Menu';
import Header from '../organisms/Header';
import Workspace from '../organisms/Workspace';

export interface HomeProps {
	children: Array<JSX.Element>;

	isOpen?: boolean;

	routes: Array<IMenuRoutes>;

	toggleOpen?<A>(): A;
}

class Home extends React.Component <HomeProps, {}> {

	render() {
		const {isOpen, children, routes } = this.props;

		return (
			<Fragment>
				<main className="home">
					<Header isOpen={isOpen} />
					<Menu routes={routes} toggleOpen={this.props.toggleOpen} isOpen={isOpen}/>
					<Workspace isOpen={isOpen}>
						{children}
					</Workspace>
				</main>
			</Fragment>
		);
	}
}

export default toggleOpen(Home);
