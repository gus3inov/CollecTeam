import * as React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import MailIcon from '@material-ui/icons/Mail';
import Badge from '@material-ui/core/Badge';

import StyledUserAvatar, {styles} from './style';
import AuthService from '../../../services/AuthService';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router';

export interface UserAvatarProps {
	user: any;
	classes: any;
	match: any;
	history: any;
	location: any;
	toggleDrawer(): any;
}

class UserAvatar extends React.Component<UserAvatarProps, any> {
	state = {
		anchorEl: null,
	};

	handleMenu = (event: any) => {
		this.setState({anchorEl: event.currentTarget});
	};

	logout = () => {
		const {history} = this.props;
		AuthService.deauthenticateUser().then(res => {
			history.push('/login');
		});
		this.handleClose();
	};

	handleClose = () => {
		this.setState({anchorEl: null});
	};

	render() {
		const {user, classes, toggleDrawer} = this.props;
		const {anchorEl} = this.state;
		const open = Boolean(anchorEl);
		return (
			<StyledUserAvatar className="alt-header__user">
				<div className="alt-header__user">
					<div className="alt-header__user_assignment">
						<Badge className={classes.margin} badgeContent={10} color="secondary">
							<MailIcon onClick={toggleDrawer}/>
						</Badge>
					</div>
					<Avatar
						className={classes.bigAvatar}
						onClick={this.handleMenu}
					>
						{user.first_name[0].toUpperCase()}
						{user.last_name[0].toUpperCase()}
					</Avatar>
					<Menu
						id="menu-appbar"
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						open={open}
						onClose={this.handleClose}
					>
						<MenuItem onClick={() => this.props.history.push('/profile')}>Профиль</MenuItem>
						<MenuItem onClick={this.logout}>Выйти</MenuItem>
					</Menu>
				</div>
			</StyledUserAvatar>
		);
	}
}

export default withStyles(styles)(withRouter(UserAvatar));
