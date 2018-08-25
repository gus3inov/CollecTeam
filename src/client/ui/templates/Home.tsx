import * as React from 'react';
import {Fragment} from 'react';

import toggleOpen, { InjectedProps } from '@client/hocs/toggleOpen';
import Menu from '@ui/organisms/Menu';
import Header from '@ui/organisms/Header';
import Workspace from '@ui/organisms/Workspace';

export interface HomeProps {
	children: Array<JSX.Element>;

	routes: Array<IMenuRoutes>;
}

class Home extends React.Component <HomeProps & InjectedProps, {}> {

	render() {
		const {isOpen, children, routes, handleOpen } = this.props;

		return (
			<Fragment>
				<main className="home">
					<Header isOpen={isOpen} />
					<Menu routes={routes} toggleOpen={handleOpen} isOpen={isOpen}/>
					<Workspace isOpen={isOpen}>
						{children}
					</Workspace>
				</main>
			</Fragment>
		);
	}
}

export default toggleOpen(Home);
