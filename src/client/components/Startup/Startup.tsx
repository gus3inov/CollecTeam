import * as React from 'react';
import {connect} from 'react-redux';
import { loadStartup, moduleName } from '../../ducks/startups';
import {Fragment} from 'react';
import DetailStartup from '../../ui/organisms/DetailStartup/index';
import {bindActionCreators} from 'redux';

export interface StartupProps {
	startup: any;
	name: string;
	loadStartupAction: any;
}

class Startup extends React.Component<StartupProps, any> {

	componentDidMount() {
		this.props.loadStartupAction(this.props.name);
	}

	render() {
		const {startup} = this.props;

		return (
			<Fragment>
				{
					startup !== null
						?
						<DetailStartup data={startup}/>
						: ''
				}
			</Fragment>
		);
	}
}

export default connect((state) => ({
	startup: state[moduleName].entitie,
}), (dispatch: any) => ({
	loadStartupAction: bindActionCreators(loadStartup, dispatch),
}))(Startup);
