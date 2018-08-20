import * as React from 'react';

import {StyledHeader} from './style';
import Search from '@ui/atoms/InputSearch';
import UserAvatar from '../../molecules/UserAvatar';
import {connect} from 'react-redux';
import NotificationDrawer from '../NotificationDrawer';

export interface HeaderProps {
	user: any;
	isOpen?: boolean;
}

class Header extends React.Component<HeaderProps, {}> {
	state = {
		drawerNotif: false,
	};

	toggleDrawer = () => {
		this.setState({
			drawerNotif: !this.state.drawerNotif,
		});
	};

	render() {
		const {isOpen, user} = this.props;
		const {drawerNotif} = this.state;

		return (
			<StyledHeader className={`alt-header ${isOpen ? 'alt-header_open' : 'alt-header_closed'} container-fluid`}>
				<div className="alt-header__search">
					<Search/>
				</div>
				{
					user !== null ?
						<UserAvatar
							user={user}
							toggleDrawer={this.toggleDrawer}
						/>
						: ''
				}
				<NotificationDrawer isOpen={drawerNotif} toggleOpen={this.toggleDrawer}/>
			</StyledHeader>
		);
	}
}

export default connect((state: any) => {
	return {
		user: state.auth.user,
	};
})(Header);
