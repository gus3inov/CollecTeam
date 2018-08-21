import * as React from 'react';

import CardHeader from '../../molecules/CardHeader';
import {Bar, Radar, Doughnut, Line} from 'react-chartjs-2';

import {StyledChartCard} from './style';

export interface ChartCardProps {
	size: number;
	type: string;
	data: object;
	title: string;
}

class ChartCard extends React.Component<ChartCardProps, any> {

	getChart = (type: string) => {

		const {data} = this.props;
		switch (type) {
			case 'bar':
				return (
					<Bar
						data={data}
						{...this.props}
					/>
				);
			case 'radar':
				return (
					<Radar
						data={data}
						{...this.props}
					/>
				);
			case 'doughnut':
				return (
					<Doughnut
						data={data}
						{...this.props}
					/>
				);
			case 'line':
				return (
					<Line
						data={data}
						{...this.props}
					/>
				);
			default:
				return 'Unknown chart';
		}
	};

	render() {
		const {type, title, size} = this.props;

		return (
			<StyledChartCard className={`col-md-${size} margin`}>
				<div className="dashboard-chart">
					<CardHeader
						title={title}
					/>
					<div className="dashboard-chart__content">
						{this.getChart(type)}
					</div>
				</div>
			</StyledChartCard>
		);
	}
}

export default ChartCard;
