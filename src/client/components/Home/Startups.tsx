import * as React from 'react';
import {NavLink} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Loader from '../common/Loader';
import Slide from '@material-ui/core/Slide';
import AddIcon from '@material-ui/icons/Add';

import Section from '../../ui/organisms/Section';
import {loadAllStartups, moduleName} from '../../ducks/startups';

export interface StartupsProps {
	loading: boolean;
	startups: any;
	classes: any;
	handleToggleAdd(): any;
	fetchStartups(): any;
}

const styles = {
	card: {
		width: 445,
	},
	media: {
		height: 0,
		paddingTop: '56.25%',
	},
};

@connect((state: any) => {
	return {
		loading: state[moduleName].loading,
		startups: state[moduleName].entities,
	};
}, (dispatch: any) => ({
	fetchStartups: bindActionCreators(loadAllStartups, dispatch)
}))
@withStyles(styles)
class Startups extends React.Component<StartupsProps, any> {
	state = {
		isAddOpen: false,
	};

	componentDidMount() {
		const { fetchStartups } = this.props;

		fetchStartups();
	}

	handleToggleAdd = () => {
		this.setState({
			isAddOpen: !this.state.isAddOpen,
		});
	};

	render() {
		const {classes, startups, loading} = this.props;

		return (
			<Section title="Стартапы" bg>
				<div className="startups-add__button">
					<Button
						onClick={this.handleToggleAdd}
						variant="fab"
						color="primary"
						aria-label="add"
						className={classes.button}
					>
						<AddIcon/>
					</Button>
				</div>

				{
					loading
						?
						<Loader/>
						:
						<div className="startups-list">
							{
								startups.map((startup, index) => {
									return (
										<Slide
											direction="up"
											key={startup.id}
											in={!loading}
											timeout={(1000 + (index * 2))}
											style={{transformOrigin: '0 0 0'}}
										>
											<Card className={classes.card}>
												<CardMedia
													className={classes.media}
													image={startup.previewPicture}
													title={startup.name}
												/>
												<CardContent>
													<Typography gutterBottom variant="headline" component="h2">
														{startup.name}
													</Typography>
													<Typography component="p">
														{startup.description}
													</Typography>
												</CardContent>
												<CardActions>
													<Button size="small" color="primary">
														Поделиться
													</Button>
													<NavLink to={`/home/startups/${startup.name}`}>
														<Button size="small" color="primary">
															Узнать подробнее
														</Button>
													</NavLink>
												</CardActions>
											</Card>
										</Slide>
									);
								})
							}
						</div>
				}
			</Section>
		);
	}
}

export default Startups;
