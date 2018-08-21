import * as React from 'react';
import {Route} from 'react-router-dom';

import Home from '@ui/templates/Home';
import Startups from '../Home/Startups';
import Startup from '../Startup/Startup';
import MenuRoutes from '../common/MenuRoutes';
import Dashboard from '../Home/Dashboard';

export interface HomePageProps {
}

class HomePage extends React.Component<HomePageProps, any> {

	getStartup = ({match}: any) => {
		const {name} = match.params;
		return (
			<Startup
				name={name}
				key={name}
			/>
		);
	};

	render() {
		return (
			<Home routes={MenuRoutes}>
				<Route path="/home/dashboard" exact component={Dashboard}/>
				<Route path="/home/startups" exact component={Startups}/>
				<Route path="/home/startups/:name" render={this.getStartup}/>
			</Home>
		);
	}
}

export default HomePage;
