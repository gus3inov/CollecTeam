import * as React from 'react';

import {StyledHeader, styles} from './style';
import Search from '../../molecules/Search';
import UserAvatar from '../../molecules/UserAvatar';
import {loadAllStartups, moduleName} from '../../../ducks/startups';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import deepPurple from '@material-ui/core/colors/deepPurple';
import AssignmentIcon from '@material-ui/icons/Assignment';
import green from '@material-ui/core/colors/green';
import MailIcon from '@material-ui/icons/Mail';
import Badge from '@material-ui/core/Badge';
import NotificationDrawer from '../NotificationDrawer';

export interface HeaderProps {
    isOpen?: boolean;
}


class Header extends React.Component<HeaderProps, {}> {

    state = {
        anchorEl: null,
        drawerNotif: false
    };

    toggleDrawer = () => {
        this.setState({
            drawerNotif: !this.state.drawerNotif
        })
    };

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    render() {
        const {isOpen, user, classes} = this.props;
        const {anchorEl, drawerNotif} = this.state;
        const open = Boolean(anchorEl);


        return (
            <StyledHeader className={`alt-header ${isOpen ? 'alt-header_open' : 'alt-header_closed'} container-fluid`}>
                <div className="alt-header__search">
                    <Search/>
                </div>
                {
                    user !== null ? <div className="alt-header__user">
                            <div className="alt-header__user_assignment">
                                <Badge className={classes.margin} badgeContent={10} color="secondary">
                                    <MailIcon onClick={this.toggleDrawer}/>
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
                                <MenuItem onClick={this.handleClose}>Профиль</MenuItem>
                                <MenuItem onClick={this.handleClose}>Выйти</MenuItem>
                            </Menu>
                        </div>
                        : ''
                }
                <NotificationDrawer isOpen={drawerNotif} toggleOpen={this.toggleDrawer}/>
            </StyledHeader>
        );
    }
}

export default connect(state => {
    return {
        user: state.auth.user
    };
})(withStyles(styles)(Header));
