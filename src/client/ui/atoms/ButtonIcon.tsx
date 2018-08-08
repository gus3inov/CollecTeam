import * as React from 'react';
import styled from 'styled-components';
// import { darkColor, lightColor } from '@ui/theme';
import {
	Icon as AntIcon,
	Button as AntButton,
} from 'antd';

type IProps = {
	children: string;
	size?: string;
	type?: string;
	iconType: string;
	onClick(): void;
};

const StyledButton: any = styled(AntButton)`
`;

const ButtonIcon: React.SFC<IProps> = (props) => {
	const { type, size, iconType, onClick } = props;
	return (
		<StyledButton
			type={type}
			size={size}
			{...props}
			onClick={onClick}
		>
			<AntIcon type={iconType} /> {props.children}
		</StyledButton>
	);
};

export default ButtonIcon;
