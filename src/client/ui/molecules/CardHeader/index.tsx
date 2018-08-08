import * as React from 'react';
import ButtonIcon from '@ui/atoms/ButtonIcon';

import StyledCardHeader from './style';

type IProps = {
	title: string;
};

const CardHeader: React.SFC<IProps> = (props) => {
	const { title } = props;

	return (
		<StyledCardHeader>
			<h2>
				{title}
			</h2>
			<ButtonIcon iconType="plus" onClick={() => console.log('open')}>
				Open
			</ButtonIcon>
		</StyledCardHeader>
	);
};

export default CardHeader;
