import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

type LoaderProps = {

}

const Loader: React.SFC<LoaderProps> = (props) => {
    const { classes } = props;
    return <CircularProgress className={classes.progress} size={75} />
}

export default withStyles(styles)(Loader);
