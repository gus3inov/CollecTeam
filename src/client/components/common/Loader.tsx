import * as React from 'react';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme: any) => ({
	progress: {
		margin: theme.spacing.unit * 2,
	},
});

type LoaderProps = {
	classes: any;
};

const Loader: React.SFC<LoaderProps> = (props) => {
	const {classes} = props;
	return (
		<div className="loader">
			<CircularProgress className={classes.progress} size={75}/>
		</div>
	);
};

export default withStyles(styles)(Loader);
