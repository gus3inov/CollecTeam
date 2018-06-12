import * as React from 'react';

import AddStartup from '../Startup/AddStartup';
import {addStartup, moduleName} from '../../ducks/startups';
import {connect} from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';
import SaveIcon from '@material-ui/icons/Save';
import green from '@material-ui/core/colors/green';

import {Fragment} from 'react';
import {withStyles} from '@material-ui/core/styles';

export interface ModalAddStartupProps {

}

const styles = {
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
};

@connect((state) => ({
    loading: state[moduleName].loading,
    loaded: state[moduleName].loaded,
    id_user: state.auth.user.id
}), { addStartup })
@withStyles(styles)
class ModalAddStartup extends React.Component<ModalAddStartupProps, any> {
    state = {
      added: false
    };

    handleCreate = (value) => {
        this.setState({
            added: true
        });

        const { addStartup, id_user } = this.props;
        const startup = {
            id_user: id_user,
            name: value.name,
            description: value.description,
            whoNeed: value.whoNeed,
            profitText: value.profitText,
            contacts: value.contacts
        };

        addStartup(startup);
    };

    render() {
        const { loaded, classes } = this.props;

        return (
            <Fragment>
                {
                    this.state.added
                        ? <div>
                            {
                                loaded
                                    ? <CircularProgress size={68} className={classes.fabProgress}/>
                                    : <SaveIcon />
                            }
                        </div>
                        : <AddStartup onSubmit={this.handleCreate}/>
                }
            </Fragment>
        );
    }
}

export default ModalAddStartup;
