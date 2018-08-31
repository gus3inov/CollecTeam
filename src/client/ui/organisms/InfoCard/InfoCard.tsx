import * as React from 'react';
// import Icon from '@material-ui/core/Icon';

import {StyledInfoCard} from './style';

export interface InfoCardProps {
	size: number;
	value: string;
	hint: string;
	title: string;
	color: string;
	icon: string;
	hintValue: string | number;
}

class InfoCard extends React.Component<InfoCardProps, any> {

	render() {
		const {value, hint, hintValue, title, size, color, icon} = this.props;

		return (
			<StyledInfoCard
				color={color}
				className={`col-md-${size}`}
			>
				<div className="card">
					<div className="header">
						<div className="header-title">{title}</div>
						<span className={`mdi mdi-${icon}`}/>
					</div>
					<div className="value">{value}</div>
					<div className="stat"><b>{hintValue}</b> {hint}</div>
				</div>
			</StyledInfoCard>
		);
	}
}

export default InfoCard;
