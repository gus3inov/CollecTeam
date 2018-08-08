import * as React from 'react';
import styled from 'styled-components';

type IProps = {
	type: string;
	width: string;
	height: string;
};

const IconStyle = styled.i`
    display: block;
    width: ${ props => props.theme.width };
    height: ${ props => props.theme.height };
    background-image: url(../assets/img/icons/${ props => props.theme.type }.svg);
    background-repeat: no-repeat;
    background-size: cover;
`;

const Icon: React.SFC<IProps> = (props: IProps) => {
	const {
		type,
		width,
		height,
	} = props;

	const theme = {
		width,
		height,
		type,
	};

	return (
		<IconStyle
			theme={ theme }
		/>
	);
};

export default Icon;
