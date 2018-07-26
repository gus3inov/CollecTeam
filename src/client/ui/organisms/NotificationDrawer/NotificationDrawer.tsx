import * as React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { styles } from './style';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';
import ListItem from '@material-ui/core/ListItem';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export interface NotificationDrawerProps {
    isOpen: boolean;
    toggleOpen();
}

class NotificationDrawer extends React.Component<NotificationDrawerProps, any> {
    render() {
        const { isOpen, classes, toggleOpen } = this.props;

        return (
            <Drawer anchor="right" open={isOpen} onClose={toggleOpen}>
                <div
                    tabIndex={0}
                    role="button"
                    onClick={toggleOpen}
                    onKeyDown={toggleOpen}
                >
                    <div className={classes.list}>
                        <Divider />
                        <ListItem button>
                            <ListItemIcon>
                                <SendIcon />
                            </ListItemIcon>
                            <ListItemText primary="Send mail" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Drafts" />
                        </ListItem>
                    </div>
                </div>
            </Drawer>
        );
    }
}

export default withStyles(styles)(NotificationDrawer);
